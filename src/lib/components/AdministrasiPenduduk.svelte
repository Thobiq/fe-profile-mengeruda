<script>
  let { demographic = null } = $props();

  let totalPenduduk = $derived(demographic?.total_penduduk ?? '1.999');
  let totalKk = $derived(demographic?.total_kk ?? '999');
  let lakiLaki = $derived(demographic?.laki_laki ?? '1.999');
  let perempuan = $derived(demographic?.perempuan ?? '1.999');

  let statistik = $derived([
    {
      id: 'penduduk',
      label: 'Penduduk',
      value: totalPenduduk.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      icon: '<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /><path d="M12.5 16a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM14.47 16a4.5 4.5 0 01-1.97.46 4.5 4.5 0 01-1.97-.46A5.503 5.503 0 007 19.5a.5.5 0 001 0 4.5 4.5 0 119 0 .5.5 0 001 0 5.503 5.503 0 00-3.53-3.5z" />'
    },
    {
      id: 'laki-laki',
      label: 'Laki-laki',
      value: lakiLaki.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      icon: '<path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm2 5h-4c-1.1 0-2 .9-2 2v6h2v7h4v-7h2v-6c0-1.1-.9-2-2-2z"/>'
    },
    {
      id: 'kepala-keluarga',
      label: 'Kepala Keluarga',
      value: totalKk.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      icon: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>'
    },
    {
      id: 'perempuan',
      label: 'Perempuan',
      value: perempuan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      icon: '<path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 5h-8l-2 9h3v6h4v-6h3l-2-9z"/>'
    }
  ]);
</script>

<section class="w-full bg-white py-12">
  <div class="max-w-[1500px] mx-auto px-6">
    
    <!-- Kontainer Utama dengan background hijau muda dan border hijau gelap -->
    <div class="bg-[#eef8f1] border-2 border-[#00a651] rounded-[2rem] px-6 py-12 md:p-14 shadow-sm">
      
      <!-- Bagian Header (Judul dan Deskripsi) -->
      <div class="text-center mb-10">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#00a651] mb-4">
          Administrasi Penduduk
        </h2>
        <p class="text-gray-800 font-serif text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Data statistik jumlah penduduk, kepala keluarga, serta pembagian berdasarkan jenis kelamin.
        </p>
      </div>

      <!-- Bagian Grid Data Statistik (1 kolom di HP, 2 kolom di tablet/desktop) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {#each statistik as stat}
          
          <!-- Card Item -->
          <div class="flex h-[88px] rounded-xl overflow-hidden border border-[#00a651] bg-white">
            
            <!-- Sisi Kiri (Hijau): Ikon dan Angka -->
            <div class="w-1/2 bg-[#00a651] flex items-center justify-center gap-3 px-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                class="w-8 h-8 text-white shrink-0"
              >
                <!-- Render path SVG langsung dari variabel data -->
                {@html stat.icon}
              </svg>
              <span class="text-2xl md:text-[28px] font-serif font-bold text-white tracking-wide">
                {stat.value}
              </span>
            </div>

            <!-- Sisi Kanan (Putih): Label Teks -->
            <div class="w-1/2 flex items-center justify-center px-4">
              <span class="text-lg md:text-[20px] font-serif font-medium text-black text-center">
                {stat.label}
              </span>
            </div>
            
          </div>
          
        {/each}
      </div>
      
    </div>
  </div>
</section>