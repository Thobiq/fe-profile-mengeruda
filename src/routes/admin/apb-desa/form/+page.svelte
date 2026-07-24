<script>
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { page } from '$app/stores';
  import api from '$lib/api';

  // State
  let queryYear = $derived($page.url.searchParams.get('year'));
  let selectedYear = $state(new Date().getFullYear());
  let isLoading = $state(false);
  let isSaving = $state(false);
  let showSuccessModal = $state(false);

  // Template kosong jika tidak ada data dari server
  const getEmptyData = () => ({
    pelaksanaan: [
      { title: 'Pendapatan', anggaran: 0, realisasi: 0 },
      { title: 'Belanja', anggaran: 0, realisasi: 0 },
      { title: 'Pembiayaan', anggaran: 0, realisasi: 0 }
    ],
    pendapatan: [
      { title: 'Pendapatan Asli desa', anggaran: 0, realisasi: 0 },
      { title: 'Pendapatan Transfer', anggaran: 0, realisasi: 0 }
    ],
    pembelanjaan: []
  });

  let formData = $state(getEmptyData());

  const fetchApb = async (year) => {
    isLoading = true;
    try {
      const res = await api.get(`/api/apb-desa/${year}`);
      const json = res.data;
      if (res.status === 200 && json.success) {
        formData = json.data.data;
      } else {
        // Reset to empty if not found
        formData = getEmptyData();
      }
    } catch (err) {
      console.error(err);
      formData = getEmptyData();
    } finally {
      isLoading = false;
    }
  };

  onMount(() => {
    if (queryYear) {
      selectedYear = parseInt(queryYear);
      fetchApb(selectedYear);
    }
  });

  // Watcher tahun diubah -> fetch ulang jika BUKAN mode edit
  $effect(() => {
    if (selectedYear && !queryYear) {
      fetchApb(selectedYear);
    }
  });

  const saveApb = async () => {
    isSaving = true;
    try {
      await api.get('/sanctum/csrf-cookie');
      const res = await api.post('/api/apb-desa', {
        year: selectedYear,
        data: formData
      });
      const json = res.data;
      if (res.status === 200 && json.success) {
        showSuccessModal = true;
        setTimeout(() => showSuccessModal = false, 2500);
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan APB Desa.');
    } finally {
      isSaving = false;
    }
  };

  // Helper untuk menambah/menghapus item dinamis
  const addPendapatan = () => {
    formData.pendapatan.push({ title: '', anggaran: 0, realisasi: 0 });
  };
  const removePendapatan = (idx) => {
    formData.pendapatan.splice(idx, 1);
  };

  const addBidang = () => {
    formData.pembelanjaan.push({ title: '', anggaran: 0, realisasi: 0, subBidangList: [] });
  };
  const removeBidang = (idx) => {
    formData.pembelanjaan.splice(idx, 1);
  };

  const addSubBidang = (bidangIdx) => {
    formData.pembelanjaan[bidangIdx].subBidangList.push({ judul: '', kegiatan: [] });
  };
  const removeSubBidang = (bidangIdx, subIdx) => {
    formData.pembelanjaan[bidangIdx].subBidangList.splice(subIdx, 1);
  };

  const addKegiatan = (bidangIdx, subIdx) => {
    formData.pembelanjaan[bidangIdx].subBidangList[subIdx].kegiatan.push({ nama: '', anggaran: 0 });
  };
  const removeKegiatan = (bidangIdx, subIdx, kegIdx) => {
    formData.pembelanjaan[bidangIdx].subBidangList[subIdx].kegiatan.splice(kegIdx, 1);
  };
</script>

<svelte:head>
  <title>Admin - APB Desa</title>
</svelte:head>

<div class="max-w-[1200px] mx-auto pb-20">
  <!-- Header & Year Selector -->
  <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
    <div>
      <h2 class="text-3xl font-serif font-bold text-gray-800">
        {queryYear ? 'Edit Data APB Desa' : 'Tambah Data APB Desa'}
      </h2>
      <p class="text-gray-500 font-serif">Kelola data Anggaran Pendapatan dan Belanja Desa</p>
    </div>
    <div class="flex items-center gap-4">
      <a href="/admin/apb-desa" class="bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
        Kembali ke Tabel
      </a>
      <div class="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm">
        <label for="year" class="font-bold text-[#00a651] font-serif">Tahun APB:</label>
        <input 
          type="number" 
          id="year" 
          bind:value={selectedYear} 
          disabled={!!queryYear}
          class="w-24 border border-gray-300 rounded px-2 py-1 outline-none focus:border-[#00a651] disabled:bg-gray-100 disabled:text-gray-500"
        />
      </div>
    </div>
  </div>

  {#if isLoading}
    <div class="flex justify-center items-center py-20 text-[#00a651]">
      <svg class="animate-spin h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  {:else}
    <div class="space-y-8">
      
      <!-- SECTION PELAKSANAAN -->
      <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div class="bg-[#00a651] px-6 py-4">
          <h3 class="font-serif font-bold text-white text-xl">Bagian 1: Pelaksanaan Induk</h3>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {#each formData.pelaksanaan as item}
            <div class="border border-gray-200 p-4 rounded-xl">
              <h4 class="font-bold text-gray-800 mb-3">{item.title}</h4>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-bold text-gray-500 mb-1">Anggaran (Rp)</label>
                  <input type="number" bind:value={item.anggaran} class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#00a651]" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-500 mb-1">Realisasi (Rp)</label>
                  <input type="number" bind:value={item.realisasi} class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#00a651]" />
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- SECTION PENDAPATAN (Dinamis) -->
      <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div class="bg-[#00a651] px-6 py-4 flex justify-between items-center">
          <h3 class="font-serif font-bold text-white text-xl">Bagian 2: Sumber Pendapatan</h3>
          <button onclick={addPendapatan} class="bg-white text-[#00a651] px-4 py-1.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors">
            + Tambah
          </button>
        </div>
        <div class="p-6">
          {#if formData.pendapatan.length === 0}
            <div class="text-gray-400 text-center py-4">Belum ada item pendapatan.</div>
          {/if}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each formData.pendapatan as item, idx}
              <div class="border border-gray-200 p-4 rounded-xl relative group">
                <button onclick={() => removePendapatan(idx)} class="absolute top-3 right-3 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" /></svg>
                </button>
                <div class="space-y-3 pt-2">
                  <div>
                    <label class="block text-xs font-bold text-gray-500 mb-1">Nama Pendapatan</label>
                    <input type="text" bind:value={item.title} class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#00a651]" placeholder="cth: Pendapatan Asli Desa" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-500 mb-1">Anggaran (Rp)</label>
                    <input type="number" bind:value={item.anggaran} class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#00a651]" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-500 mb-1">Realisasi (Rp)</label>
                    <input type="number" bind:value={item.realisasi} class="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#00a651]" />
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- SECTION PEMBELANJAAN (Dinamis Bertingkat) -->
      <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div class="bg-[#00a651] px-6 py-4 flex justify-between items-center">
          <h3 class="font-serif font-bold text-white text-xl">Bagian 3: Rincian Pembelanjaan</h3>
          <button onclick={addBidang} class="bg-white text-[#00a651] px-4 py-1.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors">
            + Tambah Bidang
          </button>
        </div>
        
        <div class="p-6 space-y-6">
          {#if formData.pembelanjaan.length === 0}
            <div class="text-gray-400 text-center py-4">Belum ada item pembelanjaan.</div>
          {/if}

          {#each formData.pembelanjaan as bidang, bIdx}
            <div class="border-2 border-[#00a651]/20 rounded-xl p-5 bg-green-50/30 relative">
              <button onclick={() => removeBidang(bIdx)} class="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-white p-1 rounded-full shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" /></svg>
              </button>
              
              <!-- Input Bidang Induk -->
              <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                <div class="md:col-span-6">
                  <label class="block text-xs font-bold text-gray-500 mb-1">Nama Bidang</label>
                  <input type="text" bind:value={bidang.title} class="w-full border border-[#00a651]/30 rounded px-3 py-2 outline-none focus:border-[#00a651]" placeholder="cth: Bidang Penyelenggaraan Pemerintah Desa" />
                </div>
                <div class="md:col-span-3">
                  <label class="block text-xs font-bold text-gray-500 mb-1">Total Anggaran (Rp)</label>
                  <input type="number" bind:value={bidang.anggaran} class="w-full border border-[#00a651]/30 rounded px-3 py-2 outline-none focus:border-[#00a651]" />
                </div>
                <div class="md:col-span-3">
                  <label class="block text-xs font-bold text-gray-500 mb-1">Total Realisasi (Rp)</label>
                  <input type="number" bind:value={bidang.realisasi} class="w-full border border-[#00a651]/30 rounded px-3 py-2 outline-none focus:border-[#00a651]" />
                </div>
              </div>

              <!-- Wrapper Sub Bidang -->
              <div class="ml-0 md:ml-6 pl-4 border-l-2 border-gray-200 space-y-4">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-bold text-gray-700">Sub Bidang</h4>
                  <button onclick={() => addSubBidang(bIdx)} class="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-50 font-bold shadow-sm">
                    + Sub Bidang
                  </button>
                </div>
                
                {#each bidang.subBidangList as sub, sIdx}
                  <div class="bg-white border border-gray-200 rounded-lg p-4 relative">
                    <button onclick={() => removeSubBidang(bIdx, sIdx)} class="absolute top-2 right-2 text-red-500 hover:text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
                    </button>
                    
                    <div class="mb-4 w-full pr-8">
                      <label class="block text-xs font-bold text-gray-500 mb-1">Judul Sub Bidang</label>
                      <input type="text" bind:value={sub.judul} class="w-full border border-gray-300 rounded px-3 py-1.5 outline-none focus:border-[#00a651] text-sm" placeholder="cth: A. Penyelenggaraan Belanja..." />
                    </div>

                    <!-- Wrapper Kegiatan -->
                    <div class="bg-gray-50 rounded-lg p-3">
                      <div class="flex items-center justify-between mb-2">
                        <h5 class="font-bold text-gray-600 text-sm">Daftar Kegiatan</h5>
                        <button onclick={() => addKegiatan(bIdx, sIdx)} class="text-[11px] bg-white border border-gray-300 text-gray-600 px-2 py-1 rounded hover:bg-gray-100 font-bold">
                          + Kegiatan
                        </button>
                      </div>

                      <div class="space-y-2">
                        {#each sub.kegiatan as keg, kIdx}
                          <div class="flex items-center gap-2">
                            <input type="text" bind:value={keg.nama} class="flex-grow border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-[#00a651] text-sm" placeholder="Nama Kegiatan" />
                            <input type="number" bind:value={keg.anggaran} class="w-32 border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-[#00a651] text-sm" placeholder="Anggaran" />
                            <button onclick={() => removeKegiatan(bIdx, sIdx, kIdx)} class="text-red-500 hover:text-red-700 p-1 shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
                            </button>
                          </div>
                        {/each}
                        {#if sub.kegiatan.length === 0}
                          <div class="text-xs text-gray-400 italic">Belum ada kegiatan.</div>
                        {/if}
                      </div>
                    </div>
                  </div>
                {/each}
              </div>

            </div>
          {/each}
        </div>
      </div>
      
      <!-- Tombol Submit -->
      <div class="flex justify-end pt-4">
        <button 
          onclick={saveApb}
          disabled={isSaving}
          class="bg-[#00a651] hover:bg-[#008f45] text-white font-serif font-bold text-lg px-10 py-3 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex items-center gap-2"
        >
          {#if isSaving}
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Menyimpan...
          {:else}
            Simpan Perubahan
          {/if}
        </button>
      </div>

    </div>
  {/if}
</div>

<!-- Modal Notifikasi Sukses -->
{#if showSuccessModal}
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm" in:fade={{ duration: 200 }} out:fade={{ duration: 300 }}>
    <div class="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center text-center" in:fly={{ y: 20, duration: 400, delay: 100 }}>
      <div class="w-20 h-20 bg-[#00a651]/10 rounded-full flex items-center justify-center mb-5">
        <div class="w-14 h-14 bg-[#00a651] rounded-full flex items-center justify-center text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      </div>
      <h3 class="text-2xl font-serif font-bold text-gray-800 mb-2">Berhasil!</h3>
      <p class="text-gray-500 font-medium">Data APB Desa tahun {selectedYear} telah disimpan ke sistem.</p>
    </div>
  </div>
{/if}
