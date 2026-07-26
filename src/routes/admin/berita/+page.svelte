<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import api from '$lib/api';

  // Data berita dari backend
  let beritaList = $state([]);
  let isLoading = $state(true);
  let showDeleteModal = $state(false);
  let beritaToDelete = $state(null);
  let isDeleting = $state(false);

  // Ambil data dari backend saat komponen dimuat
  onMount(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/news`);
      const json = await res.json();
      if (res.ok && json.success) {
        // Format ulang tanggal (dari created_at) untuk sesuai dengan format tabel (DD/MM/YYYY)
        beritaList = json.data.map(item => {
          const dateObj = new Date(item.created_at);
          const day = String(dateObj.getDate()).padStart(2, '0');
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const year = dateObj.getFullYear();
          
          return {
            id: item.id,
            judul: item.judul,
            slug: item.slug,
            tanggal: `${day}/${month}/${year}`
          };
        });
      }
    } catch (err) {
      console.error("Gagal mengambil data berita:", err);
    } finally {
      isLoading = false;
    }
  });

  // State untuk pencarian dan pengurutan
  let searchQuery = $state('');
  let sortColumn = $state('tanggal');
  let sortAscending = $state(false);

  // Fungsi untuk mengubah urutan kolom
  function sortBy(column) {
    if (sortColumn === column) {
      sortAscending = !sortAscending; // Balikkan urutan jika kolom yang sama diklik
    } else {
      sortColumn = column;
      sortAscending = true; // Default A-Z jika kolom baru
    }
  }

  // Data turunan (derived) yang otomatis terfilter dan terurut
  let filteredAndSortedBerita = $derived(() => {
    // 1. Filter berdasarkan pencarian
    let filtered = beritaList.filter(berita => 
      berita.judul.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Urutkan berdasarkan kolom
    return filtered.sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];

      // Penanganan khusus untuk format tanggal DD/MM/YYYY agar bisa diurutkan dengan benar
      if (sortColumn === 'tanggal') {
        valA = a.tanggal.split('/').reverse().join('');
        valB = b.tanggal.split('/').reverse().join('');
      }

      if (valA < valB) return sortAscending ? -1 : 1;
      if (valA > valB) return sortAscending ? 1 : -1;
      return 0;
    });
  });

  // Fungsi untuk menyalin link
  function copyLink(slug) {
    const url = `https://mengeruda.id/berita/${slug}`;
    navigator.clipboard.writeText(url);
    alert('Link berhasil disalin!');
  }

  // Fungsi untuk membuka modal hapus berita
  function hapusBerita(id, judul) {
    beritaToDelete = { id, judul };
    showDeleteModal = true;
  }

  // Eksekusi penghapusan berita dari backend
  async function executeDelete() {
    if (!beritaToDelete) return;
    isDeleting = true;
    try {
      const res = await api.delete(`/api/news/${beritaToDelete.id}`);
      if (res.data.success) {
        beritaList = beritaList.filter(b => b.id !== beritaToDelete.id);
        showDeleteModal = false;
        beritaToDelete = null;
      } else {
        alert(res.data.message || 'Gagal menghapus berita.');
      }
    } catch (err) {
      alert('Gagal menghapus berita.');
      console.error(err);
    } finally {
      isDeleting = false;
    }
  }
</script>

<svelte:head>
  <title>Data Berita - Admin Panel</title>
</svelte:head>

