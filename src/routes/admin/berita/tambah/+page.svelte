<script>
  import { fade, scale } from 'svelte/transition';
  import QuillEditor from '$lib/components/QuillEditor.svelte';
  import api from '$lib/api';

  // Variabel untuk menyimpan referensi elemen input file tersembunyi
  let bannerInputRef; 

  let form = $state({
    judul: '',
    slug: '',
    content: ''
  });

  // State untuk preview banner & file aslinya
  let bannerPreview = $state(null);
  let bannerFile = $state(null);

  // State untuk Modal Notifikasi
  let showModal = $state(false);
  let modalMessage = $state('');
  let isSuccess = $state(true);
  let isLoading = $state(false);
  
  function closeModal() {
    showModal = false;
    // Jika sukses menyimpan, arahkan ke daftar berita
    if (isSuccess) {
      window.location.href = '/admin/berita';
    }
  }

  // Fungsi untuk trigger klik input file saat kotak abu-abu diklik
  function triggerBannerUpload() {
    bannerInputRef.click();
  }

  // Fungsi untuk menangani file yang diupload dan membuat URL preview
  function handleBannerChange(event) {
    const file = event.target.files[0];
    if (file) {
      bannerFile = file;
      bannerPreview = URL.createObjectURL(file);
    }
  }

  // Auto-generate Slug: Mengubah judul menjadi format slug URL
  function generateSlug() {
    form.slug = form.judul
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  // Fungsi submit data ke Laravel Backend
  async function handleSimpan(e) {
    e.preventDefault();
    isLoading = true;
    
    try {
      const formData = new FormData();
      formData.append('judul', form.judul);
      formData.append('slug', form.slug);
      formData.append('content', form.content);
      
      if (bannerFile) {
        formData.append('banner', bannerFile);
      }
      await api.get('/sanctum/csrf-cookie');
      const res = await api.post('/api/news', formData);

      const json = res.data;
      if (res.status === 200 && json.success) {
        modalMessage = "Berita berhasil disimpan & dipublish!";
        isSuccess = true;
        showModal = true;
      } else {
        modalMessage = "Gagal menyimpan berita: " + (json.message || res.statusText);
        isSuccess = false;
        showModal = true;
      }
    } catch (err) {
      console.error("Error simpan berita:", err);
      let errMsg = "Terjadi kesalahan sistem saat menyimpan berita.";
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const firstErrKey = Object.keys(err.response.data.errors)[0];
          errMsg = err.response.data.errors[firstErrKey][0];
        } else if (err.response.data.message) {
          errMsg = err.response.data.message;
        }
      }
      modalMessage = "Gagal menyimpan berita: " + errMsg;
      isSuccess = false;
      showModal = true;
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Tambah Berita - Admin Panel</title>
</svelte:head>

<div class="max-w-4xl pb-12">
  
  <!-- NAVIGASI KEMBALI -->
  <a 
    href="/admin/berita" 
    class="inline-flex items-center gap-2 text-gray-600 hover:text-[#006e33] font-bold text-[15px] mb-6 transition-colors"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
      <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
    </svg>
    Kembali ke Daftar Berita
  </a>

  <!-- FORM CONTAINER -->
  <div class="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm">
    <form onsubmit={handleSimpan} class="flex flex-col gap-7">
      
      <!-- ========================================== -->
      <!-- SECTION: BANNER BERITA -->
      <!-- ========================================== -->
      <div class="flex flex-col gap-2">
        <label class="text-[#006e33] font-extrabold text-[17px]">Banner Berita</label>
        
        <!-- Input file asli disembunyikan menggunakan class 'hidden' -->
        <input 
          bind:this={bannerInputRef} 
          type="file" 
          accept="image/*" 
          onchange={handleBannerChange} 
          class="hidden" 
        />
        
        <!-- Custom UI Box (Bisa diklik untuk mengaktifkan input file di atas) -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
          onclick={triggerBannerUpload}
          class="w-full h-[250px] md:h-[300px] bg-[#e5e5e5] border border-[#34a853]/60 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#dcdcdc] transition-colors overflow-hidden relative group"
        >
          {#if bannerPreview}
            <!-- Preview Gambar -->
            <img src={bannerPreview} alt="Preview Banner" class="w-full h-full object-cover" />
            <!-- Overlay gelap saat gambar di-hover untuk mengganti foto -->
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span class="text-white font-bold px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm">Ubah Banner</span>
            </div>
          {:else}
            <!-- Placeholder (Ikon Gambar Abu-abu) -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-24 h-24 text-gray-400 mb-2">
              <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-600 font-bold text-lg">Klik untuk menambahkan banner</span>
          {/if}
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION: JUDUL & SLUG -->
      <!-- ========================================== -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-2">
        <div class="flex flex-col gap-1.5">
          <label class="text-[#006e33] font-extrabold text-[17px]">Judul Berita</label>
          <input 
            type="text" 
            bind:value={form.judul}
            oninput={generateSlug}
            placeholder="Masukkan Judul Berita" 
            class="w-full border border-[#34a853] rounded-xl px-4 py-3.5 text-gray-800 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all"
            required
          />
        </div>
        
        <div class="flex flex-col gap-1.5">
          <label class="text-[#006e33] font-extrabold text-[17px]">Slug Berita</label>
          <input 
            type="text" 
            bind:value={form.slug}
            placeholder="masukkan-judul-berita" 
            class="w-full border border-[#34a853] rounded-xl px-4 py-3.5 text-gray-800 bg-gray-50 outline-none focus:border-[#006e33] focus:ring-1 focus:ring-[#006e33] transition-all"
            required
          />
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION: KONTEN ARTIKEL (QUILL) -->
      <!-- ========================================== -->
      <div class="flex flex-col gap-2 mt-2">
        <label class="text-[#006e33] font-extrabold text-[17px]">Content Berita</label>
        <QuillEditor bind:content={form.content} />
      </div>

      <!-- TOMBOL SIMPAN -->
      <button 
        type="submit" 
        disabled={isLoading}
        class="w-full mt-4 bg-[#00a651] hover:bg-[#008f45] disabled:bg-gray-400 text-white font-bold text-[19px] py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-3"
      >
        {#if isLoading}
          <!-- Spinner Icon -->
          <svg class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Menyimpan...
        {:else}
          Simpan & Publish
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
        {isSuccess ? 'Ke Daftar Berita' : 'Tutup'}
      </button>
    </div>
  </div>
{/if}