<script>
  let { title, anggaran = 0, realisasi = 0, subBidangList = [] } = $props();

  let percent = $derived(anggaran > 0 ? Math.round((realisasi / anggaran) * 100) : 0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };
</script>

<div class="border border-[#00a651] rounded-[2rem] overflow-hidden bg-white shadow-sm flex flex-col h-full">
  
  <!-- Header Hijau -->
  <div class="bg-[#00a651] p-6 text-white">
    <h3 class="text-center font-serif font-bold text-xl md:text-[22px] mb-6 leading-snug min-h-[60px] flex items-center justify-center">
      {title}
    </h3>
    
    <!-- Kotak Putih Anggaran & Realisasi -->
    <div class="flex flex-row gap-4 mb-4">
      <div class="bg-white rounded-lg p-3 flex-1 flex flex-col">
        <div class="font-serif text-[13px] font-bold text-gray-800 mb-0.5">Anggaran</div>
        <div class="font-semibold text-gray-500 text-[14px] leading-tight">{formatCurrency(anggaran)}</div>
      </div>
      <div class="bg-white rounded-lg p-3 flex-1 flex flex-col">
        <div class="font-serif text-[13px] font-bold text-gray-800 mb-0.5">Realisasi</div>
        <div class="font-semibold text-gray-500 text-[14px] leading-tight">{formatCurrency(realisasi)}</div>
      </div>
    </div>
    
    <!-- Progress Bar Horizontal -->
    <div class="flex items-center gap-3">
      <div class="flex-grow bg-white/30 rounded-full h-3.5 overflow-hidden">
        <div class="bg-white h-full rounded-full transition-all duration-1000 ease-out" style="width: {percent}%"></div>
      </div>
      <div class="font-bold text-[15px] shrink-0">{percent}%</div>
    </div>
  </div>

  <!-- List Sub Bidang -->
  <div class="p-6 md:p-8 flex-grow">
    {#each subBidangList as sub}
      <div class="mb-8 last:mb-0">
        <!-- Judul Sub Bidang -->
        <h4 class="font-serif font-bold text-[#00a651] text-lg leading-snug mb-4">
          {sub.judul}
        </h4>
        
        <!-- Daftar Kegiatan -->
        <ul class="list-disc pl-5 space-y-5 marker:text-gray-500">
          {#each sub.kegiatan as keg}
            <li>
              <div class="text-gray-800 font-serif leading-relaxed text-[15px]">
                {keg.nama}
              </div>
              <div class="font-bold font-serif text-[#00a651] text-xl mt-1.5 tracking-tight">
                {formatCurrency(keg.anggaran)}
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>
