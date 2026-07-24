<script>
  import HeroProfil from '$lib/components/HeroProfile.svelte';
  import ProfilTentang from '$lib/components/ProfilTentang.svelte';
  import ProfilVisiMisi from '$lib/components/ProfilVisiMisi.svelte';
  import ProfilStruktur from '$lib/components/ProfilStruktur.svelte';
  import PemerintahDesa from '$lib/components/PemerintahDesa.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <!-- Mengubah title pada tab browser -->
  <title>Profil - Desa Mengeruda</title>
</svelte:head>

<!-- Menampilkan Hero Section Profil -->
<HeroProfil galleries={data.galleries} />

<main class="pb-10">
  <ProfilTentang profile={data.villageProfile} />
  <ProfilVisiMisi profile={data.villageProfile} />
  <ProfilStruktur struktur={data.strukturDesa} />
  <PemerintahDesa struktur={data.strukturDesa} />
</main>