<script>
  import { onMount } from 'svelte';
  import { fade, scale, slide } from 'svelte/transition';
  import api from '$lib/api';

  // State Form Demografi
  let form = $state({
    // Penduduk Umum
    total_penduduk: 0,
    total_kk: 0,
    laki_laki: 0,
    perempuan: 0,
  });

  // Data Dinamis
  let dusun_data = $state([]);
  let pekerjaan_data = $state([]);
  let agama_data = $state([]);

  // State UI
  let isLoadingData = $state(true);
  let isSaving = $state(false);

  // State Modal Notifikasi
  let showModal = $state(false);
  let modalMessage = $state('');
  let isSuccess = $state(true);

  function closeModal() {
    showModal = false;
  }

  // Load data awal dari backend
  onMount(async () => {
    try {
      const res = await api.get('/api/demographic');
      const json = res.data;
      if (res.status === 200 && json.success && json.data) {
        form = {
          total_penduduk: json.data.total_penduduk || 0,
          total_kk: json.data.total_kk || 0,
          laki_laki: json.data.laki_laki || 0,
          perempuan: json.data.perempuan || 0,
        };
        dusun_data = json.data.dusun_data || [];
        pekerjaan_data = json.data.pekerjaan_data || [];
        agama_data = json.data.agama_data || [];
      }
    } catch (err) {
      console.error("Gagal load data demografi:", err);
    } finally {
      isLoadingData = false;
    }
  });

  // Dynamic Handlers
  function addDusun() {
    dusun_data = [...dusun_data, { name: '', count: 0 }];
  }
  function removeDusun(index) {
    dusun_data = dusun_data.filter((_, i) => i !== index);
  }

  function addPekerjaan() {
    pekerjaan_data = [...pekerjaan_data, { name: '', count: 0 }];
  }
  function removePekerjaan(index) {
    pekerjaan_data = pekerjaan_data.filter((_, i) => i !== index);
  }

  function addAgama() {
    agama_data = [...agama_data, { name: '', count: 0 }];
  }
  function removeAgama(index) {
    agama_data = agama_data.filter((_, i) => i !== index);
  }

  // Fungsi simpan data ke backend
  async function handleSimpan(e) {
    e.preventDefault();
    isSaving = true;

    // Pastikan string angka diconvert ke number
    const payload = {
      ...form,
      dusun_data: dusun_data.map(d => ({ name: d.name, count: parseInt(d.count) || 0 })),
      pekerjaan_data: pekerjaan_data.map(p => ({ name: p.name, count: parseInt(p.count) || 0 })),
      agama_data: agama_data.map(a => ({ name: a.name, count: parseInt(a.count) || 0 }))
    };

    try {
      await api.get('/sanctum/csrf-cookie');
      const res = await api.post('/api/demographic', payload);
      const json = res.data;

      if (res.status === 200 && json.success) {
        modalMessage = "Data demografi penduduk berhasil disimpan!";
        isSuccess = true;
      } else {
        modalMessage = "Gagal menyimpan data: " + (json.message || "Unknown error");
        isSuccess = false;
      }
    } catch (err) {
      console.error("Error simpan demografi:", err);
      modalMessage = "Terjadi kesalahan sistem saat menyimpan. " + (err.response?.data?.message || err.message || "");
      isSuccess = false;
    } finally {
      isSaving = false;
      showModal = true;
    }
  }
</script>

<svelte:head>
  <title>Demografi Penduduk - Admin Panel</title>
</svelte:head>

