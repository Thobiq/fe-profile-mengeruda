<script>
  import { onMount } from 'svelte';
  import { villageProfileStore, fetchVillageProfile } from '$lib/stores/profile';

  // State reaktif dengan Svelte 5 Runes
  let profile = $derived($villageProfileStore);

  onMount(() => {
    fetchVillageProfile();
  });

  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-gradient-to-b from-[#0a2e1d] to-[#061d12] text-white font-serif border-t border-emerald-900/60 relative overflow-hidden">
  <!-- Elemen Dekoratif Cahaya -->
  <div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
  <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

  <!-- Container Utama Footer -->
  <div class="max-w-[1500px] mx-auto px-6 lg:px-12 pt-16 pb-12 relative z-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
      
      <!-- KOLOM 1: Logo & Identitas Desa (Span 4) -->
      <div class="lg:col-span-4 flex flex-col space-y-5">
        <a href="/" class="flex items-center gap-4 group">
          <div class="w-16 h-16 rounded-2xl bg-white/95 p-1.5 flex items-center justify-center shadow-lg border border-amber-400/30 group-hover:scale-105 transition-transform duration-300 shrink-0">
            <img src={profile.logo_url} alt="Logo Desa {profile.nama_desa}" class="w-full h-full object-contain" />
          </div>
          <div>
            <span class="text-xs font-sans tracking-widest uppercase text-amber-400 font-bold block">Pemerintah Desa</span>
            <h2 class="text-2xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
              Desa {profile.nama_desa}
            </h2>
            <p class="text-sm text-white mt-0.5">
              Kec. {profile.kecamatan}, Kab. {profile.kabupaten}, Prov. {profile.provinsi}
            </p>
          </div>
        </a>
        <p class="text-white text-sm leading-relaxed font-sans pr-4">
          Portal Informasi dan Pelayanan Publik Resmi Pemerintah Desa {profile.nama_desa}. Mewujudkan keterbukaan informasi, pelayanan optimal, dan tata kelola desa yang transparan serta partisipatif.
        </p>
        <!-- <div class="pt-2">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-700/50 text-emerald-200 text-xs font-sans">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Provinsi {profile.provinsi}
          </span>
        </div> -->
      </div>

      <!-- KOLOM 2: Navigasi Cepat (Span 3) -->
      <div class="lg:col-span-3 flex flex-col space-y-4">
        <h3 class="text-lg font-bold text-amber-400 tracking-wide border-b border-emerald-800/80 pb-3">
          Navigasi Utama
        </h3>
        <ul class="space-y-2.5 font-sans text-sm">
          <li>
            <a href="/" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200">
              <span class="text-amber-400">›</span> Beranda Utama
            </a>
          </li>
          <li>
            <a href="e-surat.mengeruda.id" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200">
              <span class="text-amber-400">›</span> Layanan Surat
            </a>
          </li>
          <li>
            <a href="/profil" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200">
              <span class="text-amber-400">›</span> Profil Desa
            </a>
          </li>
          <li>
            <a href="https://tourism.mengeruda.id/" target="_blank" rel="noopener noreferrer" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200">
              <span class="text-amber-400">›</span> Pariwisata & UMKM
            </a>
          </li>
          <li>
            <a href="/peta" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200">
              <span class="text-amber-400">›</span> Peta Desa & Batas Wilayah
            </a>
          </li>
          <li>
            <a href="/berita" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200">
              <span class="text-amber-400">›</span> Berita & Informasi Desa
            </a>
          </li>
          <li>
            <a href="/demografi" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200">
              <span class="text-amber-400">›</span> Demografi Penduduk
            </a>
          </li>
          <li>
            <a href="/apb-desa" class="text-emerald-100/80 hover:text-white hover:translate-x-1.5 inline-flex items-center gap-2 transition-all duration-200">
              <span class="text-amber-400">›</span> APB Desa & Transparansi
            </a>
          </li>
        </ul>
      </div>

      <!-- KOLOM 3: Alamat Kantor Desa (Span 3) -->
      <div class="lg:col-span-3 flex flex-col space-y-4">
        <h3 class="text-lg font-bold text-amber-400 tracking-wide border-b border-emerald-800/80 pb-3">
          Alamat Kantor Desa
        </h3>
        <div class="flex items-start gap-3 text-sm font-sans text-emerald-100/85">
          <div class="w-9 h-9 rounded-xl bg-emerald-800/60 border border-emerald-700/50 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <div class="leading-relaxed">
            <span class="font-bold text-white block mb-0.5">Kantor Desa {profile.nama_desa}</span>
            <p>{profile.alamat}</p>
          </div>
        </div>
        <div class="pt-2">
          <a
            href="https://maps.app.goo.gl/2FKPwhr54yxaQDq28"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-xs font-sans font-bold text-amber-400 hover:text-amber-300 bg-emerald-900/60 hover:bg-emerald-800/60 px-4 py-2 rounded-xl border border-amber-500/30 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
            Buka di Google Maps
          </a>
        </div>
      </div>

      <!-- KOLOM 4: Kontak & Layanan (Span 2) -->
      <div class="lg:col-span-2 flex flex-col space-y-4">
        <h3 class="text-lg font-bold text-amber-400 tracking-wide border-b border-emerald-800/80 pb-3">
          Kontak Desa
        </h3>
        <div class="space-y-4 font-sans text-sm">
          
          <!-- Telepon / WhatsApp -->
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-xl bg-emerald-800/60 border border-emerald-700/50 flex items-center justify-center shrink-0 text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <div>
              <span class="text-xs text-emerald-300 block font-semibold">No. Telepon / WA</span>
              <a href="tel:{profile.telp}" class="text-white hover:text-amber-400 font-bold transition-colors">
                {profile.telp}
              </a>
            </div>
          </div>

          <!-- Email -->
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-xl bg-emerald-800/60 border border-emerald-700/50 flex items-center justify-center shrink-0 text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div class="min-w-0">
              <span class="text-xs text-emerald-300 block font-semibold">Email Resmi</span>
              <a href="mailto:{profile.email}" class="text-white hover:text-amber-400 font-bold transition-colors truncate block">
                {profile.email}
              </a>
            </div>
          </div>

        </div>
      </div>

    </div>

    <!-- Garis Pemisah & Copyright -->
    <div class="mt-14 pt-8 border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-emerald-200/70">
      <p>
        © {currentYear} Pemerintah Desa {profile.nama_desa}, Kab. {profile.kabupaten}, NTT. All Rights Reserved.
      </p>
      <div class="flex items-center gap-6">
        <a href="/login" class="hover:text-white transition-colors">Portal Admin</a>
        <span>•</span>
        <a href="/profil" class="hover:text-white transition-colors">Visi & Misi</a>
        <span>•</span>
        <a href="/peta" class="hover:text-white transition-colors">Batas Wilayah</a>
      </div>
    </div>
  </div>
</footer>
