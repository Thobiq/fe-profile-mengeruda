<script>
  let { title, children } = $props();
</script>

<div class="border border-[#00a651] rounded-[2rem] overflow-hidden mb-6 bg-white shadow-sm">
  <!-- Header -->
  <div class="bg-[#00a651] text-white text-center py-3.5 font-bold font-serif text-xl">
    {title}
  </div>
  
  <!-- Content -->
  <div class="p-5 md:p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {@render children()}
    </div>
  </div>
</div>
