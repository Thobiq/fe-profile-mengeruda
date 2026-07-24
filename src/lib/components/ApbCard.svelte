<script>
  let { title, anggaran = 0, realisasi = 0 } = $props();

  let percent = $derived(anggaran > 0 ? Math.round((realisasi / anggaran) * 100) : 0);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };
</script>

<div class="border border-[#00a651] rounded-2xl overflow-hidden shadow-sm bg-white">
  <!-- Header -->
  <div class="bg-[#00a651] text-white text-center py-3 font-bold font-serif text-[17px]">
    {title}
  </div>
  
  <!-- Content -->
  <div class="p-5 flex items-center justify-between gap-2">
    <div class="flex flex-col gap-3">
      <div>
        <div class="text-[#00a651] font-bold text-sm font-serif">Anggaran</div>
        <div class="text-gray-700 font-semibold text-[15px]">{formatCurrency(anggaran)}</div>
      </div>
      <div>
        <div class="text-[#00a651] font-bold text-sm font-serif">Realisasi</div>
        <div class="text-gray-700 font-semibold text-[15px]">{formatCurrency(realisasi)}</div>
      </div>
    </div>
    
    <!-- Circular Progress -->
    <div class="relative w-[75px] h-[75px] shrink-0">
      <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <!-- Background circle -->
        <path
          class="text-gray-200"
          stroke-width="4"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <!-- Progress circle -->
        <path
          class="text-[#00a651]"
          stroke-width="4"
          stroke-dasharray="{percent}, 100"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-[#00a651] font-bold text-[15px]">{percent}%</span>
      </div>
    </div>
  </div>
</div>
