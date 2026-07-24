<script>
    import { onMount } from 'svelte';
    import { OrgChart } from 'd3-org-chart';

    let { data } = $props();
    
    let chartContainer = $state(null);
    let chart = null;

    onMount(() => {
        if (!data.perangkat || data.perangkat.length === 0) return;

        // Transform data untuk menyesuaikan dengan kebutuhan d3-org-chart
        // d3-org-chart mengharuskan adanya properti `id` (string/number) dan `parentId` (bukan parent_id)
        // Root node harus memiliki parentId = null atau ""
        const chartData = data.perangkat.map(p => ({
            id: p.id.toString(),
            parentId: p.parent_id ? p.parent_id.toString() : "",
            name: p.nama,
            positionName: p.jabatan,
            imageUrl: p.foto ? `http://localhost:8000/storage/${p.foto}` : '/user-placeholder.png'
        }));

        if (chartContainer) {
            chart = new OrgChart()
                .container(chartContainer)
                .data(chartData)
                .nodeWidth((d) => 250)
                .initialZoom(0.7)
                .nodeHeight((d) => 120)
                .childrenMargin((d) => 40)
                .compactMarginBetween((d) => 15)
                .compactMarginPair((d) => 80)
                .nodeContent(function(d, i, arr, state) {
                    const color = '#00a651'; // Warna tema hijau
                    return `
                        <div style="font-family: 'Inter', sans-serif; background-color: white; position: absolute; margin-top: -1px; margin-left: -1px; width: ${d.width}px; height: ${d.height}px; border-radius: 12px; border: 1px solid #E4E4E7; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                            <div style="background-color: ${color}; height: 8px; width: 100%; border-top-left-radius: 12px; border-top-right-radius: 12px;"></div>
                            <div style="padding: 16px; display: flex; align-items: center; gap: 16px;">
                                <img src="${d.data.imageUrl}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid ${color};" />
                                <div>
                                    <div style="font-size: 16px; font-weight: bold; color: #18181B; margin-bottom: 4px;">${d.data.name}</div>
                                    <div style="font-size: 12px; font-weight: 600; color: ${color}; background-color: #F0FDF4; padding: 4px 8px; border-radius: 9999px; display: inline-block;">${d.data.positionName}</div>
                                </div>
                            </div>
                        </div>
                    `;
                })
                .render();
                
            chart.expandAll();
            // Posisikan bagan di tengah
            setTimeout(() => {
                 chart.fit();
            }, 200);
        }

        return () => {
            // Cleanup jika diperlukan (sayangnya d3-org-chart tidak punya destroy() bawaan)
            if (chartContainer) {
                chartContainer.innerHTML = '';
            }
        };
    });
</script>

<svelte:head>
    <title>Struktur Organisasi - Desa Mengeruda</title>
    <!-- Import font inter untuk d3 chart -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<section class="min-h-screen bg-gray-50 py-16">
    <div class="max-w-[1500px] mx-auto px-6">
        <!-- Header -->
        <div class="mb-10">
            <a href="/" class="inline-flex items-center text-[#00a651] font-semibold hover:underline mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Kembali ke Beranda
            </a>
            
            <h1 class="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Struktur Organisasi Pemerintah Desa Mengeruda
            </h1>
            <p class="text-gray-600 font-serif text-lg max-w-3xl">
                Visualisasi interaktif bagan hierarki tata kerja pemerintah desa. Anda dapat menggeser (pan) dan memperbesar (zoom) bagian pada struktur ini.
            </p>
        </div>

        <!-- D3 Org Chart Container -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 h-[75vh] w-full relative overflow-hidden">
            {#if data.error}
                <div class="absolute inset-0 flex items-center justify-center text-red-500 font-medium">
                    Gagal memuat data: {data.error}
                </div>
            {:else if !data.perangkat || data.perangkat.length === 0}
                <div class="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mb-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <p class="text-lg font-medium">Belum ada data struktur organisasi desa.</p>
                </div>
            {/if}
            
            <!-- Elemen DOM di mana D3 Org Chart akan di-mount -->
            <div bind:this={chartContainer} class="w-full h-full bg-slate-50 rounded-xl cursor-grab active:cursor-grabbing"></div>
            
            <!-- Controls Overlay (Zoom In/Out) -->
            {#if data.perangkat && data.perangkat.length > 0}
            <div class="absolute bottom-8 right-8 flex flex-col gap-2">
                <button 
                    class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#00a651] transition-colors"
                    onclick={() => chart && chart.zoomIn()}
                    title="Zoom In"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </button>
                <button 
                    class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#00a651] transition-colors"
                    onclick={() => chart && chart.zoomOut()}
                    title="Zoom Out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" /></svg>
                </button>
                <button 
                    class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-[#00a651] transition-colors"
                    onclick={() => chart && chart.fit()}
                    title="Fit to Screen"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                </button>
            </div>
            {/if}
        </div>
    </div>
</section>
