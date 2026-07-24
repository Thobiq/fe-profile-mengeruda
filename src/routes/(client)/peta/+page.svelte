<script>
  import { onMount } from 'svelte';

  let mapContainer;

  onMount(async () => {
    const L = (await import('leaflet')).default;

    // 1. Inisialisasi Peta
    const map = L.map(mapContainer).setView([-8.6, 121.0], 13);

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
      const apiRes = await fetch('http://127.0.0.1:8000/api/map-locations');
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
        apiJson.data.forEach(loc => {
          const color = categoryColors[loc.category] || categoryColors['Lainnya'];
          
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
            const imgUrl = loc.thumbnail.startsWith('http') ? loc.thumbnail : `http://127.0.0.1:8000${loc.thumbnail}`;
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