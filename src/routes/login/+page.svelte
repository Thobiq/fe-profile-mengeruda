<script>
  const bgImages = [
    '/hero-1.jpg',
    '/hero-2.png',
  ];

  let currentIndex = $state(0);
  let showPassword = $state(false);
  let email = $state('');
  let password = $state('');

  $effect(() => {
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % bgImages.length;
    }, 5000);
    return () => clearInterval(interval);
  });

  function handleLogin(e) {
    e.preventDefault();
    console.log("Login Data:", { email, password });
  }
</script>

<svelte:head>
  <title>Login Admin - Desa Mengeruda</title>
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
  <div class="absolute inset-0 bg-black/30 z-0"></div>

  <!-- ========================================== -->
  <!-- SPLIT CARD CONTAINER -->
  <!-- ========================================== -->
  <!-- flex-col (HP) dan md:flex-row (Laptop) memastikan tampilan responsif -->
  <div class="relative z-10 w-full max-w-[900px] flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-2xl">
    
    <!-- SISI KIRI: Branding (Putih) -->
    <div class="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-12 md:p-16">
      <!-- Pastikan file logo-desa.png ada di folder static -->
      <img src="/logo-desa.png" alt="Logo Desa" class="w-40 md:w-48 h-auto object-contain mb-6" />
      <h1 class="text-4xl md:text-[42px] font-bold text-[#006430] text-center leading-tight">
        Desa<br/>Mengeruda
      </h1>
    </div>

    <!-- SISI KANAN: Form Login (Hijau) -->
    <!-- Menggunakan gradasi hijau agar tidak terlalu flat -->
    <div class="w-full md:w-1/2 bg-gradient-to-br from-[#008f45] to-[#004f25] p-10 md:p-14 flex flex-col justify-center">
      
      <h2 class="text-white text-4xl md:text-[40px] font-bold text-center mb-10 drop-shadow-sm">
        Login
      </h2>

      <form onsubmit={handleLogin} class="w-full flex flex-col gap-6">
        
        <!-- Input Email -->
        <div class="flex flex-col gap-2">
          <label class="text-white text-[15px] md:text-base font-bold drop-shadow-sm">
            Email
          </label>
          <input 
            type="email" 
            bind:value={email} 
            placeholder="Masukkan Email" 
            class="w-full bg-transparent border-[1.5px] border-white rounded-full px-6 py-3.5 text-white placeholder-white/80 outline-none focus:bg-white/10 transition-all font-sans text-base"
            required 
          />
        </div>

        <!-- Input Password -->
        <div class="flex flex-col gap-2">
          <label class="text-white text-[15px] md:text-base font-bold drop-shadow-sm">
            Password
          </label>
          <div class="relative flex items-center">
            <input 
              type={showPassword ? "text" : "password"} 
              bind:value={password} 
              placeholder="Masukkan Password" 
              class="w-full bg-transparent border-[1.5px] border-white rounded-full pl-6 pr-14 py-3.5 text-white placeholder-white/80 outline-none focus:bg-white/10 transition-all font-sans text-base"
              required 
            />
            
            <button 
              type="button" 
              onclick={() => showPassword = !showPassword} 
              class="absolute right-5 text-white hover:text-gray-200 transition-colors"
            >
              {#if showPassword}
                <!-- Ikon Eye Slash -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[22px] h-[22px]">
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                  <path d="M6.75 12c0-.619.143-1.205.396-1.728l-2.73-2.73A11.218 11.218 0 001.324 11.447a1.25 1.25 0 000 1.113c1.49 4.467 5.705 7.69 10.675 7.69 1.547 0 3.018-.313 4.354-.877l-2.784-2.784a3.75 3.75 0 01-6.818-4.59z" />
                </svg>
              {:else}
                <!-- Ikon Eye -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[22px] h-[22px]">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                </svg>
              {/if}
            </button>
          </div>
        </div>

        <!-- Link Lupa Password -->
        <div class="flex justify-end mt-[-8px]">
          <a href="#lupa" class="text-white text-[13px] md:text-[14px] font-bold hover:text-gray-200 transition-colors drop-shadow-sm">
            Lupa Password ?
          </a>
        </div>

        <!-- Tombol Login (Putih dengan Teks Hijau) -->
        <button 
          type="submit" 
          class="w-full bg-white text-[#006430] hover:bg-gray-100 font-bold text-xl py-3.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-[1.02] mt-2 tracking-wide"
        >
          Login
        </button>

      </form>
    </div>
  </div>
</div>