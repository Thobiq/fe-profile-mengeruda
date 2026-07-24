<script>
  import Hero from '$lib/components/Hero.svelte';
  import MenuUtama from '$lib/components/MenuUtama.svelte';
  import About from '$lib/components/About.svelte';
  import AdministrasiPenduduk from '$lib/components/AdministrasiPenduduk.svelte';
  import StrukturOrganisasi from '$lib/components/StrukturOrganisasi.svelte';
  import ApbDesa from '$lib/components/ApbDesa.svelte';
  import BeritaDesa from '$lib/components/BeritaDesa.svelte';
  import GaleriHome from '$lib/components/GaleriHome.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>Beranda - Desa Mengeruda</title>
</svelte:head>

<!-- Memanggil Hero Section -->
<Hero galleries={data.galleries} />

<MenuUtama />

<About profile={data.villageProfile} />

<AdministrasiPenduduk demographic={data.demographic} />

<StrukturOrganisasi struktur={data.strukturDesa} />

<ApbDesa apb={data.apbDesa} />

<BeritaDesa news={data.news} />

<GaleriHome galleries={data.galleries} />

<!-- Bagian lain dari halaman beranda bisa dilanjutkan di bawah sini -->
<section class="max-w-[1500px] mx-auto px-6 py-12">
  <!-- Konten sambutan, profil singkat, dll -->
</section>