<script>
  import { onMount } from 'svelte';

  // State untuk menyimpan data berita dari backend (maksimal 5 terbaru)
  let beritaTerbaru = $state([]);
  let isLoading = $state(true);

  // Ambil data dari backend saat komponen dimuat
  onMount(async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/news');
      const json = await res.json();
      if (res.ok && json.success) {
        // Ambil 5 berita pertama, lalu format
        beritaTerbaru = json.data.slice(0, 5).map(item => ({
          title: item.judul,
          img: item.banner_url || '/hero-1.jpg', // Gunakan banner dari API, atau placeholder
          slug: item.slug
        }));
      }
    } catch (err) {
      console.error("Gagal mengambil data berita untuk hero slider:", err);
    } finally {
      isLoading = false;
    }
  });

  // State untuk melacak indeks slide yang sedang aktif
  let currentIndex = $state(0);

  // Efek auto-slide menggunakan Svelte 5
  $effect(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % beritaTerbaru.length;
    }, 5000); // Berganti setiap 5 detik

    return () => clearInterval(interval);
  });
</script>

<section class="w-full bg-white pt-12 pb-8 md:pt-16">
  <div class="max-w-[1500px] mx-auto px-6">
    
    <!-- Bagian Header -->
    <div class="text-center mb-10">
      <h1 class="text-3xl md:text-[44px] font-serif font-bold text-black mb-4">
        Berita Desa Mengeruda
      </h1>
      <p class="text-gray-800 font-serif text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
        Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex 
        deserunt reprehenderit ad anim do adipiscing aute.
      </p>
    </div>

    <!-- Container Slider -->
    <div class="relative w-full h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-xl bg-gray-100">
      
      {#each beritaTerbaru as berita, index}
        <div 
          class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style="opacity: {index === currentIndex ? 1 : 0}; pointer-events: {index === currentIndex ? 'auto' : 'none'};"
        >
          <!-- Gambar Background -->
          <!-- Menambahkan object-cover agar gambar selalu penuh dan proporsional -->
          <img 
            src={berita.img} 
            alt={berita.title} 
            class="absolute inset-0 w-full h-full object-cover"
          />

          <!-- Overlay Gradasi Hitam dari Bawah -->
          <!-- from-black/90 (bawah sangat gelap) menuju transparent (atas transparan) -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 md:via-black/20 to-transparent"></div>

          <!-- Konten Teks dan Tombol di Kiri Bawah -->
          <div class="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col items-start justify-end h-full">
            <h2 class="text-white font-serif font-bold text-2xl md:text-[38px] leading-tight md:leading-snug max-w-4xl mb-6 drop-shadow-md">
              {berita.title}
            </h2>
            
            <a 
              href={`/berita/${berita.slug}`} 
              class="bg-[#00a651] hover:bg-[#008f45] text-white font-serif font-medium text-base md:text-lg px-8 py-3 rounded-full transition-colors duration-300 shadow-md"
            >
              Baca Selengkapnya
            </a>
          </div>
        </div>
      {/each}

      <!-- Indikator Dots (Opsional untuk memberitahu user ada 5 berita) -->
      <div class="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex gap-2 z-10">
        {#each beritaTerbaru as _, i}
          <button 
            class="w-2.5 h-2.5 rounded-full transition-all duration-300 {i === currentIndex ? 'bg-[#00a651] w-8' : 'bg-white/50 hover:bg-white'}"
            onclick={() => currentIndex = i}
            aria-label="Ke slide {i + 1}"
          ></button>
        {/each}
      </div>

    </div>
  </div>
</section>