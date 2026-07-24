<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let slug = $derived($page.params.slug);

  let beritaDetail = $state(null);
  let beritaLainnya = $state([]);
  let isLoading = $state(true);
  let isError = $state(false);

  // Ambil detail berita dan berita lainnya
  const fetchData = async (currentSlug) => {
    isLoading = true;
    isError = false;
    try {
      // Fetch detail berita
      const resDetail = await fetch(`http://127.0.0.1:8000/api/news/${currentSlug}`);
      const jsonDetail = await resDetail.json();
      
      if (resDetail.ok && jsonDetail.success) {
        beritaDetail = jsonDetail.data;
        // Format tanggal
        const dateObj = new Date(beritaDetail.created_at);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        beritaDetail.formattedDate = `${day}/${month}/${year}`;
        beritaDetail.img = beritaDetail.banner_url || '/hero-1.jpg';
      } else {
        isError = true;
      }

      // Fetch berita lainnya (5 terbaru)
      const resAll = await fetch('http://127.0.0.1:8000/api/news');
      const jsonAll = await resAll.json();
      
      if (resAll.ok && jsonAll.success) {
        // Filter out current news and get top 5
        beritaLainnya = jsonAll.data
          .filter(item => item.slug !== currentSlug)
          .slice(0, 5)
          .map(item => {
            const d = new Date(item.created_at);
            return {
              title: item.judul,
              date: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`,
              img: item.banner_url || '/hero-1.jpg',
              slug: item.slug
            };
          });
      }
    } catch (err) {
      console.error("Gagal mengambil data berita:", err);
      isError = true;
    } finally {
      isLoading = false;
    }
  };

  // Re-fetch saat slug berubah (jika user klik dari sidebar)
  $effect(() => {
    if (slug) {
      fetchData(slug);
    }
  });
</script>

<svelte:head>
  <title>{beritaDetail ? beritaDetail.judul + ' - ' : ''}Berita Desa Mengeruda</title>
</svelte:head>

<main class="w-full bg-white pb-20 pt-10">
  <div class="max-w-[1300px] mx-auto px-6">
    
    {#if isLoading}
      <div class="flex flex-col items-center justify-center py-32 text-[#00a651]">
        <svg class="animate-spin h-10 w-10 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="font-serif text-lg text-gray-500">Memuat detail berita...</span>
      </div>
    {:else if isError || !beritaDetail}
      <div class="text-center py-32">
        <h2 class="text-3xl font-serif font-bold text-gray-800 mb-4">Berita Tidak Ditemukan</h2>
        <p class="text-gray-500 font-serif mb-8">Berita yang Anda cari mungkin telah dihapus atau link tidak valid.</p>
        <a href="/berita" class="bg-[#00a651] text-white px-8 py-3 rounded-full font-serif font-bold hover:bg-[#008f45] transition-colors">
          Kembali ke Daftar Berita
        </a>
      </div>
    {:else}
      
      <!-- Layout: Konten Utama & Sidebar -->
      <div class="flex flex-col lg:flex-row gap-12">
        
        <!-- ============================================== -->
        <!-- KOLOM KONTEN BERITA (Kiri)                     -->
        <!-- ============================================== -->
        <article class="flex-1 max-w-[850px]">
          <!-- Banner Image -->
          <div class="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden mb-8 shadow-sm border border-gray-100">
            <img 
              src={beritaDetail.img} 
              alt={beritaDetail.judul} 
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Judul & Tanggal -->
          <h1 class="text-3xl md:text-[42px] font-serif font-bold text-black mb-6 leading-tight">
            {beritaDetail.judul}
          </h1>
          
          <div class="mb-10 inline-flex items-center gap-2 bg-[#00a651] text-white px-5 py-2 rounded-full font-bold shadow-sm text-[15px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
            </svg>
            {beritaDetail.formattedDate}
          </div>

          <!-- Isi Konten HTML dari Quill -->
          <div class="prose prose-lg md:prose-xl max-w-none prose-p:text-gray-700 prose-p:font-serif prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-black prose-a:text-[#00a651] prose-img:rounded-xl prose-img:shadow-sm">
            {@html beritaDetail.content}
          </div>
        </article>

        <!-- ============================================== -->
        <!-- KOLOM SIDEBAR (Kanan)                          -->
        <!-- ============================================== -->
        <aside class="w-full lg:w-[350px] shrink-0">
          <div class="bg-white rounded-3xl border border-gray-100 shadow-[0_0_15px_rgba(0,0,0,0.03)] p-6 md:p-8 sticky top-10">
            <h3 class="text-xl font-serif font-bold text-[#00a651] text-center mb-6 pb-4 border-b border-gray-100">
              Berita Lainnya
            </h3>
            
            <div class="flex flex-col gap-6">
              {#each beritaLainnya as item}
                <a 
                  href={`/berita/${item.slug}`} 
                  class="group flex flex-col gap-3 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div class="w-full h-[160px] rounded-2xl overflow-hidden bg-gray-100">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div>
                    <div class="mb-2">
                      <span class="inline-flex items-center gap-1 bg-[#00a651] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
                          <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
                        </svg>
                        {item.date}
                      </span>
                    </div>
                    <h4 class="font-serif font-bold text-gray-900 leading-snug group-hover:text-[#00a651] transition-colors line-clamp-3">
                      {item.title}
                    </h4>
                  </div>
                </a>
              {/each}
              
              {#if beritaLainnya.length === 0}
                <div class="text-center text-gray-500 font-serif text-sm">
                  Belum ada berita lainnya.
                </div>
              {/if}
            </div>
          </div>
        </aside>

      </div>
    {/if}

  </div>
</main>
