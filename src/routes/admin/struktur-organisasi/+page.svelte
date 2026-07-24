<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import api from '$lib/api';
  
  // D3
  import { OrgChart } from 'd3-org-chart';

  let perangkatList = $state([]);
  let isLoading = $state(true);
  
  // Chart state
  let chartContainer = $state(null);
  let chart = null;

  // Form Modal States
  let showFormModal = $state(false);
  let isEditMode = $state(false);
  let editId = $state(null);
  let isSubmitting = $state(false);
  
  // Form Data
  let f_nama = $state('');
  let f_jabatan = $state('');
  let f_parent_id = $state('');
  let f_urutan = $state(0);
  let f_fotoFile = $state(null);
  let f_currentFotoUrl = $state(null);
  let f_fotoPreview = $state(null);

  // Delete Modal States
  let showDeleteModal = $state(false);
  let itemToDelete = $state(null);
  let isDeleting = $state(false);

  // Fungsi Global untuk menjembatani D3 HTML dengan Svelte State
  onMount(() => {
    window.adminOrgEdit = (id) => {
      openEditModal(id);
    };
    window.adminOrgAddSub = (parentId) => {
      openAddModal(parentId);
    };
    window.adminOrgDelete = (id) => {
      const item = perangkatList.find(p => p.id == id);
      if(item) confirmDelete(item);
    };

    fetchPerangkatList();
  });

  onDestroy(() => {
    delete window.adminOrgEdit;
    delete window.adminOrgAddSub;
    delete window.adminOrgDelete;
  });

  const fetchPerangkatList = async () => {
    isLoading = true;
    try {
      const res = await api.get('/api/struktur-desa');
      if (res.data.success) {
        perangkatList = res.data.data;
        renderChart();
      }
    } catch (err) {
      console.error(err);
    } finally {
      isLoading = false;
    }
  };

  const renderChart = () => {
    if (!chartContainer || perangkatList.length === 0) return;

    const chartData = perangkatList.map(p => ({
        id: p.id.toString(),
        parentId: p.parent_id ? p.parent_id.toString() : "",
        name: p.nama,
        positionName: p.jabatan,
        imageUrl: p.foto ? `http://localhost:8000/storage/${p.foto}` : '/user-placeholder.png'
    }));

    if (!chart) {
      chart = new OrgChart().container(chartContainer);
    }

    chart
      .data(chartData)
      .nodeWidth((d) => 280)
      .initialZoom(0.7)
      .nodeHeight((d) => 160)
      .childrenMargin((d) => 40)
      .compactMarginBetween((d) => 15)
      .compactMarginPair((d) => 80)
      .nodeContent(function(d) {
          const color = '#00a651'; 
          return `
              <div style="font-family: 'Inter', sans-serif; background-color: white; position: absolute; margin-top: -1px; margin-left: -1px; width: ${d.width}px; height: ${d.height}px; border-radius: 12px; border: 1px solid #E4E4E7; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column;">
                  <div style="background-color: ${color}; height: 8px; width: 100%; border-top-left-radius: 12px; border-top-right-radius: 12px; flex-shrink: 0;"></div>
                  <div style="padding: 16px; flex-grow: 1; display: flex; align-items: center; gap: 16px;">
                      <img src="${d.data.imageUrl}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid ${color};" />
                      <div>
                          <div style="font-size: 16px; font-weight: bold; color: #18181B; margin-bottom: 4px;">${d.data.name}</div>
                          <div style="font-size: 12px; font-weight: 600; color: ${color}; background-color: #F0FDF4; padding: 4px 8px; border-radius: 9999px; display: inline-block;">${d.data.positionName}</div>
                      </div>
                  </div>
                  <!-- Admin Actions -->
                  <div style="border-top: 1px solid #F4F4F5; padding: 10px; display: flex; justify-content: space-between; align-items: center; background-color: #FAFAFA; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
                      <button onclick="window.adminOrgEdit(${d.data.id})" style="color: #3B82F6; font-size: 13px; font-weight: 600; cursor: pointer; border: none; background: none; display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px;" onmouseover="this.style.backgroundColor='#EFF6FF'" onmouseout="this.style.backgroundColor='transparent'">
                          ✏️ Edit
                      </button>
                      <button onclick="window.adminOrgAddSub(${d.data.id})" style="color: #10B981; font-size: 13px; font-weight: 600; cursor: pointer; border: none; background: none; display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px;" onmouseover="this.style.backgroundColor='#ECFDF5'" onmouseout="this.style.backgroundColor='transparent'">
                          ➕ Bawahan
                      </button>
                      <button onclick="window.adminOrgDelete(${d.data.id})" style="color: #EF4444; font-size: 13px; font-weight: 600; cursor: pointer; border: none; background: none; display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px;" onmouseover="this.style.backgroundColor='#FEF2F2'" onmouseout="this.style.backgroundColor='transparent'">
                          🗑️ Hapus
                      </button>
                  </div>
              </div>
          `;
      })
      .render();
      
    chart.expandAll();
    setTimeout(() => chart.fit(), 200);

    // Mencegah zoom scroll secara tidak sengaja kecuali menekan tombol Ctrl
    if (chartContainer) {
      chartContainer.addEventListener('wheel', (e) => {
        if (!e.ctrlKey) {
          // Hentikan event agar tidak ditangkap oleh d3-zoom, sehingga halaman bisa di-scroll
          e.stopImmediatePropagation();
        }
      }, { capture: true });
    }
  };

  // Modal Controllers
  const resetForm = () => {
    f_nama = '';
    f_jabatan = '';
    f_parent_id = '';
    f_urutan = 0;
    f_fotoFile = null;
    f_fotoPreview = null;
    f_currentFotoUrl = null;
  };

  const openAddModal = (parentId = '') => {
    resetForm();
    isEditMode = false;
    editId = null;
    f_parent_id = parentId;
    showFormModal = true;
  };

  const openEditModal = (id) => {
    resetForm();
    isEditMode = true;
    editId = id;
    const currentData = perangkatList.find(p => p.id == id);
    if (currentData) {
      f_nama = currentData.nama;
      f_jabatan = currentData.jabatan;
      f_parent_id = currentData.parent_id || '';
      f_urutan = currentData.urutan;
      if (currentData.foto) {
        f_currentFotoUrl = `http://localhost:8000/storage/${currentData.foto}`;
      }
      showFormModal = true;
    }
  };

  const closeFormModal = () => {
    showFormModal = false;
  };

  // Form Handling
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      f_fotoFile = file;
      f_fotoPreview = URL.createObjectURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!f_nama || !f_jabatan) {
      alert('Nama dan Jabatan wajib diisi!');
      return;
    }

    if (isEditMode && f_parent_id == editId) {
      alert('Seseorang tidak dapat menjadi atasan untuk dirinya sendiri!');
      return;
    }

    isSubmitting = true;
    try {
      const formData = new FormData();
      formData.append('nama', f_nama);
      formData.append('jabatan', f_jabatan);
      formData.append('urutan', f_urutan);
      if (f_parent_id) formData.append('parent_id', f_parent_id);
      if (f_fotoFile) formData.append('foto', f_fotoFile);

      await api.get('/sanctum/csrf-cookie'); // pastikan csrf token fresh
      let res;
      if (isEditMode) {
        res = await api.post(`/api/struktur-desa/${editId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
      } else {
        res = await api.post('/api/struktur-desa', formData, { headers: { 'Content-Type': 'multipart/form-data' }});
      }

      if (res.data.success) {
        closeFormModal();
        await fetchPerangkatList(); // Refresh data and redraw chart
      } else {
        alert(res.data.message || 'Gagal menyimpan data.');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Terjadi kesalahan pada server.');
    } finally {
      isSubmitting = false;
    }
  };

  // Delete Handling
  const confirmDelete = (item) => {
    itemToDelete = item;
    showDeleteModal = true;
  };

  const executeDelete = async () => {
    if (!itemToDelete) return;
    isDeleting = true;
    try {
      await api.get('/sanctum/csrf-cookie');
      const res = await api.delete(`/api/struktur-desa/${itemToDelete.id}`);
      
      if (res.data.success) {
        showDeleteModal = false;
        await fetchPerangkatList(); // Refresh data
      } else {
        alert(res.data.message || 'Gagal menghapus data.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan pada server saat menghapus data.');
    } finally {
      isDeleting = false;
      itemToDelete = null;
    }
  };
</script>

<svelte:head>
  <title>Admin - Struktur Organisasi Desa</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="max-w-[1400px] mx-auto pb-10 h-full flex flex-col">
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 shrink-0">
    <div>
      <h2 class="text-3xl font-serif font-bold text-gray-800">Struktur Organisasi</h2>
      <p class="text-gray-500 font-serif">Klik tombol pada setiap profil di bagan untuk mengedit atau menambah bawahan secara langsung.</p>
    </div>
    <div>
      <button onclick={() => openAddModal('')} class="bg-[#00a651] hover:bg-[#008f45] text-white px-5 py-2.5 rounded-xl font-bold font-serif transition-colors shadow-sm flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        Tambah Data Baru
      </button>
    </div>
  </div>

  <!-- Chart Container -->
  <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex-grow min-h-[600px] relative">
    {#if isLoading}
        <div class="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <svg class="animate-spin h-8 w-8 text-[#00a651]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
    {/if}

    {#if perangkatList.length === 0 && !isLoading}
        <div class="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mb-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <p class="text-lg font-medium font-serif">Belum ada data struktur. Silakan tambah data baru.</p>
        </div>
    {/if}

    <!-- Tempat D3 Org Chart -->
    <div bind:this={chartContainer} class="w-full h-full bg-slate-50 cursor-grab active:cursor-grabbing"></div>

    <!-- Kontrol Zoom -->
    {#if perangkatList.length > 0}
    <div class="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
        <button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-[#00a651]" onclick={() => chart && chart.zoomIn()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
        </button>
        <button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-[#00a651]" onclick={() => chart && chart.zoomOut()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" /></svg>
        </button>
        <button class="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-[#00a651]" onclick={() => chart && chart.fit()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
        </button>
    </div>
    {/if}
  </div>
</div>

<!-- Slide-over Modal Form -->
{#if showFormModal}
  <div class="fixed inset-0 z-[100] flex justify-end" in:fade={{ duration: 200 }} out:fade={{ duration: 300 }}>
    <!-- Backdrop -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" onclick={closeFormModal}></div>

    <!-- Panel -->
    <div class="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-y-auto" in:slide={{ axis: 'x', duration: 300 }}>
        <div class="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
            <h3 class="font-serif font-bold text-xl text-gray-800">{isEditMode ? 'Edit Profil' : 'Tambah Perangkat Desa'}</h3>
            <button onclick={closeFormModal} class="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>

        <form onsubmit={handleFormSubmit} class="p-6 flex-grow flex flex-col gap-5">
            <!-- Foto -->
            <div class="flex flex-col items-center gap-4">
                <div class="relative w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 shrink-0">
                    {#if f_fotoPreview}
                        <img src={f_fotoPreview} alt="Preview" class="w-full h-full object-cover" />
                    {:else if f_currentFotoUrl}
                        <img src={f_currentFotoUrl} alt="Current" class="w-full h-full object-cover" />
                    {:else}
                        <div class="w-full h-full flex items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                        </div>
                    {/if}
                </div>
                <input 
                    type="file" 
                    accept="image/*"
                    onchange={handleFileChange}
                    class="text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:font-semibold file:bg-[#00a651]/10 file:text-[#00a651] hover:file:bg-[#00a651]/20 cursor-pointer"
                />
            </div>

            <!-- Inputs -->
            <div class="flex flex-col gap-1.5">
                <label class="font-serif font-bold text-gray-700 text-sm">Nama Lengkap <span class="text-red-500">*</span></label>
                <input type="text" bind:value={f_nama} required placeholder="Contoh: Bpk. Budi" class="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a651] w-full text-sm">
            </div>

            <div class="flex flex-col gap-1.5">
                <label class="font-serif font-bold text-gray-700 text-sm">Jabatan <span class="text-red-500">*</span></label>
                <input type="text" bind:value={f_jabatan} required placeholder="Contoh: Kepala Desa" class="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a651] w-full text-sm">
            </div>

            <div class="flex flex-col gap-1.5 p-4 bg-[#00a651]/5 rounded-xl border border-[#00a651]/20 mt-2">
                <label class="font-serif font-bold text-gray-700 text-sm">Melapor Ke (Atasan)</label>
                <select bind:value={f_parent_id} class="px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a651] w-full text-sm">
                    <option value="">- Posisi Tertinggi (Tanpa Atasan) -</option>
                    {#each perangkatList as p}
                        {#if !isEditMode || p.id != editId}
                            <option value={p.id}>{p.nama} - {p.jabatan}</option>
                        {/if}
                    {/each}
                </select>
            </div>

            <div class="flex flex-col gap-1.5">
                <label class="font-serif font-bold text-gray-700 text-sm">Urutan (Opsional)</label>
                <input type="number" bind:value={f_urutan} placeholder="0" class="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a651] w-full text-sm">
            </div>

            <div class="mt-auto pt-6">
                <button type="submit" disabled={isSubmitting} class="w-full bg-[#00a651] hover:bg-[#008f45] text-white py-3.5 rounded-xl font-bold transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2">
                    {#if isSubmitting}
                        Menyimpan...
                    {:else}
                        Simpan Data
                    {/if}
                </button>
            </div>
        </form>
    </div>
  </div>
{/if}

<!-- Modal Konfirmasi Hapus -->
{#if showDeleteModal}
  <div class="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm" in:fade={{ duration: 200 }} out:fade={{ duration: 300 }}>
    <div class="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center text-center">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-red-500"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
      </div>
      <h3 class="text-xl font-serif font-bold text-gray-800 mb-2">Hapus Node?</h3>
      <p class="text-gray-500 text-sm mb-6">Anda akan menghapus profil <span class="font-bold text-gray-700">{itemToDelete?.nama}</span>. Seluruh profil bawahan di bawahnya mungkin kehilangan referensi atasan.</p>
      
      <div class="flex items-center gap-3 w-full">
        <button onclick={() => showDeleteModal = false} disabled={isDeleting} class="flex-1 bg-gray-100 text-gray-700 font-bold py-2.5 rounded-lg">Batal</button>
        <button onclick={executeDelete} disabled={isDeleting} class="flex-1 bg-red-500 text-white font-bold py-2.5 rounded-lg">Ya, Hapus</button>
      </div>
    </div>
  </div>
{/if}
