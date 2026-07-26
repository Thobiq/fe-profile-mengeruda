<script>
  // Import komponen Navbar dari folder lib
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import DevelopmentBanner from '$lib/components/DevelopmentBanner.svelte';
  import '../../app.css';
  
  import { onMount } from 'svelte';
  import api from '$lib/api';

  // Mengambil konten halaman anak (Svelte 5 syntax)
  let { children } = $props();

  let logoUrl = $state('/logo.png');

  onMount(async () => {
    try {
      const res = await api.get('/api/village-profile');
      const d = res.data?.data || res.data;
      if (d && (d.logo_url || d.logo)) {
        let url = d.logo_url || d.logo;
        if (!url.startsWith('http')) {
          url = `${import.meta.env.VITE_PUBLIC_BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url.startsWith('storage') ? url : url.replace('/storage/', 'storage/')}`;
        }
        logoUrl = url;
      }
    } catch (e) {
      console.error('Gagal mengambil logo favicon di client layout:', e);
    }
  });
</script>

<svelte:head>
  <link rel="icon" href={logoUrl} />
</svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col justify-between">
  <div>
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

  <!-- Footer Website Profil Desa Mengeruda -->
  <Footer />
</div>