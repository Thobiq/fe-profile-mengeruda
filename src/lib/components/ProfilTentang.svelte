<script>
  let { profile = null } = $props();

  let sejarahDesa = $derived(
    profile && profile.sejarah_desa 
      ? profile.sejarah_desa 
      : `<p class="text-[17px] md:text-lg font-serif text-gray-900 leading-relaxed text-justify">
          Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing
          aute. Pariatur voluptate dolore deserunt nisi fugiat ea ut adipiscing mollit irure. Et aliquip enim laboris nisi
          eiusmod aute cillum consequat dolore et deserunt. In consequat excepteur in velit sint commodo minim duis.
        </p>`
  );
</script>

<section class="w-full bg-white py-12 md:py-16">
  <!-- Batas lebar maksimal disamakan dengan komponen lainnya (1500px) -->
  <div class="max-w-[1500px] mx-auto px-6">
    
    <!-- Judul Section -->
    <h2 class="text-3xl md:text-[40px] font-serif font-bold text-black mb-6">
      Tentang Desa
    </h2>
    
    <!-- Paragraf Deskripsi (menggunakan text-justify agar rata kiri-kanan seperti di desain) -->
    <div class="quill-content prose prose-lg max-w-none text-gray-900 font-serif leading-relaxed text-justify marker:text-black">
      {@html sejarahDesa}
    </div>
    
  </div>
</section>