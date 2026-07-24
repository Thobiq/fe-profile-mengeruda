<script>
  let { galleries = [] } = $props();

  let formattedGalleries = $derived(
    galleries && galleries.length > 0
      ? galleries.map(g => ({
          img: g.image_path.startsWith('http') ? g.image_path : `/storage/${g.image_path.replace('/storage/', '')}`,
          title: g.title
        }))
      : [
          { img: '/hero-1.jpg', title: 'Pemandangan Bukit Savana Mengeruda' },
          { img: '/kunjungan-mahasiswa-sekolah.jpeg', title: 'Kunjungan Mahasiswa KKN ke SMPN 1 SATAP' },
          { img: '/acara-adat-resepsi.png', title: 'Acara Adat Resepsi' },
          { img: '/menjemur-padi.jpeg', title: 'Menjemur Padi' },
          { img: '/hero-2.png', title: 'Penyaluran BLT Tahap 3' },
          { img: '/berangkat-sekolah.jpeg', title: 'Semangat Pagi' },
          { img: '/sinergi-mahasiswa-kkn.jpeg', title: 'Sinergi Mahasiswa KKN dengan Sekolah' },
          { img: '/produk-tempe.png', title: 'Produk Keripik Tempe Lokal' },
          { img: '/wisata-air-panas.jpeg', title: 'Wisata Air Panas' },
          { img: '/karang-taruna.png', title: 'Karang Taruna' }
        ]
  );

  let galeriAtas = $derived(formattedGalleries.slice(0, Math.ceil(formattedGalleries.length / 2)));
  let galeriBawah = $derived(formattedGalleries.slice(Math.ceil(formattedGalleries.length / 2)));

  // Trik untuk infinite scroll yang mulus: 
  let barisAtasDuplikat = $derived([...galeriAtas, ...galeriAtas]);
  let barisBawahDuplikat = $derived([...galeriBawah, ...galeriBawah]);
</script>

<section class="w-full bg-white py-16 md:py-24 overflow-hidden">
  <div class="max-w-[1500px] mx-auto px-6 mb-12">
    
    <!-- Judul & Subjudul (Sesuai Desain image_0ba304.jpg) -->
    <div class="text-center">
      <h2 class="text-4xl md:text-[44px] font-serif font-bold text-[#007b3e] mb-4">
        Galeri Desa
      </h2>
      <p class="text-gray-800 font-serif text-[17px] md:text-lg max-w-3xl mx-auto leading-relaxed">
        Kumpulan momen dan keindahan pesona Desa Mengeruda yang diabadikan melalui lensa kamera.
      </p>
    </div>

  </div>

  <!-- Container Galeri -->
  <div class="flex flex-col gap-4 md:gap-6 w-full">
    
    <!-- BARIS 1: Bergerak ke Kiri -->
    <!-- hover-pause akan menghentikan animasi track saat mouse masuk -->
    <div class="w-full overflow-hidden">
      <div class="track animate-scroll-left hover-pause gap-4 md:gap-6">
        {#each barisAtasDuplikat as item}
          
          <!-- Kartu Foto -->
          <div class="relative group w-[280px] md:w-[400px] h-[200px] md:h-[260px] shrink-0 overflow-hidden cursor-pointer rounded-sm shadow-sm">
            <!-- Gambar dengan efek zoom tipis saat di-hover -->
            <img src={item.img} alt={item.title} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            
            <!-- Overlay Gradasi Hitam (Muncul saat hover) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              
              <!-- Teks Judul (Slide up dari bawah) -->
              <!-- translate-y-8 menyembunyikan teks agak ke bawah, lalu naik ke translate-y-0 -->
              <h3 class="text-white font-serif font-bold text-lg md:text-xl translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out drop-shadow-md">
                {item.title}
              </h3>
              
            </div>
          </div>

        {/each}
      </div>
    </div>

    <!-- BARIS 2: Bergerak ke Kanan -->
    <div class="w-full overflow-hidden">
      <div class="track animate-scroll-right hover-pause gap-4 md:gap-6">
        {#each barisBawahDuplikat as item}
          
          <div class="relative group w-[280px] md:w-[400px] h-[200px] md:h-[260px] shrink-0 overflow-hidden cursor-pointer rounded-sm shadow-sm">
            <img src={item.img} alt={item.title} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 class="text-white font-serif font-bold text-lg md:text-xl translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out drop-shadow-md">
                {item.title}
              </h3>
            </div>
          </div>

        {/each}
      </div>
    </div>

  </div>
</section>

<style>
  /* Menyiapkan track agar fleksibel dan menyesuaikan lebar total konten */
  .track {
    display: flex;
    width: max-content;
  }

  /* Menghentikan animasi saat baris di-hover */
  .hover-pause:hover {
    animation-play-state: paused;
  }

  /* Animasi Bergerak ke Kiri (Baris 1) */
  .animate-scroll-left {
    /* Angka 40s adalah kecepatan. Semakin besar angka, semakin lambat bergeraknya */
    animation: scrollLeft 40s linear infinite;
  }

  /* Animasi Bergerak ke Kanan (Baris 2) */
  .animate-scroll-right {
    animation: scrollRight 40s linear infinite;
  }

  /* Keyframes Kiri: Mulai dari titik 0, bergeser hingga setengah dari lebar total (-50%) */
  @keyframes scrollLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* Keyframes Kanan: Mulai dari -50%, bergeser maju ke titik 0 */
  @keyframes scrollRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
</style>