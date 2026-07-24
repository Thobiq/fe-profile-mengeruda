<script>
  import { fly, fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  
  let { data } = $props();

  let ready = $state(false);
  onMount(() => {
    ready = true;
  });

  // Helper function untuk memformat angka dengan pemisah ribuan
  const formatNumber = (num) => {
    return Number(num).toLocaleString('id-ID');
  };

  // Hitung total semua pekerjaan untuk persentase
  let totalPekerjaan = $derived(
    (data?.pekerjaan_data || []).reduce((acc, curr) => acc + (curr.count || 0), 0)
  );

  const calcPercent = (val) => {
    if (!totalPekerjaan) return 0;
    return ((val / totalPekerjaan) * 100).toFixed(1);
  };

  // Data pekerjaan yang dimapping dari data dinamis
  let pekerjaanData = $derived(
    (data?.pekerjaan_data || []).map(p => ({
      name: p.name,
      count: p.count || 0,
      percent: calcPercent(p.count || 0)
    }))
  );
</script>

<section class="w-full py-16 bg-[#ebf5ec] overflow-hidden">
  <div class="max-w-[1300px] mx-auto px-6">
    
    {#if ready}
      <div in:fade={{ duration: 800 }} class="text-center mb-12">
        <h2 class="text-3xl md:text-[42px] font-serif font-bold text-[#008f45] mb-3 tracking-wide">
          Berdasarkan Pekerjaan
        </h2>
        <p class="text-gray-800 font-serif text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          informasi lengkap mengenai karakteristik demografi penduduk<br/>Desa Mengeruda
        </p>
      </div>

      <!-- Container Cards -->
      <div class="flex flex-wrap justify-center gap-4 md:gap-5">
        {#each pekerjaanData as job, i}
          <div 
            in:fly={{ y: 50, duration: 600, delay: i * 50 }} 
            class="relative w-[150px] h-[100px] md:w-[220px] md:h-[110px] bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-default overflow-hidden group"
          >
            <!-- Title -->
            <div class="flex items-start gap-2 p-3 md:p-4">
              <div class="w-2.5 h-2.5 rounded-full bg-[#00a651] mt-1.5 md:mt-1 shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
              <span class="font-serif text-[13px] md:text-[15px] font-bold text-[#005a2e] leading-snug md:leading-tight pr-6 group-hover:text-[#008f45] transition-colors duration-300">
                {job.name}
              </span>
            </div>
            
            <!-- Number Block at bottom right -->
            <div class="absolute bottom-0 right-0 bg-[#007b3b] text-white rounded-tl-2xl px-5 py-2 md:px-6 md:py-2.5 font-serif text-lg md:text-2xl font-bold group-hover:bg-[#005a2e] transition-colors duration-300">
              {job.count}
            </div>
          </div>
        {/each}
      </div>
    {/if}
    
  </div>
</section>
