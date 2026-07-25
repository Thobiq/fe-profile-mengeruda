<script>
  import { onMount } from 'svelte';
  // Import tema bawaan Quill
  import 'quill/dist/quill.snow.css'; 

  // Menggunakan $bindable agar data teks bisa dikirim bolak-balik dengan halaman utama
  let { content = $bindable() } = $props();

  let editorNode;
  let quill;

  onMount(async () => {
    // Import dinamis khusus di browser (menghindari error SSR)
    const Quill = (await import('quill')).default;

    // Fungsi kustom untuk menangani upload gambar ke server
    const imageHandler = () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (file) {
          const formData = new FormData();
          formData.append('image', file);

          try {
            // Upload ke backend Laravel
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/upload-image`, {
              method: 'POST',
              body: formData
            });
            const data = await res.json();
            
            if (data.success) {
              const url = data.url;
              // Dapatkan posisi kursor saat ini di editor
              const range = quill.getSelection();
              if (range) {
                // Sisipkan gambar dengan URL dari server
                quill.insertEmbed(range.index, 'image', url);
              }
            } else {
              alert('Gagal mengupload gambar: ' + data.message);
            }
          } catch (error) {
            console.error('Error uploading image:', error);
            alert('Terjadi kesalahan saat mengupload gambar.');
          }
        }
      };
    };

    quill = new Quill(editorNode, {
      theme: 'snow',
      placeholder: 'Tuliskan deskripsi di sini...',
      modules: {
        toolbar: {
          container: [
            [{ header: [false, 1, 2, 3] }],
            ['bold', 'italic', 'underline', 'link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean']
          ],
          handlers: {
            image: imageHandler
          }
        }
      }
    });

    // Masukkan teks awal jika ada
    if (content) {
      quill.root.innerHTML = content;
    }

    // Dengarkan perubahan dan perbarui variabel content
    quill.on('text-change', () => {
      // Jika perubahan berasal dari user, update content
      const html = quill.root.innerHTML;
      if (content !== html) {
        content = html;
      }
    });
  });

  // Effect untuk menangkap perubahan 'content' dari luar (misal saat data API selesai di-load)
  $effect(() => {
    if (quill && content !== undefined) {
      if (content !== quill.root.innerHTML) {
        const currentSelection = quill.getSelection();
        quill.root.innerHTML = content;
        if (currentSelection) {
           // kembalikan kursor ke posisi semula
           setTimeout(() => quill.setSelection(currentSelection), 0);
        }
      }
    }
  });
</script>

<div class="quill-wrapper">
  <div bind:this={editorNode}></div>
</div>

<style>
  /* KUSTOMISASI TEMA QUILL AGAR SESUAI DESAIN (BORDER HIJAU) */
  :global(.quill-wrapper .ql-toolbar.ql-snow) {
    border: 1px solid #34a853 !important; /* Hijau outline */
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    border-bottom: 1px solid #34a853 !important;
    font-family: inherit;
    padding: 12px;
  }
  
  :global(.quill-wrapper .ql-container.ql-snow) {
    border: 1px solid #34a853 !important;
    border-top: none !important; /* Menghindari garis ganda dengan toolbar */
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    min-height: 140px;
    font-family: inherit;
    font-size: 15px;
  }

  /* Mengubah warna ikon toolbar saat dihover/aktif menjadi hijau */
  :global(.quill-wrapper .ql-snow .ql-picker-label.ql-active),
  :global(.quill-wrapper .ql-snow .ql-picker-label:hover),
  :global(.quill-wrapper .ql-snow .ql-picker-item.ql-selected),
  :global(.quill-wrapper .ql-snow .ql-picker-item:hover) {
    color: #006e33 !important;
  }
  :global(.quill-wrapper .ql-snow.ql-toolbar button:hover .ql-stroke),
  :global(.quill-wrapper .ql-snow .ql-toolbar button:hover .ql-stroke),
  :global(.quill-wrapper .ql-snow.ql-toolbar button.ql-active .ql-stroke),
  :global(.quill-wrapper .ql-snow .ql-toolbar button.ql-active .ql-stroke) {
    stroke: #006e33 !important;
  }
  :global(.quill-wrapper .ql-snow.ql-toolbar button:hover .ql-fill),
  :global(.quill-wrapper .ql-snow .ql-toolbar button:hover .ql-fill),
  :global(.quill-wrapper .ql-snow.ql-toolbar button.ql-active .ql-fill),
  :global(.quill-wrapper .ql-snow .ql-toolbar button.ql-active .ql-fill) {
    fill: #006e33 !important;
  }
</style>