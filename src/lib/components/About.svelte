<script>
  let { profile = null } = $props();

  let textNarasi = $derived(
    profile && profile.tentang_desa 
      ? (profile.tentang_desa.replace(/<[^>]*>?/gm, '').substring(0, 300) + '...')
      : 'Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing aute. Pariatur voluptate dolore deserunt nisi fugiat ea ut adipiscing mollit irure.'
  );

  let imageUrl = $derived(
    profile && profile.logo_url 
      ? (profile.logo_url.startsWith('http') ? profile.logo_url : `/storage/${profile.logo_url.replace('/storage/', '')}`)
      : '/peta-mengeruda.png'
  );
</script>

<section class="w-full bg-white py-6 md:py-10">
  <!-- Wrapper untuk membatasi lebar maksimal 1500px dan menengahkan konten -->
  <div class="max-w-[1500px] mx-auto px-6">
    
    <!-- Grid layout: 1 kolom di HP, 2 kolom di layar medium ke atas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
      
      <!-- Bagian Kiri: Teks dan Tombol -->
      <div class="flex flex-col items-start">
        <h2 class="text-4xl md:text-[42px] font-serif font-bold text-black mb-6">
          Tentang Mengeruda
        </h2>
        
        <p class="text-[17px] md:text-lg font-serif text-gray-800 leading-relaxed mb-8 text-justify">
          {textNarasi}
        </p>
        
        <!-- Tombol menggunakan warna hijau yang sama dengan Hero Section -->
        <a 
          href="/profil" 
          class="bg-[#00a651] hover:bg-[#008f45] text-white font-medium text-[17px] py-3 px-8 rounded-full transition-colors duration-300 shadow-sm inline-block"
        >
          Selengkapnya
        </a>
      </div>

      <!-- Bagian Kanan: Gambar Ilustrasi Peta -->
      <div class="w-full flex justify-center">
        <!-- Pastikan gambar peta ini sudah kamu simpan di folder /static -->
        <img 
          src={imageUrl} 
          alt="Ilustrasi Desa Mengeruda" 
          class="w-full max-w-[400px] h-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-500" 
        />
      </div>

    </div>
  </div>
</section>