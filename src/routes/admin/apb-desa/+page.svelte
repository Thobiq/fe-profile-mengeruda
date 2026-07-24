<script>
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import api from '$lib/api';
  
  let apbList = $state([]);
  let isLoading = $state(true);

  // Modal states
  let showDeleteModal = $state(false);
  let yearToDelete = $state(null);
  let isDeleting = $state(false);

  const fetchApbList = async () => {
    isLoading = true;
    try {
      const res = await api.get('/api/apb-desa');
      const json = res.data;
      if (res.status === 200 && json.success) {
        apbList = json.data;
      }
    } catch (err) {
      console.error(err);
    } finally {
      isLoading = false;
    }
  };

  const confirmDelete = (year) => {
    yearToDelete = year;
    showDeleteModal = true;
  };

  const executeDelete = async () => {
    if (!yearToDelete) return;
    
    isDeleting = true;
    try {
      await api.get('/sanctum/csrf-cookie');
      const res = await api.delete(`/api/apb-desa/${yearToDelete}`);
      const json = res.data;
      if (res.status === 200 && json.success) {
        // Hapus dari list lokal agar cepat tanpa reload
        apbList = apbList.filter(item => item.year !== yearToDelete);
        showDeleteModal = false;
      } else {
        alert(json.message || 'Gagal menghapus data.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan pada server saat menghapus data.');
    } finally {
      isDeleting = false;
      yearToDelete = null;
    }
  };

  onMount(() => {
    fetchApbList();
  });
</script>

<svelte:head>
  <title>Admin - Daftar APB Desa</title>
</svelte:head>

<div class="max-w-[1200px] mx-auto pb-20">
  <!-- Header & Add Button -->
  <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
    <div>
      <h2 class="text-3xl font-serif font-bold text-gray-800">Daftar APB Desa</h2>
      <p class="text-gray-500 font-serif">Kelola rincian Anggaran Pendapatan dan Belanja Desa (APB)</p>
    </div>
    <div>
      <a href="/admin/apb-desa/form" class="bg-[#00a651] hover:bg-[#008f45] text-white px-5 py-2.5 rounded-xl font-bold font-serif transition-colors shadow-sm flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        Tambah Data APB
      </a>
    </div>
  </div>

  <!-- Data Table -->
  <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200 text-gray-600 font-serif">
            <th class="py-4 px-6 font-bold w-20 text-center">No</th>
            <th class="py-4 px-6 font-bold">Tahun APB</th>
            <th class="py-4 px-6 font-bold w-48 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {#if isLoading}
            <tr>
              <td colspan="3" class="py-16 text-center text-gray-400">
                <svg class="animate-spin h-8 w-8 mx-auto text-[#00a651]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </td>
            </tr>
          {:else if apbList.length === 0}
            <tr>
              <td colspan="3" class="py-12 text-center">
                <p class="text-gray-500 font-serif font-medium">Belum ada data APB Desa yang tersimpan.</p>
              </td>
            </tr>
          {:else}
            {#each apbList as apb, index}
              <tr class="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                <td class="py-4 px-6 text-center text-gray-600">{index + 1}</td>
                <td class="py-4 px-6 font-bold text-gray-800 text-lg">APB Desa Tahun {apb.year}</td>
                <td class="py-4 px-6 text-center">
                  <div class="flex justify-center gap-2">
                    <a href={`/admin/apb-desa/form?year=${apb.year}`} class="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
                      Edit
                    </a>
                    <button onclick={() => confirmDelete(apb.year)} class="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Modal Konfirmasi Hapus -->
{#if showDeleteModal}
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" in:fade={{ duration: 200 }} out:fade={{ duration: 300 }}>
    <div class="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center text-center" in:scale={{ start: 0.95, duration: 300, delay: 50 }}>
      <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-5">
        <div class="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </div>
      </div>
      <h3 class="text-2xl font-serif font-bold text-gray-800 mb-2">Hapus APB Desa?</h3>
      <p class="text-gray-500 font-medium mb-6">Data APB Desa tahun <span class="font-bold text-gray-700">{yearToDelete}</span> akan dihapus permanen dan tidak dapat dipulihkan.</p>
      
      <div class="flex items-center gap-3 w-full">
        <button 
          onclick={() => showDeleteModal = false}
          disabled={isDeleting}
          class="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          Batal
        </button>
        <button 
          onclick={executeDelete}
          disabled={isDeleting}
          class="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {#if isDeleting}
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Proses...
          {:else}
            Ya, Hapus!
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}
