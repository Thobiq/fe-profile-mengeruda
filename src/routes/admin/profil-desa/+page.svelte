<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  // Import komponen Quill Editor
  import QuillEditor from '$lib/components/QuillEditor.svelte';
  import api from '$lib/api';
  import { fetchVillageProfile } from '$lib/stores/profile';

  // Base URL API Laravel
  const API_URL = '/api';

  // State untuk menyimpan URL preview gambar & file gambar asli
  let logoPreview = $state('/logo.png');
  let logoFile = null;
  
  // ==========================================
  // STATE 1: Data Informasi Desa
  // ==========================================
  let formInfo = $state({
    nama_desa: 'Mengeruda',
    kecamatan: 'Soa',
    kabupaten: 'Ngada',
    provinsi: 'Nusa Tenggara Timur',
    telp: '081234567890',
    email: 'pemdes@mengeruda.id',
    alamat: 'Jl. Trans Bajawa - Soa, Desa Mengeruda, Kec. Soa'
  });

  // ==========================================
  // STATE 2: Data Narasi Desa (Quill)
  // ==========================================
  let formNarasi = $state({
    tentang_desa: '',
    sejarah_desa: '',
    visi_desa: '',
    misi_desa: ''
  });

  // ==========================================
  // STATE 3: Modal Notification
  // ==========================================
  let showModal = $state(false);
  let modalMessage = $state('');
  let isSuccess = $state(true);
  let isSavingInfo = $state(false);
  let isSavingNarasi = $state(false);

  function closeModal() {
    showModal = false;
  }

  // Fetch data awal dari API backend
  onMount(async () => {
    try {
      const res = await api.get(`${API_URL}/village-profile`);
      const json = res.data;
      if (res.status === 200 && json.success) {
        const d = json.data;
        
        // Set form info
        formInfo.nama_desa = d.nama_desa || '';
        formInfo.kecamatan = d.kecamatan || '';
        formInfo.kabupaten = d.kabupaten || '';
        formInfo.provinsi = d.provinsi || '';
        formInfo.telp = d.telp || '';
        formInfo.email = d.email || '';
        formInfo.alamat = d.alamat || '';
        
        if (d.logo_url) {
          logoPreview = d.logo_url;
        }

        // Set form narasi
        formNarasi.tentang_desa = d.tentang_desa || '';
        formNarasi.sejarah_desa = d.sejarah_desa || '';
        formNarasi.visi_desa = d.visi_desa || '';
        formNarasi.misi_desa = d.misi_desa || '';
      }
    } catch (err) {
      console.error("Gagal mengambil data dari API:", err);
    }
  });

  // Fungsi untuk menangani perubahan file upload logo
  function handleLogoChange(event) {
    const file = event.target.files[0];
    if (file) {
      logoFile = file;
      logoPreview = URL.createObjectURL(file);
    }
  }

  // Fungsi Submit Form 1 (Informasi Desa)
  async function handleSimpanInfo(e) {
    e.preventDefault();
    isSavingInfo = true;
    try {
      // Gunakan FormData karena ada upload file gambar
      const formData = new FormData();
      formData.append('nama_desa', formInfo.nama_desa);
      formData.append('kecamatan', formInfo.kecamatan);
      formData.append('kabupaten', formInfo.kabupaten);
      formData.append('provinsi', formInfo.provinsi);
      formData.append('telp', formInfo.telp);
      formData.append('email', formInfo.email);
      formData.append('alamat', formInfo.alamat);
      
      if (logoFile) {
        formData.append('logo', logoFile);
      }

      await api.get('/sanctum/csrf-cookie');
      const res = await api.post(`${API_URL}/village-profile/info`, formData);

      const json = res.data;
      if (res.status === 200 && json.success) {
        modalMessage = "Informasi Desa berhasil disimpan!";
        isSuccess = true;
        showModal = true;
        fetchVillageProfile();
      } else {
        modalMessage = "Gagal menyimpan Informasi Desa: " + (json.message || res.statusText);
        isSuccess = false;
        showModal = true;
      }
    } catch (err) {
      console.error("Error simpan info:", err);
      modalMessage = "Terjadi kesalahan sistem saat menyimpan info.";
      isSuccess = false;
      showModal = true;
    } finally {
      isSavingInfo = false;
    }
  }

  // Fungsi Submit Form 2 (Narasi Desa)
  async function handleSimpanNarasi(e) {
    e.preventDefault();
    isSavingNarasi = true;
    try {
      await api.get('/sanctum/csrf-cookie');
      const res = await api.post(`${API_URL}/village-profile/narasi`, {
        tentang_desa: formNarasi.tentang_desa,
        sejarah_desa: formNarasi.sejarah_desa,
        visi_desa: formNarasi.visi_desa,
        misi_desa: formNarasi.misi_desa
      });

      const json = res.data;
      if (res.status === 200 && json.success) {
        modalMessage = "Narasi Desa berhasil disimpan!";
        isSuccess = true;
        showModal = true;
      } else {
        modalMessage = "Gagal menyimpan Narasi Desa: " + (json.message || res.statusText);
        isSuccess = false;
        showModal = true;
      }
    } catch (err) {
      console.error("Error simpan narasi:", err);
      modalMessage = "Terjadi kesalahan sistem saat menyimpan narasi.";
      isSuccess = false;
      showModal = true;
    } finally {
      isSavingNarasi = false;
    }
  }
</script>

<svelte:head>
  <title>Profil Desa - Admin Panel</title>
