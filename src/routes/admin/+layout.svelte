<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import api from '$lib/api';
  import { villageProfileStore, fetchVillageProfile } from '$lib/stores/profile';

  let { children } = $props();

  // State untuk toggle sidebar di tampilan mobile
  let isSidebarOpen = $state(false);
  let isCheckingAuth = $state(true);
  let userPermissions = $state([]);
  let isUnauthorized = $state(false);
  let profile = $derived($villageProfileStore);
  let logoUrl = $derived(profile.logo_url);
  let namaDesa = $derived(profile.nama_desa);

  // Daftar menu sidebar
  const allMenus = [
    {
      name: 'Dashboard',
      path: '/admin',
      permissions: null,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" /></svg>`
    },
    {
      name: 'Profil Desa',
      path: '/admin/profil-desa',
      permissions: ['manage-profile'],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M2.25 4.5A.75.75 0 013 3.75h14.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm14.47 3.97a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clip-rule="evenodd" /></svg>`
    },
    // {
    //   name: 'Wisata & UMKM',
    //   path: '/admin/wisata-umkm',
    //   permissions: ['manage-news'], // fallback
    //   icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" /></svg>`
    // },
    {
      name: 'Demografi Penduduk',
      path: '/admin/demografi',
      permissions: ['manage-demographics'],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" /></svg>`
    },
    {
      name: 'APB Desa',
      path: '/admin/apb-desa',
      permissions: ['manage-apb'],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" /><path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd" /><path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" /></svg>`
    },
    {
      name: 'Peta Desa',
      path: '/admin/peta',
      permissions: ['manage-map'],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>`
    },
    {
      name: 'Berita Desa',
      path: '/admin/berita',
      permissions: ['manage-news'],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" /><path fill-rule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25z" clip-rule="evenodd" /></svg>`
    },
    {
      name: 'Galeri Desa',
      path: '/admin/galeri',
      permissions: ['manage-gallery'],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" /></svg>`
    },
    {
      name: 'Struktur Organisasi',
      path: '/admin/struktur-organisasi',
      permissions: ['manage-org-chart'],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M3 3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7v4h4v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-3H7v3a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4v-4H5a2 2 0 0 1-2-2V3Zm2 0v4h4V3H5Zm10 10v4h4v-4h-4ZM5 17v4h4v-4H5Z" clip-rule="evenodd" /></svg>`
    },
    {
      name: 'Administrator',
      path: '/admin/administrator',
      permissions: ['manage-users', 'manage-roles'],
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" /></svg>`
    }
  ];

  // Mendapatkan halaman aktif berdasarkan URL path
  let currentPath = $derived($page.url.pathname);
  
  // Filter menu berdasarkan permission
  let menus = $derived(allMenus.filter(m => {
    if (!m.permissions) return true;
    if (Array.isArray(m.permissions)) {
        return m.permissions.some(p => userPermissions.includes(p));
    }
    return userPermissions.includes(m.permissions);
  }));

  // Fungsi penamaan judul halaman di topbar secara dinamis
  let pageTitle = $derived(menus.find(m => m.path === currentPath)?.name || 'Dashboard');

  onMount(async () => {
    fetchVillageProfile();

    try {
      const response = await api.get('/api/user');
      if (response.data.success) {
        // Ekstrak list of permissions
        let perms = [];
        if (response.data.user.roles) {
          response.data.user.roles.forEach(role => {
            if (role.permissions) {
              role.permissions.forEach(p => perms.push(p.name));
            }
          });
        }
        userPermissions = [...new Set(perms)];
        isCheckingAuth = false;

        // Redirect jika user mencoba akses halaman tanpa permission
        const allowedMenu = allMenus.find(m => m.path === currentPath || currentPath.startsWith(m.path + '/'));
        
        if (allowedMenu && allowedMenu.permissions) {
            let hasAccess = false;
            if (Array.isArray(allowedMenu.permissions)) {
                hasAccess = allowedMenu.permissions.some(p => userPermissions.includes(p));
            } else {
                hasAccess = userPermissions.includes(allowedMenu.permissions);
            }
            if (!hasAccess) {
                isUnauthorized = true;
            }
        }
      } else {
        redirectToLogin();
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      redirectToLogin();
    }
  });

  const redirectToLogin = () => {
    const currentUrl = window.location.pathname + window.location.search;
    window.location.href = `/login?redirect_to=${encodeURIComponent(currentUrl)}`;
  };

  const handleLogout = async () => {
    try {
      await api.post('/api/logout');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      redirectToLogin();
    }
  };
</script>

<svelte:head>
  <link rel="icon" href={logoUrl} />
</svelte:head>

<div class="flex h-screen bg-[#f8f9fa] font-['Montserrat'] overflow-hidden">
  {#if isCheckingAuth}
    <div class="fixed inset-0 flex justify-center items-center bg-white z-[9999]">
      <svg class="animate-spin h-10 w-10 text-[#006e33]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  {/if}

  <!-- Overlay Hitam untuk HP -->
  {#if isSidebarOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      onclick={() => isSidebarOpen = false}
    ></div>
  {/if}

  <!-- SIDEBAR -->
  <!-- bg-[#006e33] menghasilkan warna hijau pekat khas panel admin di gambar -->
  <aside class={`
    fixed lg:static inset-y-0 left-0 z-50
    w-[260px] bg-[#006e33] flex flex-col text-white
    transform transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  `}>
    <!-- Logo & Title -->
    <div class="flex items-center gap-3 px-6 py-8">
      <div class="w-12 h-12 bg-white rounded-full p-1 flex items-center justify-center shrink-0 shadow-sm overflow-hidden border border-white/20">
        <img src={logoUrl} alt="Logo {namaDesa}" class="w-full h-full object-contain" />
      </div>
      <div>
        <h2 class="font-bold text-[17px] leading-tight">{namaDesa}</h2>
        <p class="text-[13px] text-white/80 font-medium">Admin Panel</p>
      </div>
    </div>

    <!-- Menu Navigasi -->
    <nav class="flex-1 px-4 space-y-1.5 overflow-y-auto mt-2">
      {#each menus as menu}
        <a 
          href={menu.path}
          class={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[15px] transition-colors
            ${currentPath === menu.path 
              ? 'bg-white text-[#006e33]' 
              : 'text-white hover:bg-white/10'
            }
          `}
          onclick={() => isSidebarOpen = false}
        >
          <span class="shrink-0">{@html menu.icon}</span>
          {menu.name}
        </a>
      {/each}
    </nav>

    <!-- Tombol Logout -->
    <div class="p-4 mb-4">
      <button onclick={handleLogout} class="flex items-center gap-3 px-4 py-3 w-full text-white hover:bg-white/10 rounded-xl font-bold text-[15px] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 rotate-180">
          <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd" />
        </svg>
        Logout
      </button>
    </div>
  </aside>

  <!-- AREA KONTEN UTAMA -->
  <div class="flex-1 flex flex-col min-w-0">
    
    <!-- HEADER -->
    <header class="h-[76px] bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 shrink-0">
      <div class="flex items-center gap-4">
        <!-- Tombol Hamburger (HP) -->
        <button 
          class="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          onclick={() => isSidebarOpen = true}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <!-- Judul Dinamis -->
        <h1 class="text-xl font-bold text-[#006e33]">{pageTitle}</h1>
      </div>

      <!-- Profil Admin -->
      <div class="flex items-center gap-3">
        <span class="font-bold text-[#006e33] hidden sm:block">Admin</span>
        <div class="w-10 h-10 bg-[#006e33] rounded-full flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </header>

    <!-- KONTEN HALAMAN -->
    <main class="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-10 relative">
      {#if isUnauthorized}
        <div class="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50 p-6 text-center">
          <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-10 h-10 text-red-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Akses Ditolak</h2>
          <p class="text-gray-500 max-w-md mx-auto mb-6">Maaf, akun Anda tidak memiliki izin untuk mengakses halaman ini. Silakan kembali ke Dashboard atau hubungi Administrator.</p>
          <a href="/admin" class="bg-[#006e33] hover:bg-[#005225] text-white px-6 py-2.5 rounded-xl font-bold transition-colors">Kembali ke Dashboard</a>
        </div>
      {:else}
        {@render children()}
      {/if}
    </main>
    
  </div>
</div>