<script>
  import { onMount } from 'svelte';
  import api from '$lib/api';

  // State reaktif menggunakan Svelte 5 Runes
  let isLoading = $state(true);

  // 1. Data Profil Desa
  let profile = $state({
    nama_desa: 'Mengeruda',
    kecamatan: 'Soa',
    kabupaten: 'Ngada',
    provinsi: 'Nusa Tenggara Timur',
    alamat: 'Mengeruda, Kec. Soa, Kabupaten Ngada, Nusa Tenggara Tim.',
    telp: '0812-3456-7890',
    email: 'pemdes@mengeruda.id',
    logo_url: '/logo.png',
    tentang_desa: '',
    sejarah_desa: '',
    visi_desa: '',
    misi_desa: ''
  });

  // 2. Data Demografi
  let demografi = $state({
    total_penduduk: 0,
    total_kk: 0,
    laki_laki: 0,
    perempuan: 0,
    dusun_data: []
  });

  // 3. Data Berita
  let newsList = $state([]);
  let totalNews = $derived(newsList.length);
  let recentNews = $derived(newsList.slice(0, 4));

  // 4. Data Struktur Organisasi
  let aparatList = $state([]);
  let totalAparat = $derived(aparatList.length);

  // 5. Data APB Desa
  let apbList = $state([]);
  let latestApbYear = $derived(apbList.length > 0 ? apbList[0].year : 'Belum Ada');

  // Load semua data dari API saat komponen di-mount
  onMount(async () => {
    isLoading = true;
    try {
      const [resProfile, resDemo, resNews, resStruktur, resApb] = await Promise.allSettled([
        api.get('/api/village-profile'),
        api.get('/api/demographic'),
        api.get('/api/news'),
        api.get('/api/struktur-desa'),
        api.get('/api/apb-desa')
      ]);

      // Parse Profil Desa
      if (resProfile.status === 'fulfilled' && resProfile.value.data) {
        const d = resProfile.value.data.data || resProfile.value.data;
        if (d) {
          profile.nama_desa = d.nama_desa || 'Mengeruda';
          profile.kecamatan = d.kecamatan || 'Soa';
          profile.kabupaten = d.kabupaten || 'Ngada';
          profile.provinsi = d.provinsi || 'Nusa Tenggara Timur';
          profile.alamat = d.alamat || profile.alamat;
          profile.telp = d.telp || profile.telp;
          profile.email = d.email || profile.email;
          profile.tentang_desa = d.tentang_desa || '';
          profile.sejarah_desa = d.sejarah_desa || '';
          profile.visi_desa = d.visi_desa || '';
          profile.misi_desa = d.misi_desa || '';
          if (d.logo_url) {
            let url = d.logo_url;
            if (!url.startsWith('http')) {
              url = `${import.meta.env.VITE_PUBLIC_BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url}`;
            }
            profile.logo_url = url;
          }
        }
      }

      // Parse Demografi
      if (resDemo.status === 'fulfilled' && resDemo.value.data) {
        const d = resDemo.value.data.data || resDemo.value.data;
        if (d) {
          demografi.total_penduduk = Number(d.total_penduduk) || 0;
          demografi.total_kk = Number(d.total_kk) || 0;
          demografi.laki_laki = Number(d.laki_laki) || 0;
          demografi.perempuan = Number(d.perempuan) || 0;
          let parsedDusun = d.dusun_data;
          if (typeof parsedDusun === 'string') {
            try { parsedDusun = JSON.parse(parsedDusun); } catch (e) {}
          }
          if (Array.isArray(parsedDusun)) {
            demografi.dusun_data = parsedDusun;
          }
        }
      }

      // Parse Berita
      if (resNews.status === 'fulfilled' && resNews.value.data) {
        const d = resNews.value.data.data || resNews.value.data;
        if (Array.isArray(d)) {
          newsList = d;
        }
      }

      // Parse Struktur Desa
      if (resStruktur.status === 'fulfilled' && resStruktur.value.data) {
        const d = resStruktur.value.data.data || resStruktur.value.data;
        if (Array.isArray(d)) {
          aparatList = d;
        }
      }

      // Parse APB Desa
      if (resApb.status === 'fulfilled' && resApb.value.data) {
        const d = resApb.value.data.data || resApb.value.data;
        if (Array.isArray(d)) {
          apbList = d;
        }
      }
    } catch (err) {
      console.error('Gagal mengambil data untuk Dashboard Admin:', err);
    } finally {
      isLoading = false;
    }
  });

  // Fungsi utilitas format angka
  function formatAngka(num) {
    return Number(num || 0).toLocaleString('id-ID');
  }

  // Cek kelengkapan profil
  let isInfoComplete = $derived(!!profile.nama_desa && !!profile.alamat);
  let isTentangComplete = $derived(profile.tentang_desa.replace(/<[^>]*>?/gm, '').trim().length > 0);
  let isSejarahComplete = $derived(profile.sejarah_desa.replace(/<[^>]*>?/gm, '').trim().length > 0);
  let isVisiMisiComplete = $derived(
    profile.visi_desa.replace(/<[^>]*>?/gm, '').trim().length > 0 &&
    profile.misi_desa.replace(/<[^>]*>?/gm, '').trim().length > 0
  );
