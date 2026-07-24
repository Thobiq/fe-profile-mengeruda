<script>
  // Menerima data dari parent page
  let { data } = $props();

  // Helper function untuk format angka (contoh: 1999 -> "1.999")
  const formatNum = (num) => {
    return Number(num).toLocaleString('id-ID');
  };

  // Data statistik demografi dinamis
  let statistikPenduduk = $derived([
    {
      label: 'Penduduk',
      value: data ? formatNum(data.total_penduduk) : '0',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" /></svg>`
    },
    {
      label: 'Kepala Keluarga',
      value: data ? formatNum(data.total_kk) : '0',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" /></svg>`
    },
    {
      label: 'Laki-laki',
      value: data ? formatNum(data.laki_laki) : '0',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><path d="M12 2.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM10.5 7.5h3A2.25 2.25 0 0 1 15.75 9.75v5.25h-1.5v6.75a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-6.75h-1.5v-5.25A2.25 2.25 0 0 1 10.5 7.5Z" /></svg>`
    },
    {
      label: 'Perempuan',
      value: data ? formatNum(data.perempuan) : '0',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8"><path d="M12 2.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM14.12 7.747a.75.75 0 0 1 .637.842l-1.077 7.161h1.57a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-.75.75h-6.5a.75.75 0 0 1-.75-.75v-5.25a.75.75 0 0 1 .75-.75h1.57l-1.077-7.16a.75.75 0 0 1 .637-.843L12 7.5l2.12.247Z" /></svg>`
    }
  ]);
</script>

<section class="w-full py-12">
  <div class="max-w-[1500px] mx-auto px-6">
    <div class="bg-[#ebf5ec] border-[2px] border-[#00a651] rounded-[2rem] p-8 md:p-12 shadow-sm">
      
      <div class="text-center mb-10">
        <!-- Warna judul disesuaikan agar sedikit lebih hijau gelap sesuai desain -->
        <h2 class="text-2xl md:text-[34px] font-serif font-bold text-[#008f45] mb-3 tracking-wide">
          Jumlah Penduduk & Kepala Keluarga
        </h2>
        <p class="text-gray-800 font-serif text-[15px] md:text-base max-w-3xl mx-auto leading-relaxed">
          Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing aute.
        </p>
      </div>

      <!-- max-w-[1000px] membuat susunan kartunya lebih lebar -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 max-w-[1000px] mx-auto">
        {#each statistikPenduduk as item}
          <!-- border diubah menjadi 1px agar lebih ramping -->
          <div class="flex flex-row rounded-xl border border-[#00a651] overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            
            <!-- Sisi Kiri Hijau (40%) -->
            <div class="w-[40%] bg-[#00a651] flex items-center justify-center py-4 px-3 gap-3 text-white">
              <span class="shrink-0 drop-shadow-sm flex items-center justify-center">
                {@html item.icon}
              </span>
              <span class="font-serif font-bold text-[28px] md:text-[32px] tracking-wide drop-shadow-sm mt-1">
                {item.value}
              </span>
            </div>
            
            <!-- Sisi Kanan Putih (60%) dengan justify-center untuk meratakan teks ke tengah -->
            <div class="w-[60%] bg-white flex items-center justify-center px-4">
              <span class="font-serif font-medium text-[18px] md:text-[20px] text-black leading-tight text-center">
                {item.label}
              </span>
            </div>

          </div>
        {/each}
      </div>

    </div>
  </div>
</section>