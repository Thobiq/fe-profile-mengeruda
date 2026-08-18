<script>
  let { news = [] } = $props();

  let baseBerita = $derived(
    news && news.length > 0 
      ? news.slice(0, 4).map(b => ({
          title: b.judul || b.title || 'Tanpa Judul',
          date: b.created_at ? new Date(b.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '',
          excerpt: (b.content || '').replace(/<[^>]*>?/gm, '').substring(0, 100) + '...',
          img: b.banner_url || (b.banner ? (b.banner.startsWith('http') ? b.banner : `/storage/${b.banner.replace('/storage/', '')}`) : null) || b.image_url || '/hero-2.png',
          slug: b.slug || (b.id ? b.id.toString() : '')
        }))
      : [
          {
            title: 'Koordinasi Pemerintah Desa dengan Mahasiswa KKN',
            date: '13/07/2026',
            excerpt: 'Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing aute.',
            img: '/hero-2.png',
            slug: 'koordinasi-pemerintah-desa-kkn-1'
          },
          {
            title: 'Koordinasi Pemerintah Desa dengan Mahasiswa KKN',
            date: '13/07/2026',
            excerpt: 'Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing aute.',
            img: '/hero-2.png',
            slug: 'koordinasi-pemerintah-desa-kkn-2'
          },
          {
            title: 'Koordinasi Pemerintah Desa dengan Mahasiswa KKN',
            date: '13/07/2026',
            excerpt: 'Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing aute.',
            img: '/hero-1.jpg',
            slug: 'koordinasi-pemerintah-desa-kkn-3'
          },
          {
            title: 'Koordinasi Pemerintah Desa dengan Mahasiswa KKN',
            date: '13/07/2026',
            excerpt: 'Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing aute.',
            img: '/hero-1.jpg',
            slug: 'koordinasi-pemerintah-desa-kkn-4'
          }
        ]
  );

  // Duplikasi array untuk efek infinite marquee
  let daftarBerita = $derived([...baseBerita, ...baseBerita, ...baseBerita]);

  // Variabel untuk mengikat elemen DOM container slider
  let scrollContainer = $state(null);
  let isHovered = $state(false);

  // Efek berjalan di sisi client untuk mengatur auto-scroll per kartu
  $effect(() => {
    const interval = setInterval(() => {
      if (scrollContainer && !isHovered) {
        const singleSetWidth = scrollContainer.scrollWidth / 3;
        
        // Jika posisi sudah mencapai ujung set pertama
        if (scrollContainer.scrollLeft >= singleSetWidth) {
          // Reset seketika ke awal tanpa animasi (behavior: 'auto')
          scrollContainer.scrollTo({ left: 0, behavior: 'auto' });
          
          // Setelah reset, gulir ke kartu berikutnya dengan animasi
          setTimeout(() => {
            if (scrollContainer) scrollContainer.scrollBy({ left: 380, behavior: 'smooth' });
          }, 50);
        } else {
          // Gulir normal per kartu
          scrollContainer.scrollBy({ left: 380, behavior: 'smooth' });
        }
      }
    }, 4000);

    // Bersihkan interval saat komponen dilepas untuk mencegah memory leak
    return () => clearInterval(interval);
  });
</script>

<section class="w-full bg-white py-16">
  <div class="max-w-[1500px] mx-auto px-6">
    
    <!-- Bagian Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-serif font-bold text-[#008f45] mb-4">
        Berita Desa
      </h2>
      <p class="text-gray-800 font-serif text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
        Kumpulan informasi, berita terbaru, dan pengumuman terkait kegiatan di Desa Mengeruda.
      </p>
    </div>

    <!-- Container Slider Berita -->
    <div 
      bind:this={scrollContainer}
      class="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-10 pt-4 px-2
             [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      onmouseenter={() => isHovered = true}
      onmouseleave={() => isHovered = false}
    >
      {#each daftarBerita as berita}
        <!-- 
          Kartu Berita dengan Animasi Hover 
          (hover:-translate-y-2 membuat kartu naik sedikit saat di-hover)
        -->
        <a 
          href={`/berita/${berita.slug}`} 
          class="snap-center shrink-0 w-[320px] md:w-[380px] bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
        >
          
          <!-- Thumbnail Gambar -->
          <div class="w-full h-[220px] overflow-hidden">
            <img 
              src={berita.img} 
              alt={berita.title} 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          
          <!-- Konten Teks Kartu -->
          <div class="p-6 flex flex-col flex-grow">
            
            <!-- Badge Tanggal -->
            <div class="mb-4">
              <span class="inline-flex items-center gap-1.5 bg-[#00a651] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                <!-- Ikon Kalender Mini -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                  <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
                </svg>
                {berita.date}
              </span>
            </div>

            <!-- Judul Berita -->
            <h3 class="text-[#005c2d] font-serif font-bold text-xl leading-snug mb-3 group-hover:text-[#00a651] transition-colors">
              {berita.title}
            </h3>
            
            <!-- Cuplikan / Excerpt -->
            <p class="text-gray-600 font-serif text-[15px] leading-relaxed line-clamp-3">
              {berita.excerpt}
            </p>
            
          </div>
        </a>
      {/each}
    </div>

    <!-- Tombol 'Lihat Berita Lengkap' dengan Garis Pemisah -->
    <div class="mt-4 flex items-center justify-center gap-4 max-w-5xl mx-auto">
      <div class="h-[3px] bg-[#005c2d] flex-grow rounded-full"></div>
      
      <a 
        href="/berita" 
        class="bg-[#005c2d] hover:bg-[#004723] text-white font-serif font-bold text-lg px-8 py-3 rounded-full transition-colors duration-300 shadow-md whitespace-nowrap"
      >
        Lihat Berita Lengkap
      </a>
      
      <div class="h-[3px] bg-[#005c2d] flex-grow rounded-full"></div>
    </div>
    
  </div>
</section>