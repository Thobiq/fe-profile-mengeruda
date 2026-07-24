<script>
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  let { data } = $props();

  let ready = $state(false);
  onMount(() => {
    ready = true;
  });

  const colors = ['#76a036', '#dc8327', '#0c88c7', '#b14620', '#8e44ad', '#2c3e50', '#e74c3c', '#f1c40f', '#16a085', '#d35400'];

  let totalDusun = $derived(
    (data?.dusun_data || []).reduce((acc, curr) => acc + (curr.count || 0), 0)
  );

  let dusunData = $derived(
    (data?.dusun_data || []).map((d, i) => {
      const count = d.count || 0;
      const pct = totalDusun ? (count / totalDusun) * 100 : 0;
      return {
        name: d.name,
        count: count,
        percent: pct.toFixed(1),
        color: colors[i % colors.length]
      };
    })
  );

  let conicGradient = $derived(() => {
    if (dusunData.length === 0) return 'conic-gradient(#e2e8f0 0% 100%)';
    let currentPct = 0;
    let gradientParts = [];
    for (let d of dusunData) {
      const start = currentPct;
      currentPct += Number(d.percent);
      // to avoid rounding issues causing gaps, the last one should go to 100%
      let end = currentPct;
      if (d === dusunData[dusunData.length - 1]) end = 100;
      gradientParts.push(`${d.color} ${start}% ${end}%`);
    }
    return `conic-gradient(${gradientParts.join(', ')})`;
  });

</script>

<section class="w-full py-12 bg-white overflow-hidden">
  <div class="max-w-[1200px] mx-auto px-6">
    
    {#if ready}
      <div in:fade={{ duration: 800 }} class="text-center mb-16">
        <h2 class="text-3xl md:text-[42px] font-serif font-bold text-[#008f45] mb-3 tracking-wide">
          Berdasarkan Dusun
        </h2>
        <p class="text-gray-800 font-serif text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          informasi lengkap mengenai karakteristik demografi penduduk<br/>Desa Mengeruda
        </p>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
        
        <!-- Pie Chart -->
        <div in:fly={{ x: -50, duration: 800, delay: 200 }} class="flex flex-col items-center gap-8 w-full md:w-1/2 max-w-sm">
          <div 
            class="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] shrink-0 group cursor-default"
          >
            <div 
              class="w-full h-full rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-6 group-hover:shadow-[0_0_25px_rgba(0,0,0,0.2)]" 
              style="background: {conicGradient()};"
            ></div>
          </div>
          
          <!-- Legend -->
          <div class="flex flex-wrap justify-center gap-4 mt-2">
            {#each dusunData as d}
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" style="background-color: {d.color};"></div>
                <span class="font-serif text-[15px] text-gray-800">{d.name} <span class="font-semibold text-gray-900 ml-1">({d.percent}%)</span></span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Table -->
        <div in:fly={{ x: 50, duration: 800, delay: 400 }} class="w-full md:w-1/2 max-w-lg shrink-0 transition-transform duration-500 hover:-translate-y-2">
          <div class="border-[2px] border-[#00a651] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 bg-white">
            <div class="flex flex-col">
              
              <!-- Header -->
              <div class="flex bg-[#00a651] text-white">
                <div class="w-1/2 py-4 px-2 text-center font-serif text-lg md:text-xl border-r border-white/50 flex items-center justify-center">Dusun</div>
                <div class="w-1/2 py-4 px-2 text-center font-serif text-lg md:text-xl flex items-center justify-center">Jumlah Penduduk</div>
              </div>
              
              <!-- Dynamic Rows -->
              {#each dusunData as d}
                <div class="flex bg-white hover:bg-[#eef8f1] transition-colors duration-300 text-gray-700 border-b border-[#00a651]">
                  <div class="w-1/2 py-4 px-2 text-center font-serif text-lg md:text-[19px] font-medium border-r border-[#00a651]">{d.name}</div>
                  <div class="w-1/2 py-4 px-2 text-center font-serif text-lg md:text-[19px]">{d.count}</div>
                </div>
              {/each}
              
              <!-- Footer -->
              <div class="flex bg-[#00a651] text-white">
                <div class="w-1/2 py-4 px-2 text-center font-serif text-lg md:text-xl font-bold border-r border-white/50">Jumlah</div>
                <div class="w-1/2 py-4 px-2 text-center font-serif text-lg md:text-xl font-bold">{totalDusun.toLocaleString('id-ID')}</div>
              </div>

            </div>
          </div>
        </div>

      </div>
    {/if}
  </div>
</section>
