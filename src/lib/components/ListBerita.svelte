<script>
  import { onMount } from 'svelte';

  // State reaktif Svelte 5 untuk data dari backend
  let daftarBerita = $state([]);
  let searchQuery = $state('');
  let currentPage = $state(1);
  let totalPages = $state(1); // Sementara diset 1
  let isLoading = $state(true);

  // Ambil data dari backend saat komponen dimuat
  onMount(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/news`);
      const json = await res.json();
      if (res.ok && json.success) {
        daftarBerita = json.data.map(item => {
          const dateObj = new Date(item.created_at);
          const day = String(dateObj.getDate()).padStart(2, '0');
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const year = dateObj.getFullYear();
          
          // Hapus tag HTML dari konten untuk membuat cuplikan (excerpt)
          let plainText = item.content.replace(/<[^>]+>/g, '');
          let excerpt = plainText.substring(0, 120) + (plainText.length > 120 ? '...' : '');

          return {
            title: item.judul,
            date: `${day}/${month}/${year}`,
            excerpt: excerpt,
            img: item.banner_url || '/hero-1.jpg', // Gunakan placeholder jika tidak ada banner
            slug: item.slug
          };
        });
      }
    } catch (err) {
      console.error("Gagal mengambil data berita:", err);
    } finally {
      isLoading = false;
    }
  });

  // Fungsi simulasi pencarian (nantinya bisa difilter di computed variable atau via API)
  function handleSearch(e) {
    e.preventDefault();
    console.log("Mencari berita:", searchQuery);
  }

  // Fungsi ganti halaman
  function changePage(page) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  }
</script>

<section class="w-full bg-white pb-20">
  <div class="max-w-[1500px] mx-auto px-6">
    
    <!-- Judul Section -->
    <h2 class="text-3xl md:text-[40px] font-serif font-bold text-black mb-8">
      Semua Berita
    </h2>

    <!-- Form Pencarian -->
    <form onsubmit={handleSearch} class="flex flex-col md:flex-row gap-4 mb-12">
      <!-- Input Search dengan border hijau sesuai desain -->
      <div class="relative flex-grow">
        <input 
          type="text" 
          bind:value={searchQuery}
          placeholder="Cari berita desa..." 
          class="w-full border-2 border-[#00a651] rounded-full px-6 py-3.5 text-[17px] font-serif font-medium text-gray-700 outline-none focus:ring-4 focus:ring-[#00a651]/20 transition-all placeholder:font-italic placeholder:text-gray-400"
        />
      </div>
      <!-- Tombol Cari -->
      <button 
        type="submit" 
        class="bg-[#00a651] hover:bg-[#008f45] text-white font-serif font-bold text-lg px-12 py-3.5 rounded-full transition-colors duration-300 shadow-sm shrink-0"
      >
        Cari
      </button>
    </form>

    <!-- Grid List Berita (1 Kolom HP, 2 Kolom Tablet, 3 Kolom Desktop) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {#each daftarBerita as berita, i}
        <a 
          href={`/berita/${berita.slug}`} 
          class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
        >
          <!-- Thumbnail Gambar -->
          <div class="w-full h-[240px] overflow-hidden bg-gray-100">
            <img 
              src={berita.img} 
              alt={berita.title} 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          
          <!-- Konten Teks Kartu -->
          <div class="p-6 flex flex-col flex-grow">
            <!-- Badge Tanggal -->
            <div class="mb-4">
              <span class="inline-flex items-center gap-1.5 bg-[#00a651] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                  <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
                </svg>
                {berita.date}
              </span>
            </div>

            <!-- Judul Berita -->
            <h3 class="text-[#008f45] font-serif font-bold text-xl leading-snug mb-3 group-hover:text-[#00a651] transition-colors">
              {berita.title}
            </h3>
            
            <!-- Cuplikan / Excerpt -->
            <p class="text-gray-600 font-serif text-[15px] leading-relaxed line-clamp-3">
              {berita.excerpt}
            </p>
          </div>
        </a>
      {/each}
    </div>

    <!-- Pagination UI -->
    <div class="flex items-center justify-center gap-2">
      <!-- Tombol Sebelumnya -->
      <button 
        onclick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        class="w-10 h-10 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-serif text-lg"
      >
        &lt;
      </button>

      <!-- Angka Halaman -->
      {#each Array(totalPages) as _, idx}
        {@const pageNum = idx + 1}
        <button 
          onclick={() => changePage(pageNum)}
          class="w-10 h-10 flex items-center justify-center rounded border font-serif text-lg transition-colors
            {currentPage === pageNum 
              ? 'bg-[#00a651] text-white border-[#00a651]' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}"
        >
          {pageNum}
        </button>
      {/each}

      <!-- Tombol Selanjutnya -->
      <button 
        onclick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        class="w-10 h-10 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-serif text-lg"
      >
        &gt;
      </button>
    </div>

  </div>
</section>