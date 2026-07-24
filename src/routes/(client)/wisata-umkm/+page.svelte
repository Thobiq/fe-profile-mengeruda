<script>
  import PetaWisata from '$lib/components/PetaWisata.svelte';
  import ListUmkmWisata from '$lib/components/ListWisataUmkm.svelte';
</script>

<svelte:head>
  <title>Wisata dan UMKM Desa Mengeruda</title>
</svelte:head>

<main class="pb-10 bg-white min-h-screen">
  
  <!-- Hero Section Khusus Wisata -->
  <!-- <div class="w-full bg-[#00a651] py-20 px-6 mt-16 text-center text-white">
    <h1 class="text-4xl md:text-[50px] font-serif font-bold mb-4 drop-shadow-md">
      Pesona Wisata Desa
    </h1>
    <p class="font-serif text-lg md:text-xl max-w-2xl mx-auto opacity-90">
      Temukan keindahan alam dan pesona budaya yang memukau di Desa Mengeruda
    </p>
  </div> -->

  <!-- Section Peta Wisata -->
  <PetaWisata />
  
  <!-- Section Daftar Wisata & Filter -->
  <ListUmkmWisata />
  
</main>
