<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { page } from '$app/stores';
  import api from '$lib/api';

  let mapElement;
  let map;
  let marker;
  let L;

  let queryId = $derived($page.url.searchParams.get('id'));

  let form = $state({
    name: '',
    category: 'Fasilitas Umum',
    description: '',
    latitude: '',
    longitude: ''
  });

  // State untuk preview thumbnail & file aslinya
  let thumbnailPreview = $state(null);
  let thumbnailFile = $state(null);
  let thumbnailInputRef;

  // Modal Notification State
  let showModal = $state(false);
  let modalMessage = $state('');
  let isSuccess = $state(true);
  let isLoading = $state(false);

  const defaultCoords = [-8.6657, 121.0559]; // Ngada, approx coordinates, bisa disesuaikan

  function closeModal() {
    showModal = false;
    if (isSuccess) {
      window.location.href = '/admin/peta';
    }
  }

  function triggerThumbnailUpload() {
    thumbnailInputRef.click();
  }

  function handleThumbnailChange(event) {
    const file = event.target.files[0];
    if (file) {
      thumbnailFile = file;
      thumbnailPreview = URL.createObjectURL(file);
    }
  }

  const setMarker = (lat, lng) => {
    if (marker) {
      marker.setLatLng([lat, lng]);
    } else {
      marker = L.marker([lat, lng], { draggable: true }).addTo(map);
      marker.on('dragend', function (e) {
        const position = marker.getLatLng();
        form.latitude = position.lat.toFixed(8);
        form.longitude = position.lng.toFixed(8);
      });
    }
    form.latitude = parseFloat(lat).toFixed(8);
    form.longitude = parseFloat(lng).toFixed(8);
  };

  const fetchLocation = async (id) => {
    try {
      const res = await api.get(`/api/map-locations/${id}`);
      const json = res.data;
      if (json.success) {
        const data = json.data;
        form.name = data.name;
        form.category = data.category;
        form.description = data.description || '';
        form.latitude = data.latitude;
        form.longitude = data.longitude;
        if (data.thumbnail) {
          thumbnailPreview = data.thumbnail.startsWith('http') ? data.thumbnail : `/storage/${data.thumbnail.replace('/storage/', '')}`;
        }
        // Update map view and marker
        if (map && L) {
          map.setView([data.latitude, data.longitude], 15);
          setMarker(data.latitude, data.longitude);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  onMount(async () => {
    // Dynamic import leaflet to avoid SSR issues
    const leaflet = await import('leaflet');
    L = leaflet.default || leaflet;
    
    // Fix missing marker icons in leaflet with webpack/vite
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    map = L.map(mapElement).setView(defaultCoords, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click', function(e) {
      setMarker(e.latlng.lat, e.latlng.lng);
    });

    // Load Batas Desa
    try {
      const resBatas = await fetch('/Batas_Desa.json');
      if (resBatas.ok) {
        const batasData = await resBatas.json();
        const batasLayer = L.geoJSON(batasData, {
          style: {
            color: '#006e33',
            weight: 3,
            fillColor: '#00a651',
            fillOpacity: 0.1,
            dashArray: '5, 5'
          }
        }).addTo(map);
        
        // Hanya fitBounds jika tidak sedang dalam mode edit 
        // (kalau mode edit, map view sudah di-set ke titik marker di fetchLocation)
        if (!queryId) {
          map.fitBounds(batasLayer.getBounds());
        }
      }
    } catch (err) {
      console.error("Gagal meload batas desa:", err);
    }

    // Load Existing Locations
    try {
      const resLocs = await fetch('http://127.0.0.1:8000/api/map-locations');
      if (resLocs.ok) {
        const jsonLocs = await resLocs.json();
        if (jsonLocs.success) {
          jsonLocs.data.forEach(loc => {
            // Jangan render titik yang sedang diedit agar tidak menumpuk
            if (queryId && Number(loc.id) === Number(queryId)) return;
            
            L.circleMarker([loc.latitude, loc.longitude], {
              radius: 6,
              color: '#ffffff',
              weight: 2,
              fillColor: '#3b82f6', // Biru
              fillOpacity: 0.9
            })
            .bindTooltip(`<div class="font-bold text-gray-800">${loc.name}</div><div class="text-xs text-gray-500">${loc.category}</div>`)
            .addTo(map);
          });
        }
      }
    } catch (err) {
      console.error("Gagal meload titik lokasi:", err);
    }

    // If edit mode, fetch data
    if (queryId) {
      fetchLocation(queryId);
    }
  });

  const handleSimpan = async (e) => {
    e.preventDefault();
    if (!form.latitude || !form.longitude) {
      modalMessage = "Harap tandai lokasi pada peta terlebih dahulu!";
      isSuccess = false;
      showModal = true;
      return;
    }

    isLoading = true;
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('category', form.category);
      formData.append('description', form.description);
      formData.append('latitude', form.latitude);
      formData.append('longitude', form.longitude);
      
      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile);
      }
      const url = queryId 
        ? `/api/map-locations/${queryId}`
        : '/api/map-locations';
      
      await api.get('/sanctum/csrf-cookie');
      const res = await api.post(url, formData);

      const json = res.data;
      if (res.status === 200 && json.success) {
        modalMessage = "Data lokasi berhasil disimpan!";
        isSuccess = true;
        showModal = true;
      } else {
        modalMessage = "Gagal menyimpan data: " + (json.message || res.statusText);
        isSuccess = false;
        showModal = true;
      }
    } catch (err) {
      console.error(err);
      modalMessage = "Terjadi kesalahan sistem saat menyimpan.";
      isSuccess = false;
      showModal = true;
    } finally {
      isLoading = false;
    }
  };

