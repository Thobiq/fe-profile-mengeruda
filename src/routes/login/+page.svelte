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
	let infoWilayah = $state('Kabupaten Ngada, NTT');

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
					let rawNama = d.nama_desa;
					let cleanedName = rawNama.replace(/^Desa\s+/i, '');
					namaDesa = `Desa ${cleanedName}`;
				}
				if (d.kecamatan && d.kabupaten) {
					infoWilayah = `Kec. ${d.kecamatan}, Kab. ${d.kabupaten}`;
				}
				if (d.logo_url || d.logo) {
					let url = d.logo_url || (d.logo.startsWith('http') ? d.logo : `/storage/${d.logo.replace('/storage/', '')}`);
					if (!url.startsWith('http')) {
						url = `${import.meta.env.VITE_PUBLIC_BACKEND_URL}${url.startsWith('/') ? '' : '/'}${url}`;
					}
					logoUrl = url;
				}
			}
		} catch (err) {
			console.error('Gagal mengambil profil di halaman login:', err);
		}
	});

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			errorMessage = 'Email dan Kata Sandi wajib diisi.';
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
				errorMessage = res.data.message || 'Login gagal, periksa email dan kata sandi Anda.';
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
	<title>Login Admin | Pemerintah {namaDesa}</title>
	<link rel="icon" href={logoUrl} />
</svelte:head>

<div class="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#005a2b] via-[#00a651] to-[#024a22] relative overflow-hidden font-['Montserrat'] px-4 py-10">
	<!-- Subtle Ambient Glow -->
	<div class="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
	<div class="absolute -bottom-32 -right-32 w-96 h-96 bg-black/15 rounded-full blur-3xl pointer-events-none"></div>

	<!-- Background Grid Overlay -->
	<div
		class="absolute inset-0 opacity-10 pointer-events-none"
		style="background-image: radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px); background-size: 28px 28px;"
	></div>

	<!-- Login Card Container -->
	<div class="relative z-10 w-full max-w-md">
		<!-- Modern Clean White Card -->
		<div class="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-white/60">
			<!-- Logo -->
			<div class="flex justify-center mb-5">
				<img
					src={logoUrl}
					alt="Logo {namaDesa}"
					class="h-20 md:h-24 w-auto max-w-[160px] object-contain drop-shadow-sm transition-transform hover:scale-105 duration-300"
				/>
			</div>

			<!-- Title & Subtitle -->
			<div class="text-center mb-8">
				<h1 class="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
					Pemerintah {namaDesa}
				</h1>
				<p class="text-xs font-bold text-[#00a651] uppercase tracking-wider mt-1.5">
					Portal Manajemen & Administrasi Desa
				</p>
				<p class="text-xs text-gray-400 font-medium mt-0.5">
					{infoWilayah}
				</p>
			</div>

			<!-- Error / Success Alert -->
			{#if errorMessage}
				<div
					class="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-sm font-medium animate-fade-in"
				>
					<svg class="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>{errorMessage}</span>
				</div>
			{/if}

			{#if successMessage}
				<div
					class="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-[#00a651] text-sm font-bold animate-fade-in"
				>
					<svg class="w-5 h-5 text-[#00a651] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>{successMessage}</span>
				</div>
			{/if}

			<!-- Login Form -->
			<form onsubmit={handleLogin} class="space-y-5">
				<!-- Email Field -->
				<div>
					<label for="email" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
						Alamat Email
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
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
							class="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#00a651] focus:ring-4 focus:ring-[#00a651]/15 transition-all text-sm font-medium"
						/>
					</div>
				</div>

				<!-- Password Field -->
				<div>
					<label for="password" class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
						Kata Sandi
					</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
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
							class="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#00a651] focus:ring-4 focus:ring-[#00a651]/15 transition-all text-sm font-medium"
						/>
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#00a651] transition-colors"
							title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
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

				<!-- Submit Button -->
				<button
					type="submit"
					disabled={isLoading}
					class="w-full py-4 px-5 bg-[#00a651] hover:bg-[#008f45] active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-[#00a651]/25 hover:shadow-xl hover:shadow-[#00a651]/35 focus:outline-none focus:ring-4 focus:ring-[#00a651]/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 text-sm flex items-center justify-center gap-2 mt-2"
				>
					{#if isLoading}
						<svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						<span>Memverifikasi Akses...</span>
					{:else}
						<span>Masuk ke Dasbor</span>
						<svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l7-7m-7 7h18" />
						</svg>
					{/if}
				</button>
			</form>

			<!-- Footer Back Link -->
			<div class="mt-8 pt-6 border-t border-gray-100 text-center">
				<a
					href="/"
					class="text-xs font-bold text-gray-500 hover:text-[#00a651] transition-colors inline-flex items-center gap-1.5"
				>
					<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					<span>Kembali ke Website Utama</span>
				</a>
			</div>
		</div>

		<!-- Subtle Copyright Below Card -->
		<p class="text-center text-xs text-emerald-100/80 font-medium mt-6">
			&copy; {new Date().getFullYear()} Pemerintah {namaDesa}. Hak Cipta Dilindungi.
		</p>
	</div>
</div>