<div class="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
  
  <!-- TOP BAR: Tombol Tambah & Input Cari -->
  <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
    
    <!-- Tombol Tambah -->
    <a href="/admin/berita/tambah" class="w-full md:w-auto bg-[#00a651] hover:bg-[#008f45] text-white font-bold text-[15px] px-6 py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
      </svg>
      Tambah
    </a>

    <!-- Input Cari -->
    <div class="w-full md:w-[300px] relative">
      <input 
        type="text" 
        bind:value={searchQuery}
        placeholder="Cari data" 
        class="w-full border border-gray-400 rounded-full px-5 py-2.5 text-[15px] outline-none focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651] transition-all"
      />
    </div>

  </div>

  <!-- TABLE CONTAINER -->
  <div class="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
    <table class="w-full text-left border-collapse min-w-[800px]">
      
      <!-- HEADER TABEL -->
      <thead class="bg-[#00a651] text-white">
        <tr>
          <!-- Kolom Judul -->
          <th class="py-4 px-6 font-bold text-[15px] cursor-pointer hover:bg-[#008f45] transition-colors" onclick={() => sortBy('judul')}>
            <div class="flex items-center gap-2">
              Judul Berita
              {#if sortColumn === 'judul'}
                <span class="text-white shrink-0">{sortAscending ? '▲' : '▼'}</span>
              {:else}
                <span class="text-white/40 shrink-0">↕</span>
              {/if}
            </div>
          </th>
          
          <!-- Kolom Link -->
          <th class="py-4 px-6 font-bold text-[15px] cursor-pointer hover:bg-[#008f45] transition-colors" onclick={() => sortBy('slug')}>
            <div class="flex items-center gap-2">
              Link Berita
              {#if sortColumn === 'slug'}
                <span class="text-white shrink-0">{sortAscending ? '▲' : '▼'}</span>
              {:else}
                <span class="text-white/40 shrink-0">↕</span>
              {/if}
            </div>
          </th>
          
          <!-- Kolom Tanggal -->
          <th class="py-4 px-6 font-bold text-[15px] cursor-pointer hover:bg-[#008f45] transition-colors" onclick={() => sortBy('tanggal')}>
            <div class="flex items-center gap-2">
              Tanggal dibuat
              {#if sortColumn === 'tanggal'}
                <span class="text-white shrink-0">{sortAscending ? '▲' : '▼'}</span>
              {:else}
                <span class="text-white/40 shrink-0">↕</span>
              {/if}
            </div>
          </th>
          
          <!-- Kolom Aksi (Tanpa Sorting) -->
          <th class="py-4 px-6 font-bold text-[15px] w-24 text-center">
            Aksi
          </th>
        </tr>
      </thead>
      
      <!-- BODY TABEL (Zebra Striping) -->
      <tbody>
        <!-- Memanggil fungsi derived menggunakan () -->
        {#each filteredAndSortedBerita() as berita}
          <!-- even:bg-[#eaeaea] odd:bg-white menciptakan efek selang-seling abu-abu & putih -->
          <tr class="border-b border-gray-100 even:bg-[#f3f4f6] odd:bg-white hover:bg-[#eaf5ef] transition-colors">
            
            <td class="py-4 px-6 text-gray-700 font-medium">
              {berita.judul}
            </td>
            
            <!-- Kolom Link + Ikon Copy -->
            <td class="py-4 px-6 text-gray-500 flex items-center gap-3">
              <span class="truncate max-w-[250px]" title={`https://mengeruda.id/berita/${berita.slug}`}>
                https://mengeruda.id/berita/{berita.slug}
              </span>
              <button onclick={() => copyLink(berita.slug)} class="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Copy link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5h.008c.14.001.281.002.421.005a3 3 0 012.734 1.608zm-1.04 11.082V21a3 3 0 01-3 3H4.5a3 3 0 01-3-3v-9.642a3 3 0 013-3h9.123c1.55 0 2.825 1.157 2.986 2.673zM5.25 13.5a.75.75 0 000 1.5h6a.75.75 0 000-1.5h-6zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clip-rule="evenodd" />
                </svg>
              </button>
            </td>
            
            <td class="py-4 px-6 text-gray-700">
              {berita.tanggal}
            </td>
            
            <!-- Kolom Aksi (Edit & Hapus) -->
            <td class="py-4 px-6 flex items-center justify-center gap-3">
              <!-- Edit Icon (Kuning/Biru) -->
              <a href={`/admin/berita/edit/${berita.id}`} class="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-lg transition-colors" aria-label="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </a>
              <!-- Delete Icon (Merah) -->
              <button onclick={() => hapusBerita(berita.id, berita.judul)} class="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition-colors" aria-label="Hapus">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                  <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                </svg>
              </button>
            </td>
            
          </tr>
        {/each}

        <!-- Tampilan jika data kosong -->
        {#if filteredAndSortedBerita().length === 0}
          <tr>
            <td colspan="4" class="py-8 text-center text-gray-500 font-medium">
              Data berita tidak ditemukan.
            </td>
          </tr>
        {/if}
      </tbody>

    </table>
  </div>
</div>

<!-- Modal Konfirmasi Hapus Berita -->
{#if showDeleteModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" transition:fade={{ duration: 200 }}>
    <div 
      class="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 md:p-8 text-center"
      transition:scale={{ duration: 300, start: 0.95 }}
    >
      <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 class="text-2xl font-bold font-serif text-gray-900 mb-2">Hapus Berita?</h3>
      <p class="text-gray-500 mb-8">Anda yakin ingin menghapus berita "{beritaToDelete?.judul || 'Tanpa Judul'}"? Tindakan ini tidak dapat dibatalkan.</p>
      
      <div class="flex flex-col sm:flex-row gap-3">
        <button 
          class="flex-1 py-3 px-4 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          onclick={() => { showDeleteModal = false; beritaToDelete = null; }}
          disabled={isDeleting}
        >
          Batal
        </button>
        <button 
          class="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
          onclick={executeDelete}
          disabled={isDeleting}
        >
          {#if isDeleting}
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Menghapus...
          {:else}
            Ya, Hapus
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}