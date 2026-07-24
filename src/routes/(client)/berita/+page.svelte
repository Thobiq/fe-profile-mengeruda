<script>
  import HeroBerita from '$lib/components/HeroBerita.svelte';
  import ListBerita from '$lib/components/ListBerita.svelte';
</script>

<svelte:head>
  <title>Berita - Desa Mengeruda</title>
</svelte:head>

<main class="pb-20">
  <!-- Menampilkan Hero Slider Berita -->
  <HeroBerita />
  <ListBerita />

  <!-- Tempat untuk list berita grid selanjutnya -->
</main>