<script>
  import { env } from '$env/dynamic/public';
</script>

{#if env.PUBLIC_APP_ENV === 'development'}
  <div class="w-full flex justify-center pb-4 pt-2 px-6 bg-transparent">
    <div class="w-full max-w-[1500px] flex items-center bg-[#dcf3e2]/85 backdrop-blur-md border-[1.5px] border-[#00a651]/50 rounded-full px-6 md:px-8 py-3 md:py-3.5 gap-4 md:gap-5">
      
      <!-- Icon Triangle Solid -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 md:w-11 md:h-11 text-[#00a651] shrink-0">
        <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
      </svg>
      
      <!-- Text -->
      <div class="flex flex-col justify-center">
        <h3 class="font-serif font-bold text-[#006430] text-[17px] md:text-[20px] leading-tight mb-0.5">
          Under Development
        </h3>
        <p class="font-serif text-[#006430] text-[14px] md:text-[16px] leading-snug">
          Website ini sedang dalam pengembangan, data yang tertera merupakan data dummy/contoh
        </p>
      </div>
      
    </div>
  </div>
{/if}
