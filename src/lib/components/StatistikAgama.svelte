<script>
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  let { data } = $props();

  let ready = $state(false);
  onMount(() => {
    ready = true;
  });

  // Helper function untuk format angka (contoh: 1999 -> "1.999")
  const formatNum = (num) => {
    return Number(num).toLocaleString('id-ID');
  };

  let totalAgama = $derived(
    (data?.agama_data || []).reduce((acc, curr) => acc + (curr.count || 0), 0)
  );

  const getIcon = (name) => {
    if (!name) return '<circle cx="12" cy="12" r="6"/>';
    const n = name.toLowerCase();
    if (n.includes('islam')) return '<path fill-rule="evenodd" d="M12 2.25c-1.2 0-2.25.96-2.5 2.13L9 5H7.5c-1.24 0-2.25 1.01-2.25 2.25v2.5a3.75 3.75 0 0 0 1.94 3.28V20.25c0 .41.34.75.75.75h8.12c.41 0 .75-.34.75-.75v-7.22a3.75 3.75 0 0 0 1.94-3.28V7.25c0-1.24-1.01-2.25-2.25-2.25H15l-.5-.62c-.25-1.17-1.3-2.13-2.5-2.13zM6.75 7.25c0-.41.34-.75.75-.75h9c.41 0 .75.34.75.75v2.5a2.25 2.25 0 0 1-2.25 2.25h-4.5a2.25 2.25 0 0 1-2.25-2.25v-2.5zm4.5 11v-4.5h1.5v4.5h-1.5z" clip-rule="evenodd" />';
    if (n.includes('kristen')) return '<path d="M13 3a1 1 0 0 0-2 0v5H7a1 1 0 0 0 0 2h4v11a1 1 0 0 0 2 0V10h4a1 1 0 0 0 0-2h-4V3z"/>';
    if (n.includes('katolik')) return '<path d="M6 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H6zm6 3v2h2v2h-2v4h-2V9H8V7h2V5h2zM6 20V4h12v16H6z"/>';
    if (n.includes('hindu')) return '<path d="M12 2 1 12h3v9h16v-9h3L12 2zm0 2.83 6.17 5.67H5.83L12 4.83zM6 19v-6h12v6H6zm3-4h6v2H9v-2z"/>';
    if (n.includes('budha') || n.includes('buddha')) return '<path d="M12 2c0 4.42-3.58 8-8 8 2.21 0 4 1.79 4 4s-1.79 4-4 4c4.42 0 8-3.58 8-8 0-4.42-3.58-8-8-8zm0 0c0 4.42 3.58 8 8 8-2.21 0-4 1.79-4 4s1.79 4 4 4c-4.42 0-8-3.58-8-8 0-4.42 3.58-8 8-8z"/><circle cx="12" cy="18" r="2"/>';
    if (n.includes('konghucu')) return '<path fill-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4 1.79 4 4-1.79 4-4 4c-4.42 0-8-3.58-8-8 0-4.42 3.58-8 8-8zM12 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm0 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" clip-rule="evenodd"/>';
    return '<circle cx="12" cy="12" r="6"/>';
  };

  let agamaData = $derived(
    (data?.agama_data || []).map(a => ({
      name: a.name,
      count: formatNum(a.count),
      icon: getIcon(a.name)
    }))
  );
</script>

<section class="w-full py-16 bg-white overflow-hidden">
  <div class="max-w-[1200px] mx-auto px-6">
    
    {#if ready}
      <div in:fade={{ duration: 800 }} class="text-center mb-12">
        <h2 class="text-3xl md:text-[42px] font-serif font-bold text-[#008f45] mb-3 tracking-wide">
          Berdasarkan Agama
        </h2>
        <p class="text-gray-800 font-serif text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          informasi lengkap mengenai karakteristik demografi penduduk<br/>Desa Mengeruda
        </p>
      </div>

      <!-- Grid layout for the cards -->
      <div class="flex flex-wrap justify-center gap-5 md:gap-6 max-w-[1050px] mx-auto">
        {#each agamaData as agama, i}
          <div 
            in:fly={{ y: 50, duration: 600, delay: i * 100 }} 
            class="group flex w-[210px] md:w-[240px] h-[80px] md:h-[90px] bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-default overflow-hidden"
          >
            <!-- Left side (Green Icon Box) -->
            <div class="w-[35%] bg-[#00a651] flex items-center justify-center group-hover:bg-[#008f45] transition-colors duration-300">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                class="w-8 h-8 md:w-10 md:h-10 text-white group-hover:scale-110 transition-transform duration-300"
              >
                {@html agama.icon}
              </svg>
            </div>
            
            <!-- Right side (Text and Number) -->
            <div class="w-[65%] flex flex-col justify-center px-4 md:px-5">
              <span class="font-serif font-bold text-gray-700 text-[17px] md:text-[19px] leading-tight mb-0.5 group-hover:text-[#008f45] transition-colors duration-300">
                {agama.name}
              </span>
              <span class="font-serif font-semibold text-[#00a651] text-[16px] md:text-[18px]">
                {agama.count}
              </span>
            </div>
          </div>
        {/each}
      </div>
    {/if}
    
  </div>
</section>
