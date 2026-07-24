<script>
  let { struktur = [] } = $props();

  let aparat = $derived(
    struktur && struktur.length > 0
      ? struktur.map(s => ({
          name: s.nama,
          role: s.jabatan,
          img: s.foto ? (s.foto.startsWith('http') ? s.foto : `/storage/${s.foto.replace('/storage/', '')}`) : '/user-placeholder.png'
        }))
      : [
          { name: 'Nama Aparat Desa', role: 'Jabatan', img: '/user-placeholder.png' },
          { name: 'Nama Aparat Desa', role: 'Jabatan', img: '/user-placeholder.png' },
          { name: 'Nama Aparat Desa', role: 'Jabatan', img: '/user-placeholder.png' },
          { name: 'Nama Aparat Desa', role: 'Jabatan', img: '/user-placeholder.png' },
          { name: 'Nama Aparat Desa', role: 'Jabatan', img: '/user-placeholder.png' }
        ]
  );

  // Variabel untuk mengikat elemen DOM container slider
  let scrollContainer = $state(null);

  // Efek berjalan di sisi client untuk mengatur auto-scroll
  $effect(() => {
    const interval = setInterval(() => {
      if (scrollContainer) {
        // Lebar scroll maksimum dikurangi lebar container saat ini
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        // Jika sudah mentok di kanan (dengan toleransi 10px), kembali ke awal
        if (scrollContainer.scrollLeft >= maxScroll - 10) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll ke kanan sejauh 300px (kurang lebih selebar 1 kartu)
          scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 3000);

    // Bersihkan interval saat komponen dilepas untuk mencegah memory leak
    return () => clearInterval(interval);
  });
</script>

<section class="w-full bg-white py-16">
  <div class="max-w-[1500px] mx-auto px-6">
    
    <!-- Bagian Header (Judul dan Deskripsi) -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#008f45] mb-4">
        Struktur Organisasi & Tata Kerja
      </h2>
      <p class="text-gray-800 font-serif text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
        Pemerintahan Desa Mengeruda didukung oleh aparatur yang berdedikasi tinggi untuk melayani masyarakat.
      </p>
    </div>

    <!-- Container Slider -->
    <!-- Class khusus tailwind untuk menyembunyikan scrollbar tapi tetap bisa di-scroll -->
    <div 
      bind:this={scrollContainer}
      class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 
             [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {#each aparat as person}
        <!-- Kartu Profil -->
        <div class="snap-center shrink-0 w-[260px] md:w-[280px] bg-white rounded-2xl overflow-hidden shadow-md flex flex-col border border-gray-100">
          
          <!-- Foto Profil (Pastikan gambar transparan/PNG agar menyatu dengan background putih) -->
          <div class="h-[280px] w-full flex items-end justify-center pt-6 bg-white">
            <img src={person.img} alt={person.name} class="object-cover h-full drop-shadow-md" />
          </div>
          
          <!-- Informasi Profil dengan Gradasi Hijau -->
          <div class="bg-gradient-to-b from-[#00a651] to-[#005c2d] p-5 text-center flex-grow flex flex-col justify-between rounded-t-lg">
            <h3 class="text-white font-serif font-semibold text-lg md:text-xl leading-tight mb-4">
              {person.name}
            </h3>
            <div class="mt-auto">
              <!-- Badge Jabatan -->
              <span class="inline-block bg-white text-[#008f45] font-bold text-sm px-5 py-1.5 rounded-full shadow-sm">
                {person.role}
              </span>
            </div>
          </div>
          
        </div>
      {/each}
    </div>

    <!-- Tombol 'Lihat Struktur Lengkap' dengan Garis Pemisah (Divider) -->
    <div class="mt-14 flex items-center justify-center gap-4 max-w-5xl mx-auto">
      <!-- Garis Kiri -->
      <div class="h-[3px] bg-[#005c2d] flex-grow rounded-full"></div>
      
      <!-- Tombol -->
      <a 
        href="/struktur-organisasi" 
        class="bg-[#005c2d] hover:bg-[#004723] text-white font-serif font-bold text-lg px-8 py-3 rounded-full transition-colors duration-300 shadow-md whitespace-nowrap"
      >
        Lihat Struktur Lengkap
      </a>
      
      <!-- Garis Kanan -->
      <div class="h-[3px] bg-[#005c2d] flex-grow rounded-full"></div>
    </div>
    
  </div>
</section>