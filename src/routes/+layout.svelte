<script>
  // Sesuaikan path ini dengan lokasi file CSS Tailwind kamu
  // Biasanya ada di src/app.css atau src/global.css
  import '../app.css'; 
  import PageLoader from '$lib/components/PageLoader.svelte';
  import { onMount } from 'svelte';

  let {children} = $props();

  onMount(() => {
    // Sembunyikan dan hapus splash screen awal setelah Svelte berhasil dimuat
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.style.opacity = '0';
      splash.style.visibility = 'hidden';
      setTimeout(() => splash.remove(), 800);
    }
  });
</script>

<PageLoader />

<!-- {@render children()} adalah sintaks Svelte 5 untuk menampilkan isi halaman -->
{@render children()}