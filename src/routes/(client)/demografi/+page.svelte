<script>
  import { onMount } from 'svelte';
  // Import komponen yang baru saja dibuat
  import StatistikPenduduk from '$lib/components/StatistikPenduduk.svelte';
  import StatistikDusun from '$lib/components/StatistikDusun.svelte';
  import StatistikPekerjaan from '$lib/components/StatistikPekerjaan.svelte';
  import StatistikAgama from '$lib/components/StatistikAgama.svelte';

  let demoData = $state(null);

  onMount(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/demographic`);
      const json = await res.json();
      if (res.ok && json.success) {
        demoData = json.data;
      }
    } catch (err) {
      console.error("Gagal load data demografi:", err);
    }
  });
</script>

<svelte:head>
  <title>Demografi Penduduk - Desa Mengeruda</title>
</svelte:head>

<main class="pb-20">
  <div class="mx-auto px-6">
    
    <!-- Header Halaman -->
    <div class="text-center mb-10 mt-10">
      <h1 class="text-3xl md:text-[42px] font-serif font-bold text-black mb-3">
        Demografi Penduduk
      </h1>
      <p class="text-gray-800 font-serif text-base md:text-lg max-w-2xl mx-auto">
        Informasi lengkap mengenai karakteristik demografi penduduk Desa Mengeruda
      </p>
    </div>

    <!-- Memanggil Komponen -->
    
    <!-- Ruang untuk komponen chart demografi lainnya di masa depan -->
    
</div>
{#if demoData}
  <StatistikPenduduk data={demoData} />
  <StatistikDusun data={demoData} />
  <StatistikPekerjaan data={demoData} />
  <StatistikAgama data={demoData} />
{:else}
  <div class="text-center py-20 text-gray-500 font-serif">
    Memuat data demografi...
  </div>
{/if}
</main>