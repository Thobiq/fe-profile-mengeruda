<script>
  // Import komponen Navbar dari folder lib
  import Navbar from '$lib/components/Navbar.svelte';
  import DevelopmentBanner from '$lib/components/DevelopmentBanner.svelte';
  import '../../app.css';
  
  // Mengambil konten halaman anak (Svelte 5 syntax)
  let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50">
  <div class="sticky top-0 z-50 w-full flex flex-col">
    <!-- Navbar akan selalu muncul di atas untuk semua halaman client -->
    <Navbar />
    
    <DevelopmentBanner />
  </div>

  <!-- Konten utama (Home, Profil, Wisata, dll) akan dirender di sini -->
  <main>
    {@render children()}
  </main>
</div>