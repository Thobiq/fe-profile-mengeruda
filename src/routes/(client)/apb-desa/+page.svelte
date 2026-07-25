<script>
  import { onMount } from 'svelte';
  import ApbCard from '$lib/components/ApbCard.svelte';
  import ApbSection from '$lib/components/ApbSection.svelte';
  import ApbPembelanjaanCard from '$lib/components/ApbPembelanjaanCard.svelte';

  let availableYears = $state([new Date().getFullYear()]);
  let selectedYear = $state(new Date().getFullYear());
  let currentData = $state(null);
  let isLoading = $state(true);
  
  // Format data kosong jika backend mereturn null untuk sebuah tahun
  const emptyData = {
    pelaksanaan: [],
    pendapatan: [],
    pembelanjaan: []
  };

  // Fungsi ambil daftar tahun yang tersedia
  const fetchYears = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/apb-desa`);
      const json = await res.json();
      if (res.ok && json.success && json.data.length > 0) {
        availableYears = json.data.map(item => item.year);
        // Set tahun terbaru sebagai default jika ada
        if (!availableYears.includes(selectedYear)) {
          selectedYear = availableYears[0];
        }
      }
    } catch (err) {
      console.error("Gagal mengambil daftar tahun APB:", err);
    }
  };

  // Fungsi ambil detail APB per tahun
  const fetchApbByYear = async (year) => {
    isLoading = true;
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/apb-desa/${year}`);
      const json = await res.json();
      if (res.ok && json.success && json.data.data) {
        currentData = json.data.data;
      } else {
        currentData = emptyData;
      }
    } catch (err) {
      console.error("Gagal mengambil data APB:", err);
      currentData = emptyData;
    } finally {
      isLoading = false;
    }
  };

  onMount(async () => {
    await fetchYears();
    await fetchApbByYear(selectedYear);
  });

  // Re-fetch saat pengguna mengganti dropdown tahun
  $effect(() => {
    if (selectedYear) {
      fetchApbByYear(selectedYear);
    }
  });
</script>

<svelte:head>
  <title>APB Desa - Desa Mengeruda</title>
</svelte:head>

<main class="w-full bg-[#fcfcfc] py-16 min-h-screen">
  <div class="max-w-[1100px] mx-auto px-4 md:px-8">
    
    <!-- Bagian 1: Pelaksanaan & Pendapatan -->
    <div class="border border-[#00a651] rounded-[2rem] bg-white p-6 md:p-10 shadow-sm mb-16">
      
      <!-- Header APB Desa -->
      <div class="text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-serif font-bold text-[#006e33] mb-3">
          APB Desa Mengeruda {selectedYear}
        </h1>
        <p class="text-gray-800 font-serif text-sm md:text-base font-bold max-w-2xl mx-auto leading-relaxed">
          Desa Mengruda, Kecamatan Soa, Kabupaten Ngada,<br/>
          Provinsi Nusa Tenggara timur
        </p>
      </div>

      <!-- Tahun Selection -->
      <div class="flex items-center justify-center gap-3 mb-12">
        <label for="tahun" class="text-xl font-bold font-serif text-[#00a651]">Tahun</label>
        <div class="relative">
          <select 
            id="tahun"
            bind:value={selectedYear}
            class="appearance-none border border-[#00a651] text-xl font-bold font-serif text-gray-800 rounded-full py-1.5 pl-6 pr-10 outline-none focus:ring-2 focus:ring-[#00a651] bg-white cursor-pointer"
          >
            {#each availableYears as year}
              <option value={year}>{year}</option>
            {/each}
          </select>
          <!-- Custom Dropdown Icon -->
          <div class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#00a651]">
            <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
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
      {:else if currentData && currentData.pelaksanaan?.length === 0 && currentData.pendapatan?.length === 0 && currentData.pembelanjaan?.length === 0}
        <div class="text-center py-16">
          <svg class="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 class="text-xl font-bold text-gray-900 font-serif mb-2">Belum Ada Data APB</h3>
          <p class="text-gray-500 font-serif">Data APB Desa untuk tahun {selectedYear} belum tersedia atau belum ditambahkan oleh administrator.</p>
        </div>
      {:else if currentData}
        <!-- Section: Pelaksanaan -->
        {#if currentData.pelaksanaan && currentData.pelaksanaan.length > 0}
          <ApbSection title="Pelaksanaan">
            {#each currentData.pelaksanaan as item}
              <ApbCard 
                title={item.title} 
                anggaran={item.anggaran} 
                realisasi={item.realisasi} 
              />
            {/each}
          </ApbSection>
        {/if}

        <!-- Section: Pendapatan -->
        {#if currentData.pendapatan && currentData.pendapatan.length > 0}
          <ApbSection title="Pendapatan">
            {#each currentData.pendapatan as item}
              <ApbCard 
                title={item.title} 
                anggaran={item.anggaran} 
                realisasi={item.realisasi} 
              />
            {/each}
          </ApbSection>
        {/if}
      {/if}
    </div>

    <!-- Bagian 2: Pembelanjaan -->
    {#if !isLoading && currentData && currentData.pembelanjaan && currentData.pembelanjaan.length > 0}
      <div class="text-center mb-10">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#006e33] mb-2 leading-tight">
          Pembelanjaan APB Desa<br/>Mengeruda {selectedYear}
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {#each currentData.pembelanjaan as item}
          <ApbPembelanjaanCard 
            title={item.title}
            anggaran={item.anggaran}
            realisasi={item.realisasi}
            subBidangList={item.subBidangList}
          />
        {/each}
      </div>
    {/if}

  </div>
</main>
