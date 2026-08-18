<script>
  import { onMount } from 'svelte';

  let mapContainer;
  let locations = $state([]);

  onMount(async () => {
    const L = (await import('leaflet')).default;
    await import('leaflet-gesture-handling'); // Import plugin
    await import('leaflet-gesture-handling/dist/leaflet-gesture-handling.css'); // Import plugin CSS
    
    // 1. Inisialisasi Peta dengan Gesture Handling
    const map = L.map(mapContainer, {
      center: [-8.6, 121.0],
      zoom: 13,
      gestureHandling: true,
      gestureHandlingOptions: {
        text: {
          touch: "Gunakan dua jari untuk menggeser peta",
          scroll: "Gunakan tombol Ctrl + Scroll untuk memperbesar peta",
          scrollMac: "Gunakan tombol \u2318 + Scroll untuk memperbesar peta"
        }
      }
    });

    // 2. Base Map OpenStreetMap
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // FUNGSI BANTUAN: Membuat Popup dinamis untuk semua layer
    function bindCustomPopup(feature, layer) {
      if (feature.properties) {
        let popupContent = '<div class="min-w-[220px] font-sans">';
        popupContent += '<h4 class="font-bold text-[#00a651] text-base border-b-2 border-green-100 pb-2 mb-2">Informasi Detail</h4>';
        popupContent += '<table class="w-full text-[13px] text-left border-collapse">';
        
        for (const [key, value] of Object.entries(feature.properties)) {
          if (value !== null && value !== '') {
            popupContent += `
              <tr class="border-b border-gray-100 last:border-0">
                <td class="py-1.5 font-semibold text-gray-600 pr-4 align-top whitespace-nowrap">${key}</td>
                <td class="py-1.5 text-gray-900 break-words">${value}</td>
              </tr>
            `;
          }
        }
        popupContent += '</table></div>';
        layer.bindPopup(popupContent);
      }
    }

    try {
      // 3. Memuat data static (Batas dan Jalan)
      const [batasRes, jalanRes] = await Promise.all([
        fetch('/Batas_Desa.json'),
        fetch('/Jalan_Desa_Mengeruda.json')
      ]);

      const dataBatas = await batasRes.json();
      const dataJalan = await jalanRes.json();

      // 4. Konfigurasi Layer Batas Desa (Polygon)
      const batasLayer = L.geoJSON(dataBatas, {
        style: {
          color: '#00a651', // Hijau Mengeruda
          weight: 3,
          fillColor: '#00a651',
          fillOpacity: 0.15
        },
        onEachFeature: bindCustomPopup
      }).addTo(map);

      // 5. Konfigurasi Layer Jalan Desa (LineString)
      const jalanLayer = L.geoJSON(dataJalan, {
        style: {
          color: '#f59e0b', // Warna oranye/kuning gelap untuk jalan
          weight: 2,
          opacity: 0.8
        },
        onEachFeature: bindCustomPopup
      }).addTo(map);

      // 6. Mengambil Data Peta Dinamis dari Database
      const apiRes = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/map-locations`);
      const apiJson = await apiRes.json();
      
      const categoryColors = {
        'Wisata': '#a855f7', // Purple
        'Fasilitas Umum': '#3b82f6', // Blue
        'UMKM': '#f97316', // Orange
        'Batas Desa': '#ef4444', // Red
        'Area Pertanian': '#84cc16', // Lime
        'Lainnya': '#64748b' // Slate
      };

      // Layer groups untuk setiap kategori
      const categoryLayers = {};

      if (apiRes.ok && apiJson.success) {
        locations = apiJson.data.map(loc => ({
          ...loc,
          color: categoryColors[loc.category] || categoryColors['Lainnya']
        }));

        locations.forEach(loc => {
          const color = loc.color;
          
          const marker = L.circleMarker([loc.latitude, loc.longitude], {
            radius: 7,
            fillColor: color,
            color: '#ffffff', // Border putih
            weight: 2,
            opacity: 1,
            fillOpacity: 0.95
          });

          // Membangun konten popup yang cantik
          let popupContent = `<div class="w-[240px] font-sans">`;
          
          if (loc.thumbnail) {
            // Gunakan path full dari backend jika thumbnail hanya berupa path relatif
            const imgUrl = loc.thumbnail.startsWith('http') ? loc.thumbnail : `${import.meta.env.VITE_PUBLIC_BACKEND_URL}${loc.thumbnail}`;
            popupContent += `<img src="${imgUrl}" alt="${loc.name}" class="w-full h-32 object-cover rounded-xl mb-3 shadow-sm" />`;
          }
          
          popupContent += `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold text-white mb-1 inline-block" style="background-color: ${color}">${loc.category}</span>`;
          popupContent += `<h4 class="font-bold text-gray-900 text-base leading-tight mb-1.5">${loc.name}</h4>`;
          
          if (loc.description) {
            popupContent += `<p class="text-xs text-gray-600 line-clamp-3">${loc.description}</p>`;
          }
          
          popupContent += `</div>`;
          marker.bindPopup(popupContent);

          // Masukkan ke layer group kategorinya
          if (!categoryLayers[loc.category]) {
            categoryLayers[loc.category] = L.layerGroup().addTo(map);
          }
          marker.addTo(categoryLayers[loc.category]);
        });
      }

      // 7. Membuat Kontrol Layer (Toggles)
      const overlayMaps = {
        "Batas Administrasi": batasLayer,
        "Jalan Desa": jalanLayer,
      };

      // Tambahkan dynamic layer categories ke toggle control
      Object.keys(categoryLayers).forEach(cat => {
        overlayMaps[cat] = categoryLayers[cat];
      });

      L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);

      // Menggeser otomatis fokus peta agar pas dengan ukuran Batas Desa
      map.fitBounds(batasLayer.getBounds());

    } catch (error) {
      console.error("Gagal memuat data WebGIS:", error);
    }
  });