<div class="max-w-[1200px] pb-12">
  <div class="mb-8">
    <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Manajemen Demografi Penduduk</h1>
    <p class="text-gray-500 mt-2 text-[17px]">
      Perbarui data populasi, tambahkan dusun, statistik pekerjaan, dan agama secara dinamis.
    </p>
  </div>

  {#if isLoadingData}
    <div class="flex items-center justify-center p-12">
      <svg class="animate-spin h-8 w-8 text-[#00a651]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="ml-3 text-gray-600 font-medium text-lg">Memuat Data...</span>
    </div>
  {:else}
    <form onsubmit={handleSimpan} class="flex flex-col gap-8">
      
      <!-- ========================================== -->
      <!-- SECTION 1: PENDUDUK UMUM                   -->
      <!-- ========================================== -->
      <div class="bg-white border border-[#34a853]/40 rounded-3xl p-6 md:p-8 shadow-sm">
        <h2 class="text-xl font-bold text-[#006e33] mb-6 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
          </svg>
          1. Statistik Penduduk & Keluarga
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="flex flex-col gap-1.5">
            <label class="text-gray-700 font-semibold text-[15px]">Total Penduduk</label>
            <input type="number" min="0" bind:value={form.total_penduduk} class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651] transition-all bg-gray-50" required />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-gray-700 font-semibold text-[15px]">Total Kepala Keluarga</label>
            <input type="number" min="0" bind:value={form.total_kk} class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651] transition-all bg-gray-50" required />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-gray-700 font-semibold text-[15px]">Laki-laki</label>
            <input type="number" min="0" bind:value={form.laki_laki} class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651] transition-all bg-gray-50" required />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-gray-700 font-semibold text-[15px]">Perempuan</label>
            <input type="number" min="0" bind:value={form.perempuan} class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 outline-none focus:border-[#00a651] focus:ring-1 focus:ring-[#00a651] transition-all bg-gray-50" required />
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- SECTION 2: PERSEBARAN DUSUN                -->
      <!-- ========================================== -->
      <div class="bg-white border border-[#34a853]/40 rounded-3xl p-6 md:p-8 shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-[#006e33] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
            2. Persebaran Penduduk Berdasarkan Dusun
          </h2>
          <button type="button" onclick={addDusun} class="px-4 py-2 bg-[#00a651]/10 text-[#00a651] font-semibold rounded-xl hover:bg-[#00a651]/20 transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
            Tambah Dusun
          </button>
        </div>
        
        {#if dusun_data.length === 0}
          <div class="text-center py-6 text-gray-500 italic bg-gray-50 rounded-xl">Belum ada data dusun. Klik "Tambah Dusun".</div>
        {:else}
          <div class="grid grid-cols-1 gap-4">
            {#each dusun_data as item, index}
              <div transition:slide class="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                <div class="flex-1 w-full">
                  <label class="text-gray-700 font-semibold text-[13px] mb-1 block">Nama Dusun</label>
                  <input type="text" bind:value={item.name} placeholder="Contoh: Tengah Tiba" class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 outline-none focus:border-[#00a651] bg-gray-50" required />
                </div>
                <div class="w-full sm:w-48 shrink-0">
                  <label class="text-gray-700 font-semibold text-[13px] mb-1 block">Jumlah Penduduk</label>
                  <input type="number" min="0" bind:value={item.count} class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 outline-none focus:border-[#00a651] bg-gray-50" required />
                </div>
                <button type="button" onclick={() => removeDusun(index)} class="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors mb-[1px]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" /></svg>
                </button>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- ========================================== -->
      <!-- SECTION 3: PEKERJAAN                       -->
      <!-- ========================================== -->
      <div class="bg-white border border-[#34a853]/40 rounded-3xl p-6 md:p-8 shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-[#006e33] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.36-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm3 0v.25c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-.25a1.5 1.5 0 00-1.5-1.5h-1.5a1.5 1.5 0 00-1.5 1.5z" clip-rule="evenodd" />
              <path d="M3 15.25v2.798c0 1.696 1.52 2.947 3.35 2.892 1.674-.05 3.616-.222 5.65-.222 2.034 0 3.976.172 5.65.222 1.83.055 3.35-1.196 3.35-2.892v-2.798c-2.58.756-5.334 1.15-8.15 1.15s-5.57-.394-8.15-1.15z" />
            </svg>
            3. Statistik Pekerjaan
          </h2>
          <button type="button" onclick={addPekerjaan} class="px-4 py-2 bg-[#00a651]/10 text-[#00a651] font-semibold rounded-xl hover:bg-[#00a651]/20 transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
            Tambah Pekerjaan
          </button>
        </div>
        
        {#if pekerjaan_data.length === 0}
          <div class="text-center py-6 text-gray-500 italic bg-gray-50 rounded-xl">Belum ada data pekerjaan. Klik "Tambah Pekerjaan".</div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each pekerjaan_data as item, index}
              <div transition:slide class="flex gap-2 items-center bg-gray-50 p-2 rounded-xl border border-gray-100">
                <input type="text" bind:value={item.name} placeholder="Jenis Pekerjaan" class="w-full border-none rounded-lg px-3 py-2 text-gray-800 outline-none focus:ring-1 focus:ring-[#00a651] bg-white shadow-sm text-sm" required />
                <input type="number" min="0" bind:value={item.count} class="w-24 shrink-0 border-none rounded-lg px-3 py-2 text-gray-800 outline-none focus:ring-1 focus:ring-[#00a651] bg-white shadow-sm text-sm" required />
                <button type="button" onclick={() => removePekerjaan(index)} class="p-2 text-red-400 hover:text-red-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" /></svg>
                </button>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- ========================================== -->
      <!-- SECTION 4: AGAMA                           -->
      <!-- ========================================== -->
      <div class="bg-white border border-[#34a853]/40 rounded-3xl p-6 md:p-8 shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-[#006e33] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M12 2.25c-1.2 0-2.25.96-2.5 2.13L9 5H7.5c-1.24 0-2.25 1.01-2.25 2.25v2.5a3.75 3.75 0 0 0 1.94 3.28V20.25c0 .41.34.75.75.75h8.12c.41 0 .75-.34.75-.75v-7.22a3.75 3.75 0 0 0 1.94-3.28V7.25c0-1.24-1.01-2.25-2.25-2.25H15l-.5-.62c-.25-1.17-1.3-2.13-2.5-2.13zM6.75 7.25c0-.41.34-.75.75-.75h9c.41 0 .75.34.75.75v2.5a2.25 2.25 0 0 1-2.25 2.25h-4.5a2.25 2.25 0 0 1-2.25-2.25v-2.5z" />
            </svg>
            4. Statistik Agama
          </h2>
          <button type="button" onclick={addAgama} class="px-4 py-2 bg-[#00a651]/10 text-[#00a651] font-semibold rounded-xl hover:bg-[#00a651]/20 transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
            Tambah Agama
          </button>
        </div>
        
        {#if agama_data.length === 0}
          <div class="text-center py-6 text-gray-500 italic bg-gray-50 rounded-xl">Belum ada data agama. Klik "Tambah Agama".</div>
        {:else}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {#each agama_data as item, index}
              <div transition:slide class="flex gap-2 items-center bg-gray-50 p-2 rounded-xl border border-gray-100">
                <input type="text" bind:value={item.name} placeholder="Nama Agama" class="w-full border-none rounded-lg px-3 py-2 text-gray-800 outline-none focus:ring-1 focus:ring-[#00a651] bg-white shadow-sm" required />
                <input type="number" min="0" bind:value={item.count} class="w-32 shrink-0 border-none rounded-lg px-3 py-2 text-gray-800 outline-none focus:ring-1 focus:ring-[#00a651] bg-white shadow-sm" required />
                <button type="button" onclick={() => removeAgama(index)} class="p-2 text-red-400 hover:text-red-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" /></svg>
                </button>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- ========================================== -->
      <!-- TOMBOL SIMPAN                              -->
      <!-- ========================================== -->
      <button 
        type="submit" 
        disabled={isSaving}
        class="w-full bg-[#00a651] hover:bg-[#008f45] disabled:bg-gray-400 text-white font-bold text-[19px] py-4 rounded-2xl shadow-md transition-colors mt-2 flex items-center justify-center gap-3"
      >
        {#if isSaving}
          <svg class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Menyimpan Data...
        {:else}
          Simpan Data Demografi
        {/if}
      </button>

    </form>
  {/if}
</div>

<!-- ========================================== -->
<!-- MODAL NOTIFICATION                         -->
<!-- ========================================== -->
{#if showModal}
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-4"
      transition:scale={{ duration: 300, start: 0.95 }}
    >
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
        Tutup
      </button>
    </div>
  </div>
{/if}
