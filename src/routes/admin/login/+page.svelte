<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import api, { fetchCsrfCookie } from '$lib/api';

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let isLoading = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');
	let redirectTo = $state('/admin');
	let logoUrl = $state('/logo.png');
	let namaDesa = $state('Desa Mengeruda');

	onMount(async () => {
		const redirectParam = $page.url.searchParams.get('redirect_to');
		if (redirectParam && redirectParam.startsWith('/admin')) {
			redirectTo = redirectParam;
		}
		try {
			const res = await api.get('/api/village-profile');
			const d = res.data?.data || res.data;
			if (d) {
				if (d.nama_desa) {
					namaDesa = `Desa ${d.nama_desa}`;
				}
				if (d.logo_url) {
					let url = d.logo_url;
					if (!url.startsWith('http')) {
						url = `${import.meta.env.VITE_PUBLIC_BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url}`;
					}
					logoUrl = url;
				}
			}
		} catch (err) {
			console.error('Gagal mengambil profil di admin login:', err);
		}
	});

	const handleLogin = async (e) => {
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
				'Terjadi kesalahan saat terhubung ke server. Pastikan layanan berjalan.';
			isLoading = false;
		}
	};
</script>

<svelte:head>
	<title>Login Dasbor Admin | Profil Desa Mengeruda</title>
</svelte:head>

<div class="min-h-screen w-full flex items-center justify-center bg-slate-900 relative overflow-hidden font-sans">
	<!-- Decorative Background Gradients & Glows -->
	<div class="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
	<div class="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl pointer-events-none"></div>

	<!-- Background Pattern -->
	<div
		class="absolute inset-0 opacity-10"
		style="background-image: radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px); background-size: 24px 24px;"
	></div>

	<!-- Login Card -->
	<div class="relative z-10 w-full max-w-md mx-4">
		<!-- Card Glassmorphism -->
		<div class="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden">
			<!-- Header Banner -->
			<div class="px-8 pt-8 pb-6 border-b border-slate-700/50 text-center relative">
				<div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/95 p-2 shadow-lg shadow-emerald-500/30 mb-4 border border-slate-600/50 overflow-hidden">
					<img src={logoUrl} alt="Logo {namaDesa}" class="w-full h-full object-contain" />
				</div>
				<h1 class="text-2xl font-bold text-white tracking-tight">
					Pemerintah {namaDesa}
				</h1>
				<p class="text-sm text-slate-400 mt-1">
					Portal Manajemen Profil & Administrasi Desa
				</p>
			</div>

			<!-- Form Section -->
			<div class="p-8">
				{#if errorMessage}
					<div
						class="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-sm animate-fade-in"
					>
						<svg class="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span>{errorMessage}</span>
					</div>
				{/if}

				{#if successMessage}
					<div
						class="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-300 text-sm animate-fade-in"
					>
						<svg class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span>{successMessage}</span>
					</div>
				{/if}

				<form onsubmit={handleLogin} class="space-y-5">
					<!-- Input Email -->
					<div>
						<label for="email" class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
							Alamat Email
						</label>
						<div class="relative">
							<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
								<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
								</svg>
							</div>
							<input
								id="email"
								type="email"
								bind:value={email}
								placeholder="admin@mengeruda.id"
								required
								class="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
							/>
						</div>
					</div>

					<!-- Input Password -->
					<div>
						<label for="password" class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
							Kata Sandi
						</label>
						<div class="relative">
							<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
								<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
							</div>
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								bind:value={password}
								placeholder="••••••••"
								required
								class="w-full pl-11 pr-12 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm"
							/>
							<button
								type="button"
								onclick={() => (showPassword = !showPassword)}
								class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
								title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
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

					<!-- Tombol Login -->
					<button
						type="submit"
						disabled={isLoading}
						class="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium rounded-xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm flex items-center justify-center gap-2"
					>
						{#if isLoading}
							<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							<span>Memverifikasi...</span>
						{:else}
							<span>Masuk ke Dasbor</span>
							<svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
							</svg>
						{/if}
					</button>
				</form>

				<!-- Footer link -->
				<div class="mt-8 pt-6 border-t border-slate-700/50 text-center">
					<a href="/" class="text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
						<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
						<span>Kembali ke Website Utama</span>
					</a>
				</div>
			</div>
		</div>

		<!-- Copyright text -->
		<p class="text-center text-xs text-slate-500 mt-6">
			&copy; 2026 Pemerintah Desa Mengeruda, Kabupaten Ngada, NTT.
		</p>
	</div>
</div>