</script>

<svelte:head>
  <title>Dashboard Admin | Pemerintah Desa {profile.nama_desa}</title>
</svelte:head>

<div class="space-y-8 pb-14 font-['Montserrat']">
  
  <!-- ========================================================================= -->
  <!-- 1. HERO BANNER / WELCOME CARD -->
  <!-- ========================================================================= -->
  <div class="relative bg-gradient-to-r from-[#006e33] via-[#00853e] to-[#04612e] rounded-3xl p-7 md:p-9 text-white shadow-xl overflow-hidden border border-[#006e33]/50">
    <!-- Elemen Dekoratif Ambient -->
    <div class="absolute -right-12 -top-12 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute right-24 -bottom-16 w-56 h-56 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

    <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div class="flex items-center gap-5">
        <div class="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl p-2.5 flex items-center justify-center shrink-0 shadow-md border border-white/20">
          <img src={profile.logo_url} alt="Logo Desa" class="w-full h-full object-contain" />
        </div>
        <div>
          <!-- <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider mb-2.5 border border-white/10">
            <span class="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            Portal Administrasi Desa
          </span> -->
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Selamat Datang di Dasbor Desa {profile.nama_desa}
          </h1>
          <p class="text-emerald-100 text-sm md:text-base mt-1.5 max-w-2xl font-normal leading-relaxed">
            Kelola data demografi, publikasi berita desa, struktur pemerintahan, anggaran APB Desa, dan profil desa secara real-time.
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3 shrink-0">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2.5 bg-white text-[#006e33] hover:bg-emerald-50 font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          Lihat Web Publik
        </a>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- 2. STATISTIK UTAMA (4 PRIMARY STAT CARDS) -->
  <!-- ========================================================================= -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    
    <!-- Stat 1: Total Penduduk -->
    <a href="/admin/demografi" class="bg-white border border-gray-200/80 rounded-3xl p-6 md:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      <div class="flex items-center justify-between mb-6">
        <div class="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#006e33] group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
          </svg>
        </div>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100/70 text-[#006e33] uppercase tracking-wider">
          Demografi
        </span>
      </div>
      <div>
        <h3 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
          {formatAngka(demografi.total_penduduk)} <span class="text-lg font-bold text-gray-400">Jiwa</span>
        </h3>
        <p class="text-sm font-bold text-gray-500 uppercase tracking-wider">
          Total Penduduk Desa
        </p>
        <div class="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-semibold">
          <span>L: {formatAngka(demografi.laki_laki)} Jiwa</span>
          <span>P: {formatAngka(demografi.perempuan)} Jiwa</span>
        </div>
      </div>
    </a>

    <!-- Stat 2: Kepala Keluarga -->
    <a href="/admin/demografi" class="bg-white border border-gray-200/80 rounded-3xl p-6 md:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      <div class="flex items-center justify-between mb-6">
        <div class="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        </div>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 uppercase tracking-wider">
          Keluarga
        </span>
      </div>
      <div>
        <h3 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
          {formatAngka(demografi.total_kk)} <span class="text-lg font-bold text-gray-400">KK</span>
        </h3>
        <p class="text-sm font-bold text-gray-500 uppercase tracking-wider">
          Kepala Keluarga
        </p>
        <div class="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-semibold">
          <span>{demografi.dusun_data ? demografi.dusun_data.length : 0} Dusun Wilayah</span>
          <span>Kec. {profile.kecamatan}</span>
        </div>
      </div>
    </a>

    <!-- Stat 3: Berita Diterbitkan -->
    <a href="/admin/berita" class="bg-white border border-gray-200/80 rounded-3xl p-6 md:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      <div class="flex items-center justify-between mb-6">
        <div class="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
            <path fill-rule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-amber-100/70 text-amber-700 uppercase tracking-wider">
          Publikasi
        </span>
      </div>
      <div>
        <h3 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
          {formatAngka(totalNews)} <span class="text-lg font-bold text-gray-400">Berita</span>
        </h3>
        <p class="text-sm font-bold text-gray-500 uppercase tracking-wider">
          Berita & Informasi
        </p>
        <div class="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-semibold">
          <span>{recentNews.length} Berita Terkini</span>
          <span class="text-[#006e33] font-bold">+ Tambah Berita</span>
        </div>
      </div>
    </a>

    <!-- Stat 4: Struktur Organisasi / Perangkat Desa -->
    <a href="/admin/struktur-organisasi" class="bg-white border border-gray-200/80 rounded-3xl p-6 md:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      <div class="flex items-center justify-between mb-6">
        <div class="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.741 6.741 0 0112 12a6.741 6.741 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" />
            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.198-1.156.347-1.764.441z" />
          </svg>
        </div>
        <span class="text-xs font-bold px-3 py-1 rounded-full bg-purple-100/70 text-purple-700 uppercase tracking-wider">
          Aparat
        </span>
      </div>
      <div>
        <h3 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">
          {formatAngka(totalAparat)} <span class="text-lg font-bold text-gray-400">Orang</span>
        </h3>
        <p class="text-sm font-bold text-gray-500 uppercase tracking-wider">
          Perangkat & Aparat Desa
        </p>
        <div class="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-semibold">
          <span>Struktur Pemerintahan</span>
          <span>APB Tahun {latestApbYear}</span>
        </div>
      </div>
    </a>

  </div>

  <!-- ========================================================================= -->
  <!-- 3. KONTEN DETAIL: 2 KOLOM (KIRI 7/12 & KANAN 5/12) -->
  <!-- ========================================================================= -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    
    <!-- KOLOM KIRI (7/12): RINGKASAN PROFIL & BERITA TERKINI -->
    <div class="lg:col-span-7 space-y-8">
      
      <!-- Card: Ringkasan Profil & Status Kelengkapan -->
      <div class="bg-white border border-gray-200/80 rounded-3xl p-7 md:p-8 shadow-sm">
        <div class="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
          <div>
            <h2 class="text-xl font-extrabold text-gray-900 tracking-tight">
              Ringkasan Informasi & Profil Desa
            </h2>
            <p class="text-sm text-gray-500 mt-1 font-medium">
              Identitas resmi kantor desa dan status kelengkapan data portal publik
            </p>
          </div>
          <a href="/admin/profil-desa" class="text-sm font-bold text-[#006e33] hover:underline flex items-center gap-1.5 shrink-0">
            <span>Edit Profil</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </div>

        <!-- Grid Identitas Desa -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7 text-sm">
          <div class="bg-slate-50/80 rounded-2xl p-4.5 border border-gray-200/60">
            <span class="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">Pemerintah Desa</span>
            <p class="font-extrabold text-gray-900 text-base">Desa {profile.nama_desa}</p>
            <p class="text-gray-600 text-xs mt-0.5 font-medium">Kecamatan {profile.kecamatan}, Kabupaten {profile.kabupaten}</p>
          </div>
          <div class="bg-slate-50/80 rounded-2xl p-4.5 border border-gray-200/60">
            <span class="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">Kontak Resmi</span>
            <p class="font-bold text-gray-900 truncate">{profile.email}</p>
            <p class="text-gray-600 text-xs mt-0.5 font-medium">Telp/WA: {profile.telp}</p>
          </div>
          <div class="sm:col-span-2 bg-slate-50/80 rounded-2xl p-4.5 border border-gray-200/60">
            <span class="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">Alamat Kantor Desa</span>
            <p class="font-bold text-gray-800 leading-relaxed">{profile.alamat}</p>
          </div>
        </div>

        <!-- Checklist Status Kelengkapan Konten -->
        <div class="border-t border-gray-100 pt-6">
          <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3.5">
            Status Kelengkapan Konten Portal
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div class={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs font-bold uppercase tracking-wide
              ${isInfoComplete ? 'bg-emerald-50/80 border-emerald-200 text-[#006e33]' : 'bg-amber-50/80 border-amber-200 text-amber-700'}`}>
              <span class={`w-2 h-2 rounded-full shrink-0 ${isInfoComplete ? 'bg-[#006e33]' : 'bg-amber-500'}`}></span>
              Informasi Desa
            </div>

            <div class={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs font-bold uppercase tracking-wide
              ${isTentangComplete ? 'bg-emerald-50/80 border-emerald-200 text-[#006e33]' : 'bg-amber-50/80 border-amber-200 text-amber-700'}`}>
              <span class={`w-2 h-2 rounded-full shrink-0 ${isTentangComplete ? 'bg-[#006e33]' : 'bg-amber-500'}`}></span>
              Tentang Desa
            </div>

            <div class={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs font-bold uppercase tracking-wide
              ${isSejarahComplete ? 'bg-emerald-50/80 border-emerald-200 text-[#006e33]' : 'bg-amber-50/80 border-amber-200 text-amber-700'}`}>
              <span class={`w-2 h-2 rounded-full shrink-0 ${isSejarahComplete ? 'bg-[#006e33]' : 'bg-amber-500'}`}></span>
              Sejarah Desa
            </div>

            <div class={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs font-bold uppercase tracking-wide
              ${isVisiMisiComplete ? 'bg-emerald-50/80 border-emerald-200 text-[#006e33]' : 'bg-amber-50/80 border-amber-200 text-amber-700'}`}>
              <span class={`w-2 h-2 rounded-full shrink-0 ${isVisiMisiComplete ? 'bg-[#006e33]' : 'bg-amber-500'}`}></span>
              Visi & Misi
            </div>

          </div>
        </div>

      </div>

      <!-- Card: Berita & Publikasi Terkini -->
      <div class="bg-white border border-gray-200/80 rounded-3xl p-7 md:p-8 shadow-sm">
        <div class="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
          <div>
            <h2 class="text-xl font-extrabold text-gray-900 tracking-tight">
              Berita & Publikasi Terkini
            </h2>
            <p class="text-sm text-gray-500 mt-1 font-medium">
              Daftar artikel berita terbaru yang diterbitkan di portal web desa
            </p>
          </div>
          <a href="/admin/berita" class="text-sm font-bold text-[#006e33] hover:underline flex items-center gap-1.5 shrink-0">
            <span>Kelola Semua</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </div>

        {#if recentNews.length === 0}
          <div class="text-center py-12 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto mb-3 opacity-50">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p class="font-bold text-base text-gray-600">Belum ada berita diterbitkan</p>
            <a href="/admin/berita/tambah" class="mt-4 inline-block bg-[#006e33] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-md">
              + Tambah Berita Baru
            </a>
          </div>
        {:else}
          <div class="space-y-4">
            {#each recentNews as b}
              <div class="flex items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all group">
                <div class="flex items-center gap-4 min-w-0">
                  <div class="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200/80">
                    <img
                      src={b.banner_url || (b.banner ? (b.banner.startsWith('http') ? b.banner : `/storage/${b.banner.replace('/storage/', '')}`) : '/hero-2.png')}
                      alt={b.judul}
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div class="min-w-0">
                    <span class="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#006e33] mb-1">
                      {b.created_at ? new Date(b.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Terbaru'}
                    </span>
                    <h3 class="font-bold text-gray-900 truncate group-hover:text-[#006e33] transition-colors text-base leading-snug">
                      {b.judul || 'Tanpa Judul'}
                    </h3>
                    <p class="text-xs text-gray-500 truncate mt-0.5 font-medium">
                      Slug: /berita/{b.slug}
                    </p>
                  </div>
                </div>
                <a
                  href={`/berita/${b.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="shrink-0 p-2.5 text-gray-400 hover:text-[#006e33] rounded-xl hover:bg-white border border-transparent hover:border-gray-200 transition-all shadow-none hover:shadow-sm"
                  title="Lihat di web publik"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            {/each}
          </div>
        {/if}

      </div>

    </div>

    <!-- KOLOM KANAN (5/12): DEMOGRAFI PER DUSUN & AKSES CEPAT -->
    <div class="lg:col-span-5 space-y-8">
      
      <!-- Card: Statistik Wilayah & Dusun -->
      <div class="bg-white border border-gray-200/80 rounded-3xl p-7 md:p-8 shadow-sm">
        <div class="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
          <div>
            <h2 class="text-xl font-extrabold text-gray-900 tracking-tight">
              Sebaran Penduduk Dusun
            </h2>
            <p class="text-sm text-gray-500 mt-1 font-medium">
              Komposisi penduduk berdasarkan wilayah dusun
            </p>
          </div>
          <a href="/admin/demografi" class="text-sm font-bold text-[#006e33] hover:underline">
            Kelola
          </a>
        </div>

        {#if !demografi.dusun_data || demografi.dusun_data.length === 0}
          <div class="text-center py-8 text-gray-400">
            <p class="text-sm font-medium">Belum ada data dusun diisi.</p>
          </div>
        {:else}
          {@const totalDusun = demografi.dusun_data.reduce((acc, curr) => acc + Number(curr.count || curr.total || curr.jumlah || 0), 0)}
          {@const divisor = demografi.total_penduduk > 0 ? demografi.total_penduduk : (totalDusun > 0 ? totalDusun : 1)}
          <div class="space-y-4.5">
            {#each demografi.dusun_data as ds}
              {@const jml = Number(ds.count || ds.total || ds.jumlah || 0)}
              {@const percentage = Math.round((jml / divisor) * 100)}
              <div>
                <div class="flex items-center justify-between text-sm mb-1.5 font-bold">
                  <span class="text-gray-700">{ds.name || ds.nama || 'Dusun'}</span>
                  <span class="text-gray-900 font-extrabold">
                    {formatAngka(jml)} Jiwa
                    <span class="text-xs text-gray-400 font-semibold ml-1">({percentage}%)</span>
                  </span>
                </div>
                <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-[#006e33] to-[#00a651] rounded-full transition-all duration-500"
                    style={`width: ${Math.min(100, percentage)}%`}
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        {/if}

        <div class="mt-7 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4 text-center">
          <div class="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-100/50">
            <span class="text-xs font-bold text-gray-500 block mb-1 uppercase tracking-wider">Rasio Laki-Laki</span>
            <span class="text-2xl font-extrabold text-[#006e33]">
              {demografi.total_penduduk > 0 ? Math.round((demografi.laki_laki / demografi.total_penduduk) * 100) : 0}%
            </span>
          </div>
          <div class="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-100/50">
            <span class="text-xs font-bold text-gray-500 block mb-1 uppercase tracking-wider">Rasio Perempuan</span>
            <span class="text-2xl font-extrabold text-[#006e33]">
              {demografi.total_penduduk > 0 ? Math.round((demografi.perempuan / demografi.total_penduduk) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>

      <!-- Card: Menu Akses Cepat (Quick Actions) -->
      <div class="bg-white border border-gray-200/80 rounded-3xl p-7 md:p-8 shadow-sm">
        <div class="border-b border-gray-100 pb-5 mb-6">
          <h2 class="text-xl font-extrabold text-gray-900 tracking-tight">
            Akses Cepat Pengelolaan
          </h2>
          <p class="text-sm text-gray-500 mt-1 font-medium">
            Jalur cepat menuju modul kelola data informasi desa
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          
          <a
            href="/admin/profil-desa"
            class="p-4.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/80 border border-gray-200/60 hover:border-emerald-300 flex flex-col items-start gap-3 transition-all duration-200 group"
          >
            <div class="w-11 h-11 rounded-xl bg-emerald-100 text-[#006e33] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M2.25 4.5A.75.75 0 013 3.75h14.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm14.47 3.97a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <span class="font-bold text-gray-900 group-hover:text-[#006e33] block text-sm">Profil & Narasi</span>
              <span class="text-xs text-gray-500 font-medium mt-0.5 block">Sejarah, Visi, Misi</span>
            </div>
          </a>

          <a
            href="/admin/berita/tambah"
            class="p-4.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/80 border border-gray-200/60 hover:border-emerald-300 flex flex-col items-start gap-3 transition-all duration-200 group"
          >
            <div class="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <span class="font-bold text-gray-900 group-hover:text-[#006e33] block text-sm">+ Tulis Berita</span>
              <span class="text-xs text-gray-500 font-medium mt-0.5 block">Buat artikel baru</span>
            </div>
          </a>

          <a
            href="/admin/demografi"
            class="p-4.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/80 border border-gray-200/60 hover:border-emerald-300 flex flex-col items-start gap-3 transition-all duration-200 group"
          >
            <div class="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0z" />
              </svg>
            </div>
            <div>
              <span class="font-bold text-gray-900 group-hover:text-[#006e33] block text-sm">Data Demografi</span>
              <span class="text-xs text-gray-500 font-medium mt-0.5 block">Penduduk & KK</span>
            </div>
          </a>

          <a
            href="/admin/apb-desa"
            class="p-4.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/80 border border-gray-200/60 hover:border-emerald-300 flex flex-col items-start gap-3 transition-all duration-200 group"
          >
            <div class="w-11 h-11 rounded-xl bg-green-100 text-green-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <span class="font-bold text-gray-900 group-hover:text-[#006e33] block text-sm">APB Desa</span>
              <span class="text-xs text-gray-500 font-medium mt-0.5 block">Anggaran Tahun Ini</span>
            </div>
          </a>

          <a
            href="/admin/struktur-organisasi"
            class="p-4.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/80 border border-gray-200/60 hover:border-emerald-300 flex flex-col items-start gap-3 transition-all duration-200 group"
          >
            <div class="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M3 3a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H7v4h4v-3a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-3H7v3a2 2 0 01-2 2H1a2 2 0 01-2-2V3zm2 0v4h4V3H5zm10 10v4h4v-4h-4zM5 17v4h4v-4H5z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <span class="font-bold text-gray-900 group-hover:text-[#006e33] block text-sm">Struktur Organisasi</span>
              <span class="text-xs text-gray-500 font-medium mt-0.5 block">Perangkat Desa</span>
            </div>
          </a>

          <a
            href="/admin/peta"
            class="p-4.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/80 border border-gray-200/60 hover:border-emerald-300 flex flex-col items-start gap-3 transition-all duration-200 group"
          >
            <div class="w-11 h-11 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <span class="font-bold text-gray-900 group-hover:text-[#006e33] block text-sm">Peta Wilayah</span>
              <span class="text-xs text-gray-500 font-medium mt-0.5 block">Koordinat & Fasilitas</span>
            </div>
          </a>

        </div>
      </div>

    </div>

  </div>

</div>