</svelte:head>

<!-- Container Utama yang membungkus kedua Section -->
<div class="max-w-4xl flex flex-col gap-8 pb-12">
  
  <!-- ========================================== -->
  <!-- FORM SECTION 1: INFORMASI DESA -->
  <!-- ========================================== -->
  <div class="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm">
    <form onsubmit={handleSimpanInfo}>
      
      <!-- LOGO PREVIEW & UPLOAD -->
      <div class="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-10 mb-10">
        <div class="w-36 h-36 shrink-0 rounded-full border-[1.5px] border-[#34a853] p-2 flex items-center justify-center overflow-hidden bg-white shadow-sm">
          <img src={logoPreview} alt="Preview Logo Desa" class="w-full h-full object-contain" />
        </div>
        <div class="w-full flex-grow">
          <label class="block text-[#006e33] font-extrabold text-[16px] mb-2">Logo Desa</label>
          <input 
            type="file" 
            accept="image/*"
            onchange={handleLogoChange}
            class="w-full border border-[#34a853] rounded-xl px-4 py-2.5 text-gray-700 bg-white cursor-pointer
                   file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 
                   file:text-sm file:font-bold file:bg-[#006e33]/10 file:text-[#006e33] 
                   hover:file:bg-[#006e33]/20 transition-all outline-none focus:ring-2 focus:ring-[#006e33]/20"
          />
        </div>
      </div>

      <!-- FORM INPUT DATA DESA -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8">
        
        <div class="flex flex-col gap-1.5">
          <label class="text-[#006e33] font-extrabold text-[15px]">Nama Desa</label>
          <input type="text" bind:value={formInfo.nama_desa} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" required />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[#006e33] font-extrabold text-[15px]">Kecamatan</label>
          <input type="text" bind:value={formInfo.kecamatan} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" required />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[#006e33] font-extrabold text-[15px]">Kabupaten</label>
          <input type="text" bind:value={formInfo.kabupaten} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" required />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[#006e33] font-extrabold text-[15px]">Provinsi</label>
          <input type="text" bind:value={formInfo.provinsi} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" required />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[#006e33] font-extrabold text-[15px]">No. Telp Desa</label>
          <input type="tel" bind:value={formInfo.telp} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[#006e33] font-extrabold text-[15px]">Email Desa</label>
          <input type="email" bind:value={formInfo.email} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" />
        </div>

        <div class="flex flex-col gap-1.5 md:col-span-2">
          <label class="text-[#006e33] font-extrabold text-[15px]">Alamat Kantor Desa</label>
          <input type="text" bind:value={formInfo.alamat} class="w-full border border-[#34a853] rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all" required />
        </div>

      </div>

      <button 
        type="submit" 
        disabled={isSavingInfo}
        class="w-full bg-[#00a651] hover:bg-[#008f45] disabled:bg-gray-400 text-white font-bold text-lg py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
      >
        {#if isSavingInfo}
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Menyimpan...
        {:else}
          Simpan Informasi Desa
        {/if}
      </button>

    </form>
  </div>

  <!-- ========================================== -->
  <!-- FORM SECTION 2: NARASI DESA (QUILL) -->
  <!-- ========================================== -->
  <div class="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm">
    <!-- Form mandiri untuk bagian narasi -->
    <form onsubmit={handleSimpanNarasi} class="flex flex-col gap-8">
      
      <div class="flex flex-col gap-2">
        <label class="text-[#006e33] font-extrabold text-[17px]">Tentang Desa</label>
        <QuillEditor bind:content={formNarasi.tentang_desa} />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-[#006e33] font-extrabold text-[17px]">Sejarah Desa</label>
        <QuillEditor bind:content={formNarasi.sejarah_desa} />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-[#006e33] font-extrabold text-[17px]">Visi Desa</label>
        <QuillEditor bind:content={formNarasi.visi_desa} />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-[#006e33] font-extrabold text-[17px]">Misi Desa</label>
        <QuillEditor bind:content={formNarasi.misi_desa} />
      </div>

      <button 
        type="submit" 
        disabled={isSavingNarasi}
        class="w-full mt-2 bg-[#00a651] hover:bg-[#008f45] disabled:bg-gray-400 text-white font-bold text-lg py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
      >
        {#if isSavingNarasi}
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Menyimpan...
        {:else}
          Simpan Narasi Desa
        {/if}
      </button>

    </form>
  </div>

</div>

<!-- ========================================== -->
<!-- MODAL NOTIFICATION -->
<!-- ========================================== -->
{#if showModal}
  <!-- Backdrop -->
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    transition:fade={{ duration: 200 }}
  >
    <!-- Modal Card -->
    <div 
      class="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-4"
      transition:scale={{ duration: 300, start: 0.95 }}
    >
      <!-- Icon (Success / Error) -->
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

      <!-- Message -->
      <h3 class="text-xl font-bold text-gray-800">
        {isSuccess ? 'Berhasil!' : 'Gagal'}
      </h3>
      <p class="text-gray-600 leading-relaxed">
        {modalMessage}
      </p>

      <!-- Action Button -->
      <button 
        onclick={closeModal}
        class="mt-4 w-full {isSuccess ? 'bg-[#00a651] hover:bg-[#008f45]' : 'bg-red-500 hover:bg-red-600'} text-white font-bold py-3 rounded-xl transition-colors shadow-md"
      >
        Tutup
      </button>
    </div>
  </div>
{/if}