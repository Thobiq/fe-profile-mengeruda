<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import api, { fetchCsrfCookie } from '$lib/api';

  const bgImages = [
    '/hero-1.jpg',
    '/hero-2.png',
  ];

  let currentIndex = $state(0);
  let showPassword = $state(false);
  let email = $state('');
  let password = $state('');
  let isLoading = $state(false);
  let errorMessage = $state('');
  let successMessage = $state('');
  let redirectTo = $state('/admin');

  onMount(() => {
    const redirectParam = $page.url.searchParams.get('redirect_to');
    if (redirectParam && redirectParam.startsWith('/admin')) {
      redirectTo = redirectParam;
    }
  });

  $effect(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % bgImages.length;
    }, 5000);
    return () => clearInterval(interval);
  });

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      errorMessage = 'Email dan Password wajib diisi.';
      return;
    }

    isLoading = true;
    errorMessage = '';
    successMessage = '';

    try {
      await fetchCsrfCookie();
      const res = await api.post('/api/login', { email, password });

      if (res.data.success) {
        successMessage = 'Login berhasil! Menyiapkan dasbor...';
        setTimeout(() => {
          window.location.href = redirectTo;
        }, 800);
      } else {
        errorMessage = res.data.message || 'Login gagal, periksa email dan password.';
        isLoading = false;
      }
    } catch (err) {
      console.error('Login error:', err);
      errorMessage =
        err.response?.data?.message ||
        'Terjadi kesalahan saat terhubung ke server. Pastikan backend Laravel berjalan.';
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Login Admin - Profil Desa Mengeruda</title>
</svelte:head>

<div class="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-serif py-10 px-4">
  
  <!-- Background Slider -->
  {#each bgImages as img, index}
    <div 
      class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
      style="background-image: url('{img}'); opacity: {index === currentIndex ? 1 : 0};"
    ></div>
  {/each}
  
  <!-- Overlay gelap agar background tidak terlalu mendominasi -->
  <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0"></div>

  <!-- Login Card (Glassmorphism & Gold Accent) -->
  <div class="relative z-10 w-full max-w-md bg-stone-900/80 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-8 shadow-2xl text-white">
    <!-- Header -->
    <div class="text-center mb-6">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 mb-3 shadow-lg">
        <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <h1 class="text-2xl font-bold tracking-wide text-amber-400 font-serif">
        Desa Mengeruda
      </h1>
      <p class="text-xs text-stone-300 mt-1 font-sans">
        Portal Administrasi & Profil Desa
      </p>
    </div>

    <!-- Alert Error / Success -->
    {#if errorMessage}
      <div class="mb-5 p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 font-sans">
        <svg class="w-4 h-4 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{errorMessage}</span>
      </div>
    {/if}

    {#if successMessage}
      <div class="mb-5 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 font-sans">
        <svg class="w-4 h-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{successMessage}</span>
      </div>
    {/if}

    <!-- Form -->
    <form onsubmit={handleLogin} class="space-y-4 font-sans">
      <div>
        <label for="email" class="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
          Email Administrator
        </label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          placeholder="admin@mengeruda.id"
          class="w-full px-4 py-3 bg-stone-950/70 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition text-sm"
        />
      </div>

      <div>
        <label for="password" class="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
          Kata Sandi
        </label>
        <div class="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            bind:value={password}
            required
            placeholder="••••••••"
            class="w-full pl-4 pr-11 py-3 bg-stone-950/70 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition text-sm"
          />
          <button
            type="button"
            onclick={() => (showPassword = !showPassword)}
            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-white transition"
          >
            {#if showPassword}
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            {:else}
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            {/if}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        class="w-full py-3.5 mt-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 disabled:opacity-50 transition-all text-sm flex items-center justify-center gap-2"
      >
        {#if isLoading}
          <svg class="animate-spin h-4 w-4 text-stone-950" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Memverifikasi...</span>
        {:else}
          <span>Masuk Sekarang</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        {/if}
      </button>
    </form>

    <!-- Back to Home -->
    <div class="mt-6 pt-5 border-t border-stone-800 text-center font-sans">
      <a href="/" class="text-xs text-stone-400 hover:text-amber-400 transition inline-flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Kembali ke Website Utama</span>
      </a>
    </div>
  </div>
</div>