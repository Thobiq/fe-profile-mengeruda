<script>
  // Data dummy katalog produk UMKM sesuai desain
  // Nantinya bisa diganti dengan hasil fetch dari API Laravel
  const daftarProduk = Array(6).fill({
    name: 'Keripik Tempe',
    price: 'Rp10.000',
    store: 'Mengeruda Bangkit Official Store',
    img: '/produk-tempe.png ', // Pastikan file gambar disiapkan di folder static
    waNumber: '6281234567890', // Nomor dummy untuk link WhatsApp
    mapsUrl: 'https://maps.google.com' // Link dummy koordinat
  });

  // State reaktif Svelte 5 untuk fitur pencarian
  let searchQuery = $state('');

  function handleSearch(e) {
    e.preventDefault();
    console.log("Mencari produk UMKM:", searchQuery);
    // Logika fetch API dengan filter nama produk akan diletakkan di sini
  }
</script>

<section class="w-full bg-white pb-20 pt-8">
  <div class="max-w-[1500px] mx-auto px-6">
    
    <!-- Judul Section -->
    <h2 class="text-3xl md:text-[40px] font-serif font-bold text-black mb-6">
      Produk UMKM Desa Mengeruda
    </h2>

    <!-- Form Pencarian (Sesuai Desain) -->
    <form onsubmit={handleSearch} class="flex flex-col md:flex-row gap-4 mb-12">
      <div class="relative flex-grow">
        <input 
          type="text" 
          bind:value={searchQuery}
          placeholder="Cari produk UMKM" 
          class="w-full border border-[#00a651] rounded-full px-6 py-3.5 text-[17px] font-serif text-gray-700 outline-none focus:ring-4 focus:ring-[#00a651]/20 transition-all placeholder:italic placeholder:text-gray-500"
        />
      </div>
      <button 
        type="submit" 
        class="bg-[#00a651] hover:bg-[#008f45] text-white font-serif font-bold text-lg px-12 py-3.5 rounded-full transition-colors duration-300 shadow-sm shrink-0"
      >
        Cari
      </button>
    </form>

    <!-- Grid List Produk -->
    <!-- Menggunakan grid 1 kolom (HP), 2 kolom (Tablet), 3/4 kolom (Desktop) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {#each daftarProduk as produk}
        <!-- Kartu Produk -->
        <div class="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col p-4">
          
          <!-- Gambar Produk (Sudut melengkung di dalam kartu) -->
          <div class="w-full h-[220px] rounded-2xl overflow-hidden mb-5 bg-gray-50">
            <img 
              src={produk.img} 
              alt={produk.name} 
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
            />
          </div>
          
          <!-- Informasi Produk -->
          <div class="flex flex-col flex-grow px-2">
            <!-- Nama Produk -->
            <h3 class="text-[26px] font-serif font-bold text-black leading-tight mb-1">
              {produk.name}
            </h3>
            
            <!-- Harga Produk -->
            <p class="text-[26px] font-serif font-bold text-[#00a651] mb-4">
              {produk.price}
            </p>
            
            <!-- Info Toko dengan Ikon -->
            <div class="flex items-center gap-2 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#00a651]">
                <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627-.47 1.406-.75 2.25-.75.844 0 1.623.28 2.25.75.627-.47 1.406-.75 2.25-.75.844 0 1.623.28 2.25.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                <path fill-rule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.25 5.25 0 0012 12.75a5.25 5.25 0 004.5-1.255v8.755c0 .966-.784 1.75-1.75 1.75H4.75a1.75 1.75 0 01-1.75-1.75zM9 19.5a.75.75 0 00.75-.75v-2.25a.75.75 0 00-.75-.75h-2.25a.75.75 0 00-.75.75v2.25c0 .414.336.75.75.75H9z" clip-rule="evenodd" />
              </svg>
              <span class="font-serif text-sm md:text-[15px] font-semibold text-gray-800 tracking-wide line-clamp-1">
                {produk.store}
              </span>
            </div>
            
            <!-- Area Tombol Aksi (Grid 2 Kolom) -->
            <!-- mt-auto memastikan tombol selalu berada di paling bawah kartu -->
            <div class="grid grid-cols-2 gap-3 mt-auto pb-1">
              
              <!-- Tombol WhatsApp (Solid Green) -->
              <a 
                href={`https://wa.me/${produk.waNumber}`} 
                target="_blank"
                class="flex items-center justify-center gap-1.5 bg-[#00a651] hover:bg-[#008f45] text-white font-serif font-bold text-base md:text-lg py-2.5 px-3 rounded-full transition-colors shadow-sm"
              >
                <!-- Ikon WhatsApp SVG -->
                <svg viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 md:w-6 md:h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Whatsapp
              </a>
              
              <!-- Tombol Lokasi (Outlined Green) -->
              <a 
                href={produk.mapsUrl}
                target="_blank"
                class="flex items-center justify-center gap-1.5 bg-white border-[2px] border-[#00a651] text-[#00a651] hover:bg-green-50 font-serif font-bold text-base md:text-lg py-2 rounded-full transition-colors shadow-sm"
              >
                <!-- Ikon Map Pin SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 md:w-6 md:h-6">
                  <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                Lokasi
              </a>
              
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- pendaftaran UMKM -->
    <div class="w-full border-2 border-[#00a651] rounded-[2rem] p-8 md:p-12 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 mb-12 bg-white shadow-sm mt-20">
      
      <!-- Sisi Kiri: Teks & Tombol -->
      <div class="w-full md:w-3/5 flex flex-col items-start">
        <h3 class="text-3xl md:text-4xl font-serif font-bold text-[#006430] mb-4 leading-tight">
          Daftarkan UMKM Anda
        </h3>
        <p class="text-[17px] md:text-lg font-serif text-gray-800 leading-relaxed mb-8 text-justify md:text-left">
          Dolor eiusmod mollit cupidatat officia consequat in elit tempor. Ex deserunt reprehenderit ad anim do adipiscing aute. Pariatur voluptate dolore deserunt nisi fugiat ea ut adipiscing mollit irure.
        </p>
        <a 
          href="/umkm/daftar" 
          class="bg-[#00a651] hover:bg-[#008f45] text-white font-serif font-bold text-lg px-8 py-3.5 rounded-full transition-colors shadow-md inline-block"
        >
          Daftar Sekarang
        </a>
      </div>

      <!-- Sisi Kanan: Ilustrasi -->
      <div class="w-full md:w-2/5 flex justify-center">
        <!-- Siapkan gambar ilustrasi di folder static dengan nama ilustrasi-toko.png -->
        <img 
          src="/ilustrasi-toko.png" 
          alt="Ilustrasi Pendaftaran UMKM" 
          class="w-full max-w-[320px] md:max-w-[380px] h-auto object-contain"
        />
      </div>

    </div>

  </div>
</section>