</script>

<svelte:head>
  <title>Admin - Form Peta Desa</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
</svelte:head>

<div class="max-w-6xl mx-auto pb-12">
  
  <!-- NAVIGASI KEMBALI -->
  <a 
    href="/admin/peta" 
    class="inline-flex items-center gap-2 text-gray-600 hover:text-[#006e33] font-bold text-[15px] mb-6 transition-colors"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
      <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
    </svg>
    Kembali ke Tabel Peta
  </a>

  <div class="flex flex-col lg:flex-row gap-8">
    
    <!-- MAP AREA (Kiri) -->
    <div class="w-full lg:w-[55%] flex flex-col gap-3">
      <div class="flex justify-between items-end">
        <div>
          <h2 class="text-2xl font-serif font-bold text-[#006e33]">Pilih Lokasi di Peta</h2>
          <p class="text-gray-500 font-serif text-sm">Klik di mana saja untuk menempatkan penanda (Pin). Anda bisa menggeser pin tersebut untuk mengatur posisinya dengan akurat.</p>
        </div>
      </div>
      
      <!-- Leaflet Map Container -->
      <div 
        bind:this={mapElement}
        class="w-full h-[450px] md:h-[600px] rounded-3xl border-4 border-white shadow-xl z-10"
      ></div>

      <!-- Koordinat Read-only -->
      <div class="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div class="flex-1">
          <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Latitude</label>
          <input type="text" readonly value={form.latitude} placeholder="Klik peta" class="w-full bg-gray-50 rounded-lg px-3 py-2 text-gray-700 font-mono text-sm outline-none cursor-not-allowed" />
        </div>
        <div class="flex-1">
          <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Longitude</label>
          <input type="text" readonly value={form.longitude} placeholder="Klik peta" class="w-full bg-gray-50 rounded-lg px-3 py-2 text-gray-700 font-mono text-sm outline-none cursor-not-allowed" />
        </div>
      </div>
    </div>

    <!-- FORM AREA (Kanan) -->
    <div class="w-full lg:w-[45%]">
      <div class="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm sticky top-6">
        <h3 class="text-xl font-bold text-gray-800 mb-6 font-serif">Detail Tempat</h3>
        
        <form onsubmit={handleSimpan} class="flex flex-col gap-5">
          
          <div class="flex flex-col gap-1.5">
            <label class="text-[#006e33] font-bold text-sm">Nama Tempat</label>
            <input 
              type="text" 
              bind:value={form.name}
              placeholder="Contoh: Air Panas Mengeruda" 
              class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all"
              required
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[#006e33] font-bold text-sm">Kategori Lokasi</label>
            <select 
              bind:value={form.category}
              class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all bg-white"
            >
              <option value="Fasilitas Umum">Fasilitas Umum</option>
              <option value="Wisata">Wisata</option>
              <option value="UMKM">UMKM</option>
              <option value="Batas Desa">Batas Desa</option>
              <option value="Area Pertanian">Area Pertanian</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[#006e33] font-bold text-sm">Foto / Thumbnail (Opsional)</label>
            <input bind:this={thumbnailInputRef} type="file" accept="image/*" onchange={handleThumbnailChange} class="hidden" />
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div onclick={triggerThumbnailUpload} class="w-full h-40 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden relative group">
              {#if thumbnailPreview}
                <img src={thumbnailPreview} alt="Preview" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span class="text-white font-bold px-4 py-2 bg-black/50 rounded-lg text-sm">Ubah Foto</span>
                </div>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-400 mb-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                <span class="text-gray-500 font-medium text-sm">Pilih Gambar</span>
              {/if}
            </div>
          </div>

          <div class="flex flex-col gap-1.5 mb-2">
            <label class="text-[#006e33] font-bold text-sm">Deskripsi Singkat (Opsional)</label>
            <textarea 
              bind:value={form.description}
              rows="4" 
              placeholder="Jelaskan mengenai tempat ini..."
              class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all resize-none"
            ></textarea>
          </div>

          <!-- TOMBOL SIMPAN -->
          <button 
            type="submit" 
            disabled={isLoading}
            class="w-full bg-[#00a651] hover:bg-[#008f45] disabled:bg-gray-400 text-white font-bold text-lg py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 mt-auto"
          >
            {#if isLoading}
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Menyimpan...
            {:else}
              Simpan Data Lokasi
            {/if}
          </button>
        </form>

      </div>
    </div>
  </div>
</div>

<!-- ========================================== -->
<!-- MODAL NOTIFICATION -->
<!-- ========================================== -->
{#if showModal}
  <div class="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" transition:fade={{ duration: 200 }}>
    <div class="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-4" transition:scale={{ duration: 300, start: 0.95 }}>
      {#if isSuccess}
        <div class="w-16 h-16 rounded-full bg-[#00a651]/10 text-[#00a651] flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      {:else}
        <div class="w-16 h-16 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      {/if}

      <h3 class="text-xl font-bold text-gray-800">
        {isSuccess ? 'Berhasil!' : 'Gagal'}
      </h3>
      <p class="text-gray-600 leading-relaxed">
        {modalMessage}
      </p>

      <button 
        onclick={closeModal}
        class="mt-4 w-full {isSuccess ? 'bg-[#00a651] hover:bg-[#008f45]' : 'bg-red-500 hover:bg-red-600'} text-white font-bold py-3 rounded-xl transition-colors shadow-md"
      >
        {isSuccess ? 'Ke Daftar Peta' : 'Tutup'}
      </button>
    </div>
  </div>
{/if}
