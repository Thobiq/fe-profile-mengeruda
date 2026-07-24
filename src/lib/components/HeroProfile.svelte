<script>
  let { galleries = [] } = $props();

  let images = $derived(
    galleries && galleries.length > 0 
      ? galleries.slice(0, 5).map(g => g.image_path.startsWith('http') ? g.image_path : `/storage/${g.image_path.replace('/storage/', '')}`)
      : ['/hero-1.jpg', '/hero-2.png']
  );

  let currentIndex = $state(0);

  $effect(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<div class="max-w-[1500px] mx-auto px-6 w-full pt-10 pb-8">
  
  <!-- Judul Halaman di Atas Gambar -->
  <h1 class="text-center text-4xl md:text-[44px] font-serif font-bold text-black mb-10">
    Profil Desa Mengeruda
  </h1>
  
  <!-- Container Gambar Slider -->
  <div class="relative w-full h-[400px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-xl">
    
    <!-- Render gambar secara bergantian -->
    {#each images as img, index}
      <div 
        class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        style="background-image: url('{img}'); opacity: {index === currentIndex ? 1 : 0};"
      ></div>
    {/each}

    <!-- 
      Catatan: Kita sengaja menghapus elemen <div class="absolute inset-0 bg-black/30"></div> 
      di sini agar gambar terlihat lebih cerah sesuai aslinya karena sudah tidak ada 
      teks putih yang perlu dibaca di atasnya.
    -->
    
  </div>
</div>