<script>
  import { onMount } from 'svelte';
  import { OrgChart } from 'd3-org-chart';

  let { struktur = [] } = $props();

  let perangkatList = $derived(struktur || []);
  let chartContainer = $state(null);
  let chart = null;

  $effect(() => {
    if (perangkatList.length > 0 && chartContainer) {
      renderChart();
      
      // Mencegah zoom scroll secara tidak sengaja kecuali menekan tombol Ctrl
      chartContainer.addEventListener('wheel', (e) => {
        if (!e.ctrlKey) {
          // Hentikan event agar tidak ditangkap oleh d3-zoom, sehingga halaman bisa di-scroll
          e.stopImmediatePropagation();
        }
      }, { capture: true });
    }
  });

  const renderChart = () => {
    if (!chartContainer || perangkatList.length === 0) return;

    const chartData = perangkatList.map(p => ({
        id: p.id.toString(),
        parentId: p.parent_id ? p.parent_id.toString() : "",
        name: p.nama,
        positionName: p.jabatan,
        imageUrl: p.foto ? (p.foto.startsWith('http') ? p.foto : `/storage/${p.foto}`) : '/user-placeholder.png'
    }));

    if (!chart) {
      chart = new OrgChart().container(chartContainer);
    }

    chart
      .data(chartData)
      .nodeWidth((d) => 260)
      .initialZoom(0.7)
      .nodeHeight((d) => 130)
      .childrenMargin((d) => 40)
      .compactMarginBetween((d) => 15)
      .compactMarginPair((d) => 80)
      .nodeContent(function(d) {
          const color = '#00a651'; 
          return `
              <div style="font-family: 'Inter', sans-serif; background-color: white; position: absolute; margin-top: -1px; margin-left: -1px; width: ${d.width}px; height: ${d.height}px; border-radius: 12px; border: 1px solid #E4E4E7; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column;">
                  <div style="background-color: ${color}; height: 8px; width: 100%; border-top-left-radius: 12px; border-top-right-radius: 12px; flex-shrink: 0;"></div>
                  <div style="padding: 20px; flex-grow: 1; display: flex; align-items: center; gap: 16px;">
                      <img src="${d.data.imageUrl}" style="width: 65px; height: 65px; border-radius: 50%; object-fit: cover; border: 2px solid ${color};" />
                      <div>
                          <div style="font-size: 16px; font-weight: bold; color: #18181B; margin-bottom: 6px;">${d.data.name}</div>
                          <div style="font-size: 12px; font-weight: 600; color: ${color}; background-color: #F0FDF4; padding: 4px 8px; border-radius: 9999px; display: inline-block;">${d.data.positionName}</div>
                      </div>
                  </div>
              </div>
          `;
      })
      .render();
      
    chart.expandAll();
    setTimeout(() => chart.fit(), 200);
  };
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<section class="w-full py-10">
  <div class="max-w-[1300px] mx-auto px-4">
    
    <div class="text-center mb-8">
      <h2 class="text-3xl font-serif font-bold text-[#006e33] mb-2">Struktur Organisasi</h2>
      <p class="text-gray-600 font-medium">Struktur Organisasi Pemerintah Desa Mengeruda</p>
    </div>

    <div class="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm flex flex-col relative w-full h-[600px]">
      {#if perangkatList.length === 0}
        <div class="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mb-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <p class="text-lg font-medium font-serif">Belum ada data struktur organisasi.</p>
        </div>
      {/if}

      <!-- Chart Container -->
      <div bind:this={chartContainer} class="w-full h-full bg-[#f8f9fa] cursor-grab active:cursor-grabbing"></div>

      <!-- Controls Zoom -->
      {#if perangkatList.length > 0}
      <div class="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
          <button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-[#00a651]" onclick={() => chart && chart.zoomIn()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          </button>
          <button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-[#00a651]" onclick={() => chart && chart.zoomOut()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" /></svg>
          </button>
          <button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-[#00a651]" onclick={() => chart && chart.fit()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
          </button>
      </div>
      {/if}
    </div>
    
  </div>
</section>