</script>

<svelte:head>
  <title>Peta Digital - Desa Mengeruda</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</svelte:head>

<section class="w-full bg-white py-12 md:py-16">
  <div class="max-w-[1500px] mx-auto px-6">
    
    <div class="text-center mb-10">
      <h1 class="text-3xl md:text-[40px] font-serif font-bold text-black mb-4">
        Peta Digital Desa Mengeruda
      </h1>
      <p class="text-gray-800 font-serif text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
        Peta interaktif wilayah administratif, infrastruktur jalan, dan persebaran fasilitas desa.
      </p>
    </div>

    <div class="w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-gray-200 z-0">
      <div bind:this={mapContainer} class="w-full h-full z-0"></div>
    </div>

  </div>
</section>

<!-- Section Daftar Lokasi -->
{#if locations.length > 0}
<section class="w-full bg-gray-50 py-16 border-t border-gray-100">
  <div class="max-w-[1500px] mx-auto px-6">
    
    <div class="mb-10 border-b border-gray-200 pb-4">
      <h2 class="text-2xl md:text-3xl font-serif font-bold text-gray-900">
        Daftar Titik Lokasi
      </h2>
      <p class="text-gray-600 font-sans mt-2">
        Temukan berbagai fasilitas, destinasi wisata, dan UMKM yang ada di Desa Mengeruda.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {#each locations as loc}
        <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
          
          <!-- Thumbnail Lokasi -->
          <div class="w-full h-48 bg-gray-100 relative">
            {#if loc.thumbnail}
              <img 
                src={loc.thumbnail.startsWith('http') ? loc.thumbnail : `${import.meta.env.VITE_PUBLIC_BACKEND_URL}${loc.thumbnail}`} 
                alt={loc.name} 
                class="w-full h-full object-cover" 
              />
            {:else}
              <!-- Placeholder cantik jika tidak ada gambar -->
              <div class="w-full h-full flex flex-col items-center justify-center bg-emerald-50 text-emerald-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mb-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span class="text-sm font-semibold">Tanpa Gambar</span>
              </div>
            {/if}
            
            <!-- Badge Kategori Absolut -->
            <div class="absolute top-4 right-4">
              <span 
                class="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                style="background-color: {loc.color}"
              >
                {loc.category}
              </span>
            </div>
          </div>
          
          <!-- Konten Informasi -->
          <div class="p-5 flex flex-col flex-grow">
            <h3 class="font-bold text-lg text-gray-900 mb-2 leading-tight">{loc.name}</h3>
            
            {#if loc.description}
              <p class="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                {loc.description}
              </p>
            {/if}
            
            <!-- Detail Lattitude Longitude -->
            <div class="mt-auto pt-3 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-500 font-mono">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-emerald-500">
                <path fill-rule="evenodd" d="M11.986 3H12a2 2 0 012 2v6a2 2 0 01-1.5 1.937V7A2.5 2.5 0 0010 4.5H4.063A2 2 0 016 3h5.986zM6 7a1 1 0 011-1h5a1 1 0 011 1v8a1 1 0 01-1 1H7a1 1 0 01-1-1V7z" clip-rule="evenodd" />
              </svg>
              {parseFloat(loc.latitude).toFixed(4)}, {parseFloat(loc.longitude).toFixed(4)}
            </div>
          </div>
          
        </div>
      {/each}
    </div>

  </div>
</section>
{/if}

<style>
  :global(.leaflet-container) {
    z-index: 10 !important;
    font-family: inherit; /* Agar popup mengikuti font website */
  }
  
  /* Styling tambahan untuk kotak layer control Leaflet agar terlihat lebih modern */
  :global(.leaflet-control-layers) {
    border: none !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
    padding: 8px 12px !important;
  }
  :global(.leaflet-control-layers-overlays label) {
    margin-bottom: 6px;
    font-weight: 500;
  }
</style>