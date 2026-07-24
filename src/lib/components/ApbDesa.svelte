<script>
  let { apb = [] } = $props();

  // Ambil data tahun terbaru
  let latestApb = $derived(apb && apb.length > 0 ? apb[0] : null);
  let year = $derived(latestApb ? latestApb.year : new Date().getFullYear());

  let totalRevenues = $derived(
    latestApb && latestApb.data?.pelaksanaan 
      ? (latestApb.data.pelaksanaan.find(item => item.title.toLowerCase().includes('pendapatan'))?.anggaran || 0)
      : 0
  );

  let totalExpenses = $derived(
    latestApb && latestApb.data?.pelaksanaan 
      ? (latestApb.data.pelaksanaan.find(item => item.title.toLowerCase().includes('belanja'))?.anggaran || 0)
      : 0
  );

  let apbData = $derived([
    {
      label: 'Pendapatan Desa',
      value: 'Rp' + totalRevenues.toLocaleString('id-ID'),
    },
    {
      label: 'Belanja Desa',
      value: 'Rp' + totalExpenses.toLocaleString('id-ID'),
    }
  ]);
</script>

<section class="w-full bg-white py-12">
  <!-- Wrapper untuk membatasi lebar maksimal 1500px dan konsisten dengan komponen sebelumnya -->
  <div class="max-w-[1500px] mx-auto px-6">
    
    <!-- Kontainer Utama: Latar belakang hijau solid dengan rounded yang lebar -->
    <div class="bg-[#00a651] rounded-[2rem] p-6 md:p-12 text-white shadow-md relative overflow-hidden">
      
      <!-- Layout Responsif: Grid 1 kolom di HP, 2 kolom di Desktop -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
        
        <!-- Sisi Kiri: Ilustrasi Keuangan/Grafik (Mengambil 5 kolom grid) -->
        <div class="lg:col-span-5 flex justify-center">
          <!-- Simpan gambar ilustrasi keuangan di folder /static dengan nama finansial-ilustration.png -->
          <img 
            src="/icon-apbd.png" 
            alt="Ilustrasi Finansial APB Desa" 
            class="w-full max-w-[380px] h-auto object-contain"
          />
        </div>

        <!-- Sisi Kanan: Judul, Deskripsi, dan Angka Anggaran (Mengambil 7 kolom grid) -->
        <div class="lg:col-span-7 flex flex-col justify-center">
          <h2 class="text-3xl md:text-[40px] font-serif font-bold leading-tight mb-4">
            APB Desa {year}
          </h2>
          <p class="text-white/95 font-serif text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
            Ringkasan pendapatan dan belanja Anggaran Pendapatan dan Belanja Desa (APB Desa) tahun berjalan.
          </p>

          <!-- List Data Anggaran Keuangan -->
          <div class="flex flex-col gap-4 w-full">
            {#each apbData as item}
              <!-- Baris Data (Card Putih melengkung) -->
              <div class="bg-white rounded-full px-5 py-3 md:py-4 flex items-center justify-between text-black shadow-sm">
                
                <!-- Label & Ikon -->
                <div class="flex items-center gap-3">
                  <!-- Ikon Grafik Batang Bulat Hijau Tua -->
                  <div class="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#004723] flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white">
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 14.25c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v5.625c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-5.625z" />
                    </svg>
                  </div>
                  <span class="font-serif font-bold text-base md:text-xl text-gray-900 leading-tight">
                    {item.label}
                  </span>
                </div>

                <!-- Nilai Nominal Anggaran -->
                <div class="text-right">
                  <span class="font-serif font-bold text-lg md:text-2xl text-gray-900 tracking-wide">
                    {item.value}
                  </span>
                </div>

              </div>
            {/each}
          </div>
        </div>

      </div>

      <!-- Bagian Bawah: Tombol "Lihat Selengkapnya" Memanjang Transparan Outlined -->
      <div class="w-full">
        <a 
          href="/apb-desa" 
          class="block w-full text-center border-2 border-white hover:bg-white hover:text-[#00a651] text-white font-serif font-bold text-lg py-3 rounded-full transition-all duration-300"
        >
          Lihat Selengkapnya
        </a>
      </div>

    </div>
  </div>
</section>