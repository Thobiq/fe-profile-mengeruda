<script>
  import { page } from '$app/stores';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Profil', path: '/profil' },
    { name: 'Pariwisata', path: 'https://tourism.mengeruda.id/' },
    { name: 'Peta', path: '/peta' },
    { 
      name: 'Informasi', 
      path: '#', // Menu utama dropdown
      dropdown: [
        { name: 'Berita', path: '/berita' },
        { name: 'Demografi', path: '/demografi' },
        { name: 'APB Desa', path: '/apb-desa' }
      ] 
    }
  ];

  import { onMount } from 'svelte';
  import { villageProfileStore, fetchVillageProfile } from '$lib/stores/profile';

  // Menggunakan Svelte 5 syntax untuk reactive state
  let isMenuOpen = $state(false);
  let profile = $derived($villageProfileStore);
  let namaDesa = $derived(profile.nama_desa);
  let alamatDesa = $derived(profile.alamat_desa);
  let logoUrl = $derived(profile.logo_url);

  onMount(() => {
    fetchVillageProfile();
  });

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<!-- Navbar -->
<nav class="bg-white w-full shadow-sm relative z-50">
  
  <!-- Wrapper untuk membatasi lebar maksimal 1500px dan menengahkan konten -->
  <div class="max-w-[1500px] mx-auto px-6 py-4 flex items-center justify-between">
    
    <!-- Bagian Kiri: Logo dan Identitas Desa -->
    <a href="/" class="flex items-center gap-3 hover:opacity-90 transition-opacity">
      <img src={logoUrl} alt="Logo {namaDesa}" class="w-12 h-14 object-contain" />
      
      <div class="flex flex-col">
        <h1 class="text-[22px] font-serif font-bold text-emerald-800 leading-tight">
          {namaDesa}
        </h1>
        <p class="text-[13px] text-gray-900 font-serif">
          {alamatDesa}
        </p>
      </div>
    </a>

    <!-- Bagian Kanan: Menu Navigasi Desktop (Hidden di layar HP) -->
    <ul class="hidden md:flex items-center gap-7">
      {#each navLinks as link}
        <li class="relative group">
          {#if link.dropdown}
            <button class="flex items-center gap-1 text-[17px] font-serif transition-colors duration-200 text-black hover:text-emerald-700 outline-none">
              {link.name}
              <!-- Icon Chevron Down -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mt-0.5 opacity-70 group-hover:rotate-180 transition-transform duration-300">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <!-- Dropdown Menu -->
            <div class="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div class="bg-white border border-gray-100 shadow-xl rounded-xl py-3 w-48 flex flex-col">
                {#each link.dropdown as dropLink}
                  <a 
                    href={dropLink.path} 
                    class="px-5 py-2.5 text-[15px] font-serif transition-colors 
                      { $page.url.pathname === dropLink.path 
                        ? 'font-bold text-emerald-800 bg-emerald-50' 
                        : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800' }"
                  >
                    {dropLink.name}
                  </a>
                {/each}
              </div>
            </div>
          {:else}
            <a 
              href={link.path}
              class="text-[17px] font-serif transition-colors duration-200 
                { $page.url.pathname === link.path 
                  ? 'font-bold text-emerald-800' 
                  : 'text-black hover:text-emerald-700' }"
            >
              {link.name}
            </a>
          {/if}
        </li>
      {/each}
    </ul>

    <!-- Tombol Hamburger Menu (Hanya muncul di layar HP) -->
    <button 
      class="md:hidden p-2 text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors"
      onclick={toggleMenu}
      aria-label="Toggle Menu"
    >
      {#if isMenuOpen}
        <!-- Ikon Silang (Close) -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      {:else}
        <!-- Ikon Hamburger (Menu) -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      {/if}
    </button>
  </div>

  <!-- Menu Navigasi Mobile (Dropdown) -->
  {#if isMenuOpen}
    <div class="md:hidden bg-white border-t border-gray-100 shadow-md absolute w-full left-0">
      <ul class="flex flex-col px-6 py-4 gap-4">
        {#each navLinks as link}
          {#if link.dropdown}
            <li class="flex flex-col gap-2">
              <span class="block text-[17px] font-serif font-bold text-black border-b border-gray-100 pb-2">
                {link.name}
              </span>
              <ul class="flex flex-col gap-2 pl-4 border-l-2 border-emerald-100">
                {#each link.dropdown as dropLink}
                  <li>
                    <a 
                      href={dropLink.path}
                      onclick={() => isMenuOpen = false} 
                      class="block py-1 text-[16px] font-serif transition-colors duration-200 
                        { $page.url.pathname === dropLink.path 
                          ? 'font-bold text-emerald-800' 
                          : 'text-gray-700 hover:text-emerald-700' }"
                    >
                      {dropLink.name}
                    </a>
                  </li>
                {/each}
              </ul>
            </li>
          {:else}
            <li>
              <a 
                href={link.path}
                onclick={() => isMenuOpen = false} 
                class="block text-[17px] font-serif transition-colors duration-200 
                  { $page.url.pathname === link.path 
                    ? 'font-bold text-emerald-800' 
                    : 'text-black hover:text-emerald-700' }"
              >
                {link.name}
              </a>
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  {/if}
</nav>