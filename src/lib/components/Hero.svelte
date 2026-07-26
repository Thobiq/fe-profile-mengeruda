<script>
  let { galleries = [] } = $props();

  const getHeroImgUrl = (item) => {
    if (item.image_url && item.image_url.startsWith('http')) return item.image_url;
    const path = item.image_path || item.image_url || '';
    if (!path) return '/hero-1.jpg';
    if (path.startsWith('http')) return path;
    const clean = path.replace(/^\/?storage\//, '').replace(/^\//, '');
    const backend = import.meta.env.VITE_PUBLIC_BACKEND_URL || (import.meta.env.PROD ? 'https://api.mengeruda.id' : 'http://localhost:8000');
    return `${backend}/storage/${clean}`;
  };

  // Ambil maksimal 5 gambar terbaru dari galeri
  let images = $derived(
    galleries && galleries.length > 0 
      ? galleries.slice(0, 5).map(g => getHeroImgUrl(g))
      : ['/hero-1.jpg', '/sinergi-mahasiswa-kkn.jpeg', '/diskusi-kantor-desa.png']
  );

  // State untuk melacak gambar mana yang sedang aktif
  let currentIndex = $state(0);

  // $effect akan berjalan saat komponen dimuat di browser
  $effect(() => {
    // Mengatur interval pergantian gambar setiap 5 detik (5000 ms)
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
    }, 2000);

    // Membersihkan interval saat komponen dihancurkan (mencegah memory leak)
    return () => clearInterval(interval);
  });
</script>

<!-- Membungkus Hero dengan padding dan batas lebar maksimal agar konsisten dengan Navbar -->
<div class="max-w-[1500px] mx-auto px-6 py-4 w-full">
  
  <!-- Container utama Hero dengan tinggi spesifik dan sudut membulat -->
  <div class="relative w-full h-[400px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-xl">
    
    <!-- Render semua gambar sebagai background, tapi hanya 1 yang opasitasnya 1 (terlihat) -->
    {#each images as img, index}
      <div 
        class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out w-full"
        style="background-image: url('{img}'); opacity: {index === currentIndex ? 1 : 0};"
      ></div>
    {/each}

    <!-- Overlay Gelap (Agar teks putih tetap terbaca walau gambar background terang) -->
    <div class="absolute inset-0 bg-black/30"></div>

    <!-- Konten Statis (Teks dan Tombol) yang selalu berada di paling atas (z-10) -->
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
      
      <h2 class="text-white font-serif text-3xl md:text-[44px] font-bold leading-snug drop-shadow-lg mb-8">
        Selamat Datang di Website Resmi <br /> Desa Mengeruda
      </h2>
      
      <!-- Tombol dengan warna hijau khusus (menggunakan warna hex hex yang mendekati desain) -->
      <a 
        href="/profil" 
        class="bg-[#00a651] hover:bg-[#008f45] text-white font-medium text-lg py-3 px-10 rounded-full transition-colors duration-300 shadow-md"
      >
        Selengkapnya
      </a>
      
    </div>
  </div>
</div>