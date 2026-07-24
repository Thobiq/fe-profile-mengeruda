<script>
  let { struktur = [] } = $props();

  let aparat = $derived(
    struktur && struktur.length > 0
      ? struktur.map(s => ({
          name: s.nama,
          role: s.jabatan,
          img: s.foto ? (s.foto.startsWith('http') ? s.foto : `/storage/${s.foto}`) : '/user-placeholder.png'
        }))
      : [
          { name: 'Nama Aparat Desa', role: 'Jabatan', img: '/user-placeholder.png' },
          { name: 'Nama Aparat Desa', role: 'Jabatan', img: '/user-placeholder.png' },
          { name: 'Nama Aparat Desa', role: 'Jabatan', img: '/user-placeholder.png' },
          { name: 'Nama Aparat Desa', role: 'Jabatan', img: '/user-placeholder.png' },
          { name: 'Nama Aparat Desa', role: 'Jabatan', img: '/user-placeholder.png' },
          { name: 'Nama Aparat Desa', role: 'Jabatan', img: '/user-placeholder.png' },
          { name: 'Nama Aparat Desa', role: 'Jabatan', img: '/user-placeholder.png' },
          { name: 'Nama Aparat Desa', role: 'Jabatan', img: '/user-placeholder.png' }
        ]
  );
</script>

<section class="w-full bg-[#eef8f1] py-16 md:py-20">
  <div class="max-w-[1300px] mx-auto px-6">
    
    <!-- Bagian Header (Judul dan Deskripsi) -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-[42px] font-serif font-bold text-[#005c2d] mb-4">
        Pemerintah Desa
      </h2>
      <p class="text-gray-800 font-serif text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
        Daftar aparatur pemerintah desa yang bertugas melayani masyarakat Desa Mengeruda.
      </p>
    </div>

    <!-- Grid Layout untuk Kartu Aparat Desa -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
      {#each aparat as person}
        <!-- Kartu Profil -->
        <div class="w-full max-w-[280px] bg-white rounded-2xl overflow-hidden shadow-md flex flex-col border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
          
          <!-- Foto Profil (Pastikan gambar transparan/PNG agar menyatu dengan background putih) -->
          <div class="h-[280px] w-full flex items-end justify-center pt-6 bg-white">
            <img src={person.img} alt={person.name} class="object-cover h-full drop-shadow-md" />
          </div>
          
          <!-- Informasi Profil dengan Gradasi Hijau -->
          <div class="bg-gradient-to-b from-[#00a651] to-[#005c2d] p-5 text-center flex-grow flex flex-col justify-between rounded-t-lg">
            <h3 class="text-white font-serif font-semibold text-lg md:text-xl leading-tight mb-4">
              {person.name}
            </h3>
            <div class="mt-auto">
              <!-- Badge Jabatan -->
              <span class="inline-block bg-white text-[#008f45] font-bold text-[13px] md:text-sm px-5 py-1.5 rounded-full shadow-sm">
                {person.role}
              </span>
            </div>
          </div>
          
        </div>
      {/each}
    </div>

  </div>
</section>
