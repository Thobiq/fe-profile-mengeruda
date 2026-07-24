<script>
  let { profile = null } = $props();

  let visiDesa = $derived(
    profile && profile.visi_desa
      ? profile.visi_desa
      : `<p class="text-white font-serif text-[17px] md:text-lg leading-relaxed text-justify">
          Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt
          reprehenderit ad anim do adipiscing aute. Pariatur voluptate dolore deserunt nisi
          fugiat ea ut adipiscing mollit irure. Et aliquip enim laboris nisi eiusmod aute
          cillum consequat dolore et deserunt.
        </p>`
  );

  let misiDesa = $derived(
    profile && profile.misi_desa
      ? profile.misi_desa
      : `<p class="text-white font-serif text-[17px] md:text-lg leading-relaxed text-justify">
          Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt
          reprehenderit ad anim do adipiscing aute. Pariatur voluptate dolore deserunt nisi
          fugiat ea ut adipiscing mollit irure. Et aliquip enim laboris nisi eiusmod aute
          cillum consequat dolore et deserunt.
        </p>`
  );
</script>

<section class="w-full bg-white pb-16 md:pb-24">
  <div class="max-w-[1500px] mx-auto px-6">
    
    <!-- Judul Section -->
    <h2 class="text-3xl md:text-[40px] font-serif font-bold text-black mb-8">
      Visi & Misi Desa
    </h2>

    <!-- Grid Layout: 1 kolom di Mobile, 2 kolom di Desktop -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <!-- Kartu VISI -->
      <div class="bg-[#00a651] rounded-[2rem] p-8 md:p-12 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300">
        
        <!-- Header Kartu (Ikon & Judul) -->
        <div class="flex items-center gap-5 mb-6">
          <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
            <!-- Ikon Target (Visi) -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-[#00a651]">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 15a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5z" clip-rule="evenodd" />
              <circle cx="12" cy="12" r="2.25" />
            </svg>
          </div>
          <h3 class="text-white font-serif font-bold text-3xl md:text-4xl">
            Visi
          </h3>
        </div>

        <!-- Deskripsi Visi -->
        <div class="quill-content prose prose-lg max-w-none prose-invert text-white font-serif leading-relaxed text-justify marker:text-white">
          {@html visiDesa}
        </div>
      </div>

      <!-- Kartu MISI -->
      <div class="bg-[#00a651] rounded-[2rem] p-8 md:p-12 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300">
        
        <!-- Header Kartu (Ikon & Judul) -->
        <div class="flex items-center gap-5 mb-6">
          <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
            <!-- Ikon Gunung/Pencapaian (Misi) -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-[#00a651]">
              <path d="M3.75 21h16.5a.75.75 0 00.75-.75v-1.5a.75.75 0 00-.75-.75H3.75a.75.75 0 00-.75.75v1.5c0 .414.336.75.75.75zM12 17.25L17.25 8h-10.5L12 17.25zM15.75 7.5V3.375a.375.375 0 00-.625-.28l-3.125 2.813a.75.75 0 01-1.004 0L7.875 3.095a.375.375 0 00-.625.28v4.125h8.5z" />
            </svg>
          </div>
          <h3 class="text-white font-serif font-bold text-3xl md:text-4xl">
            Misi
          </h3>
        </div>

        <!-- Deskripsi Misi -->
        <div class="quill-content prose prose-lg max-w-none prose-invert text-white font-serif leading-relaxed text-justify marker:text-white">
          {@html misiDesa}
        </div>
      </div>

    </div>
  </div>
</section>