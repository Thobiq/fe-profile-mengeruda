<script>
  import { onMount } from 'svelte';

  let mapContainer;

  onMount(async () => {
    const L = (await import('leaflet')).default;

    // 1. Inisialisasi Peta
    const map = L.map(mapContainer).setView([-8.6, 121.0], 13);

    // 2. Base Map OpenStreetMap (Sama seperti halaman peta)
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // 3. Fungsi Bind Popup Wisata
    function bindWisataPopup(feature, layer) {
      if (feature.properties) {
        const p = feature.properties;
        const lng = feature.geometry.coordinates[0];
        const lat = feature.geometry.coordinates[1];
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        
        // CSS in popup
        let popupContent = `
          <div class="w-[230px] sm:w-[250px] font-sans flex flex-col gap-2 rounded-lg overflow-hidden">
            <img src="${p.foto}" alt="${p.nama}" class="w-full h-[140px] object-cover rounded-md shadow-sm" />
            <div class="pt-1">
              <h4 class="font-bold text-[#006430] text-[15px] leading-tight mb-1">${p.nama}</h4>
              <p class="text-xs text-gray-600 mb-3 leading-snug">${p.deskripsi}</p>
              <a 
                href="${mapsUrl}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-white block w-full bg-[#00a651] text-center py-2.5 rounded-lg font-bold text-sm hover:bg-[#008f45] transition-colors shadow-sm"
              >
                Kunjungi
              </a>
            </div>
          </div>
        `;
        layer.bindPopup(popupContent, { minWidth: 230, maxWidth: 280 });
      }
    }

    try {
      // 4. Load Batas Desa
      const batasRes = await fetch('/Batas_Desa.json');
      const dataBatas = await batasRes.json();

      // Konfigurasi Layer Batas Desa (Sama persis seperti halaman peta)
      const batasLayer = L.geoJSON(dataBatas, {
        style: {
          color: '#00a651', // Hijau Mengeruda
          weight: 3,
          fillColor: '#00a651',
          fillOpacity: 0.15
        }
      });
      batasLayer.addTo(map);

      // 5. Data Wisata Dummy
      const wisataData = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [121.0869265, -8.7083553] },
            "properties": {
              "nama": "Pemandian Air Panas Soa Mengeruda",
              "foto": "http://localhost:5173/hero-1.jpg",
              "deskripsi": "Nikmati sensasi berendam di sumber air panas alami vulkanik yang menenangkan dengan pemandangan asri."
            }
          },
          {
            "type": "Feature",
            "geometry": { "type": "Point", "coordinates": [121.0859757, -8.7106351] },
            "properties": {
              "nama": "Taman Ziarah Maria Fatima",
              "foto": "http://localhost:5173/hero-2.png",
              "deskripsi": "Tempat wisata rohani dan ziarah yang damai, cocok untuk kontemplasi dan ketenangan pikiran."
            }
          }
        ]
      };

      // Custom Marker Icon Wisata
      const wisataIcon = L.divIcon({
        className: 'custom-wisata-icon',
        html: `<div class="bg-[#f59e0b] w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-lg">📌</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
      });

      const wisataLayer = L.geoJSON(wisataData, {
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, { icon: wisataIcon });
        },
        onEachFeature: bindWisataPopup
      }).addTo(map);

      // 6. Membuat Kontrol Layer (Toggles) sama seperti halaman peta
      const overlayMaps = {
        "Batas Administrasi": batasLayer,
        "Titik Wisata": wisataLayer
      };

      L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);

      // Fokus peta agar pas dengan ukuran Batas Desa
      map.fitBounds(batasLayer.getBounds());

    } catch (error) {
      console.error("Gagal memuat data batas desa/wisata:", error);
    }
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    /* Reset gaya default popup leaflet agar padding lebih rapi */
    .leaflet-popup-content-wrapper {
      padding: 0 !important;
      border-radius: 0.75rem !important;
      overflow: hidden;
    }
    .leaflet-popup-content {
      margin: 10px !important;
      line-height: normal;
    }
    .custom-wisata-icon {
      background: transparent;
      border: none;
    }
  </style>
</svelte:head>

<section class="w-full bg-[#f8fcf9] py-16">
  <div class="max-w-[1500px] mx-auto px-6">
    
    <div class="text-center mb-10">
      <h2 class="text-3xl md:text-[40px] font-serif font-bold text-[#005c2d] mb-4">
        Peta Wisata & UMKM Desa Mengeruda
      </h2>
      <p class="text-gray-800 font-serif text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
        Jelajahi berbagai destinasi wisata dan UMKM menarik di Desa Mengeruda melalui peta interaktif di bawah ini.
      </p>
    </div>

    <!-- Container sama persis dengan halaman peta -->
    <div class="w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-gray-200 z-0">
      <div bind:this={mapContainer} class="w-full h-full z-0"></div>
    </div>

  </div>
</section>

<style>
  :global(.leaflet-container) {
    z-index: 10 !important;
    font-family: inherit;
  }
  
  /* Styling tambahan untuk kotak layer control Leaflet agar terlihat lebih modern (dari halaman peta) */
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
