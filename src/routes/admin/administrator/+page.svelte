<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import api from '$lib/api';

  let activeTab = $state('users'); // 'users' or 'roles'
  let isLoading = $state(true);

  // Data lists
  let usersList = $state([]);
  let rolesList = $state([]);
  let permissionsList = $state([]);

  // --- Modals State ---
  let showUserModal = $state(false);
  let isUserEditMode = $state(false);
  let editUserId = $state(null);
  let isSubmittingUser = $state(false);

  let showRoleModal = $state(false);
  let isRoleEditMode = $state(false);
  let editRoleId = $state(null);
  let isSubmittingRole = $state(false);

  let showDeleteModal = $state(false);
  let itemToDelete = $state(null);
  let deleteType = $state(''); // 'user' or 'role'
  let isDeleting = $state(false);

  // --- User Form Data ---
  let f_user_name = $state('');
  let f_user_email = $state('');
  let f_user_password = $state('');
  let f_user_roles = $state([]);

  // --- Role Form Data ---
  let f_role_name = $state('');
  let f_role_desc = $state('');
  let f_role_permissions = $state([]);

  onMount(async () => {
      await fetchAllData();
  });

  const fetchAllData = async () => {
      isLoading = true;
      try {
          const [resUsers, resRoles, resPerms] = await Promise.all([
              api.get('/api/admin/users'),
              api.get('/api/admin/roles'),
              api.get('/api/admin/permissions')
          ]);
          if (resUsers.data.success) usersList = resUsers.data.data;
          if (resRoles.data.success) rolesList = resRoles.data.data;
          if (resPerms.data.success) permissionsList = resPerms.data.data;
      } catch (err) {
          console.error(err);
      } finally {
          isLoading = false;
      }
  };

  // --- USER HANDLERS ---
  const openAddUser = () => {
      f_user_name = '';
      f_user_email = '';
      f_user_password = '';
      f_user_roles = [];
      isUserEditMode = false;
      editUserId = null;
      showUserModal = true;
  };

  const openEditUser = (user) => {
      f_user_name = user.name;
      f_user_email = user.email;
      f_user_password = ''; // Kosongkan, hanya isi jika ingin mengubah
      f_user_roles = user.roles.map(r => r.id);
      isUserEditMode = true;
      editUserId = user.id;
      showUserModal = true;
  };

  const handleUserSubmit = async (e) => {
      e.preventDefault();
      isSubmittingUser = true;
      try {
          await api.get('/sanctum/csrf-cookie');
          const payload = {
              name: f_user_name,
              email: f_user_email,
              roles: f_user_roles
          };
          if (!isUserEditMode || f_user_password) {
              payload.password = f_user_password;
          }

          let res;
          if (isUserEditMode) {
              res = await api.put(`/api/admin/users/${editUserId}`, payload);
          } else {
              res = await api.post('/api/admin/users', payload);
          }

          if (res.data.success) {
              showUserModal = false;
              await fetchAllData();
          }
      } catch (err) {
          console.error(err);
          alert(err.response?.data?.message || 'Gagal menyimpan pengguna');
      } finally {
          isSubmittingUser = false;
      }
  };

  // --- ROLE HANDLERS ---
  const openAddRole = () => {
      f_role_name = '';
      f_role_desc = '';
      f_role_permissions = [];
      isRoleEditMode = false;
      editRoleId = null;
      showRoleModal = true;
  };

  const openEditRole = (role) => {
      f_role_name = role.name;
      f_role_desc = role.description || '';
      f_role_permissions = role.permissions.map(p => p.id);
      isRoleEditMode = true;
      editRoleId = role.id;
      showRoleModal = true;
  };

  const handleRoleSubmit = async (e) => {
      e.preventDefault();
      isSubmittingRole = true;
      try {
          await api.get('/sanctum/csrf-cookie');
          const payload = {
              name: f_role_name,
              description: f_role_desc,
              permissions: f_role_permissions
          };

          let res;
          if (isRoleEditMode) {
              res = await api.put(`/api/admin/roles/${editRoleId}`, payload);
          } else {
              res = await api.post('/api/admin/roles', payload);
          }

          if (res.data.success) {
              showRoleModal = false;
              await fetchAllData();
          }
      } catch (err) {
          console.error(err);
          alert(err.response?.data?.message || 'Gagal menyimpan peran');
      } finally {
          isSubmittingRole = false;
      }
  };

  // --- DELETE HANDLERS ---
  const confirmDelete = (item, type) => {
      itemToDelete = item;
      deleteType = type;
      showDeleteModal = true;
  };

  const executeDelete = async () => {
      isDeleting = true;
      try {
          await api.get('/sanctum/csrf-cookie');
          let endpoint = deleteType === 'user' ? `/api/admin/users/${itemToDelete.id}` : `/api/admin/roles/${itemToDelete.id}`;
          const res = await api.delete(endpoint);
          
          if (res.data.success) {
              showDeleteModal = false;
              await fetchAllData();
          }
      } catch (err) {
          console.error(err);
          alert(err.response?.data?.message || 'Gagal menghapus data');
      } finally {
          isDeleting = false;
          itemToDelete = null;
      }
  };

  // Checkbox toggle helpers
  const toggleUserRole = (roleId) => {
      if (f_user_roles.includes(roleId)) {
          f_user_roles = f_user_roles.filter(id => id !== roleId);
      } else {
          f_user_roles = [...f_user_roles, roleId];
      }
  };

  const toggleRolePermission = (permId) => {
      if (f_role_permissions.includes(permId)) {
          f_role_permissions = f_role_permissions.filter(id => id !== permId);
      } else {
          f_role_permissions = [...f_role_permissions, permId];
      }
  };
</script>

<svelte:head>
  <title>Administrator - Panel Admin</title>
</svelte:head>

<div class="max-w-[1400px] mx-auto pb-10">
  <!-- Header -->
  <div class="mb-8">
      <h2 class="text-3xl font-serif font-bold text-gray-800">Manajemen Administrator</h2>
      <p class="text-gray-500 font-serif">Kelola daftar pengguna sistem beserta peran dan hak akses mereka.</p>
  </div>

  <!-- Tabs Navigation -->
  <div class="flex gap-2 mb-6 border-b border-gray-200">
      <button 
          class="px-6 py-3 font-semibold font-serif transition-colors border-b-2 {activeTab === 'users' ? 'border-[#00a651] text-[#00a651]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
          onclick={() => activeTab = 'users'}
      >
          Pengguna
      </button>
      <button 
          class="px-6 py-3 font-semibold font-serif transition-colors border-b-2 {activeTab === 'roles' ? 'border-[#00a651] text-[#00a651]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
          onclick={() => activeTab = 'roles'}
      >
          Peran & Hak Akses
      </button>
  </div>

  <!-- Loading State -->
  {#if isLoading}
      <div class="flex justify-center items-center py-20">
          <svg class="animate-spin h-10 w-10 text-[#00a651]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
      </div>
  {:else}
      <!-- TAB: PENGGUNA -->
      {#if activeTab === 'users'}
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="p-6 flex justify-between items-center border-b border-gray-100">
                  <h3 class="font-bold text-lg font-serif">Daftar Pengguna</h3>
                  <button onclick={openAddUser} class="bg-[#00a651] hover:bg-[#008f45] text-white px-4 py-2 rounded-lg font-bold font-serif text-sm transition-colors flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                      Tambah Pengguna
                  </button>
              </div>
              <div class="overflow-x-auto">
                  <table class="w-full text-left text-sm text-gray-600">
                      <thead class="bg-gray-50 text-gray-700 font-serif border-b border-gray-100 uppercase text-xs">
                          <tr>
                              <th class="px-6 py-4">Nama</th>
                              <th class="px-6 py-4">Email</th>
                              <th class="px-6 py-4">Peran (Roles)</th>
                              <th class="px-6 py-4 text-center">Aksi</th>
                          </tr>
                      </thead>
                      <tbody>
                          {#each usersList as user}
                              <tr class="border-b border-gray-50 hover:bg-gray-50">
                                  <td class="px-6 py-4 font-semibold text-gray-800">{user.name}</td>
                                  <td class="px-6 py-4">{user.email}</td>
                                  <td class="px-6 py-4">
                                      <div class="flex flex-wrap gap-1">
                                          {#each user.roles as role}
                                              <span class="bg-[#00a651]/10 text-[#00a651] px-2.5 py-1 rounded-md text-xs font-semibold">{role.name}</span>
                                          {/each}
                                          {#if user.roles.length === 0}
                                              <span class="text-gray-400 italic text-xs">Tidak ada peran</span>
                                          {/if}
                                      </div>
                                  </td>
                                  <td class="px-6 py-4 text-center">
                                      <button onclick={() => openEditUser(user)} class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-1" title="Edit">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L5.314 19l.839-2.915c.036-.12.08-.232.13-.34l10.58-10.58z" /></svg>
                                      </button>
                                      <button onclick={() => confirmDelete(user, 'user')} class="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Hapus">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                      </button>
                                  </td>
                              </tr>
                          {/each}
                      </tbody>
                  </table>
              </div>
          </div>
      {/if}

      <!-- TAB: PERAN -->
      {#if activeTab === 'roles'}
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div class="p-6 flex justify-between items-center border-b border-gray-100">
                  <h3 class="font-bold text-lg font-serif">Daftar Peran (Roles)</h3>
                  <button onclick={openAddRole} class="bg-[#00a651] hover:bg-[#008f45] text-white px-4 py-2 rounded-lg font-bold font-serif text-sm transition-colors flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                      Tambah Peran
                  </button>
              </div>
              <div class="overflow-x-auto">
                  <table class="w-full text-left text-sm text-gray-600">
                      <thead class="bg-gray-50 text-gray-700 font-serif border-b border-gray-100 uppercase text-xs">
                          <tr>
                              <th class="px-6 py-4 w-1/4">Nama Peran</th>
                              <th class="px-6 py-4 w-1/3">Deskripsi</th>
                              <th class="px-6 py-4">Total Akses</th>
                              <th class="px-6 py-4 text-center w-32">Aksi</th>
                          </tr>
                      </thead>
                      <tbody>
                          {#each rolesList as role}
                              <tr class="border-b border-gray-50 hover:bg-gray-50">
                                  <td class="px-6 py-4 font-semibold text-gray-800">{role.name}</td>
                                  <td class="px-6 py-4">{role.description || '-'}</td>
                                  <td class="px-6 py-4">
                                      <span class="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                                          {role.permissions.length} Permissions
                                      </span>
                                  </td>
                                  <td class="px-6 py-4 text-center">
                                      <button onclick={() => openEditRole(role)} class="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-1" title="Edit">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L5.314 19l.839-2.915c.036-.12.08-.232.13-.34l10.58-10.58z" /></svg>
                                      </button>
                                      {#if role.name.toLowerCase() !== 'super admin'}
                                      <button onclick={() => confirmDelete(role, 'role')} class="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Hapus">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                      </button>
                                      {/if}
                                  </td>
                              </tr>
                          {/each}
                      </tbody>
                  </table>
              </div>
          </div>
      {/if}
  {/if}
</div>

<!-- MODAL FORM USER -->
{#if showUserModal}
  <div class="fixed inset-0 z-[100] flex justify-end" in:fade={{ duration: 200 }} out:fade={{ duration: 300 }}>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" onclick={() => showUserModal = false}></div>
      <div class="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-y-auto" in:slide={{ axis: 'x', duration: 300 }}>
          <div class="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
              <h3 class="font-serif font-bold text-xl text-gray-800">{isUserEditMode ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</h3>
              <button onclick={() => showUserModal = false} class="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
          </div>
          <form onsubmit={handleUserSubmit} class="p-6 flex-grow flex flex-col gap-5">
              <div class="flex flex-col gap-1.5">
                  <label class="font-serif font-bold text-gray-700 text-sm">Nama Lengkap <span class="text-red-500">*</span></label>
                  <input type="text" bind:value={f_user_name} required class="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a651] w-full text-sm">
              </div>
              <div class="flex flex-col gap-1.5">
                  <label class="font-serif font-bold text-gray-700 text-sm">Email <span class="text-red-500">*</span></label>
                  <input type="email" bind:value={f_user_email} required class="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a651] w-full text-sm">
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="font-serif font-bold text-gray-700 text-sm">
                    Password 
                    {#if isUserEditMode}
                    (Isi jika ingin diubah)
                    {:else}
                    <span class="text-red-500">*</span>
                    {/if}
                </label>
                <input type="password" bind:value={f_user_password} required={!isUserEditMode} class="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a651] w-full text-sm">
              </div>
              
              <div class="flex flex-col gap-2 mt-2">
                  <label class="font-serif font-bold text-gray-700 text-sm">Pilih Peran (Roles)</label>
                  <div class="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      {#each rolesList as role}
                          <label class="flex items-center gap-2 cursor-pointer group">
                              <input 
                                  type="checkbox" 
                                  checked={f_user_roles.includes(role.id)} 
                                  onchange={() => toggleUserRole(role.id)}
                                  class="w-4 h-4 text-[#00a651] rounded border-gray-300 focus:ring-[#00a651]"
                              >
                              <span class="text-sm text-gray-700 group-hover:text-gray-900">{role.name}</span>
                          </label>
                      {/each}
                  </div>
              </div>

              <div class="mt-auto pt-6">
                  <button type="submit" disabled={isSubmittingUser} class="w-full bg-[#00a651] hover:bg-[#008f45] text-white py-3.5 rounded-xl font-bold transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center">
                      {isSubmittingUser ? 'Menyimpan...' : 'Simpan Pengguna'}
                  </button>
              </div>
          </form>
      </div>
  </div>
{/if}

<!-- MODAL FORM ROLE -->
{#if showRoleModal}
  <div class="fixed inset-0 z-[100] flex justify-end" in:fade={{ duration: 200 }} out:fade={{ duration: 300 }}>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" onclick={() => showRoleModal = false}></div>
      <div class="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-y-auto" in:slide={{ axis: 'x', duration: 300 }}>
          <div class="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
              <h3 class="font-serif font-bold text-xl text-gray-800">{isRoleEditMode ? 'Edit Peran' : 'Tambah Peran Baru'}</h3>
              <button onclick={() => showRoleModal = false} class="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
          </div>
          <form onsubmit={handleRoleSubmit} class="p-6 flex-grow flex flex-col gap-5">
              <div class="flex flex-col gap-1.5">
                  <label class="font-serif font-bold text-gray-700 text-sm">Nama Peran <span class="text-red-500">*</span></label>
                  <input type="text" bind:value={f_role_name} required class="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a651] w-full text-sm">
              </div>
              <div class="flex flex-col gap-1.5">
                  <label class="font-serif font-bold text-gray-700 text-sm">Deskripsi</label>
                  <textarea bind:value={f_role_desc} rows="2" class="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00a651] w-full text-sm"></textarea>
              </div>
              
              <div class="flex flex-col gap-2 mt-2">
                  <label class="font-serif font-bold text-gray-700 text-sm">Hak Akses (Permissions)</label>
                  <div class="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 max-h-[300px] overflow-y-auto">
                      {#each permissionsList as perm}
                          <label class="flex items-start gap-3 cursor-pointer group">
                              <input 
                                  type="checkbox" 
                                  checked={f_role_permissions.includes(perm.id)} 
                                  onchange={() => toggleRolePermission(perm.id)}
                                  class="w-4 h-4 mt-0.5 text-[#00a651] rounded border-gray-300 focus:ring-[#00a651]"
                              >
                              <div class="flex flex-col">
                                  <span class="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{perm.name}</span>
                                  <span class="text-xs text-gray-500">{perm.description}</span>
                              </div>
                          </label>
                      {/each}
                  </div>
              </div>

              <div class="mt-auto pt-6">
                  <button type="submit" disabled={isSubmittingRole} class="w-full bg-[#00a651] hover:bg-[#008f45] text-white py-3.5 rounded-xl font-bold transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center">
                      {isSubmittingRole ? 'Menyimpan...' : 'Simpan Peran'}
                  </button>
              </div>
          </form>
      </div>
  </div>
{/if}

<!-- MODAL KONFIRMASI HAPUS -->
{#if showDeleteModal}
  <div class="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm" in:fade={{ duration: 200 }} out:fade={{ duration: 300 }}>
    <div class="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center text-center">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-red-500"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
      </div>
      <h3 class="text-xl font-serif font-bold text-gray-800 mb-2">Hapus Data?</h3>
      <p class="text-gray-500 text-sm mb-6">Anda akan menghapus {deleteType === 'user' ? 'pengguna' : 'peran'} <span class="font-bold text-gray-700">{itemToDelete?.name}</span>. Tindakan ini tidak dapat dibatalkan.</p>
      <div class="flex items-center gap-3 w-full">
        <button onclick={() => showDeleteModal = false} disabled={isDeleting} class="flex-1 bg-gray-100 text-gray-700 font-bold py-2.5 rounded-lg">Batal</button>
        <button onclick={executeDelete} disabled={isDeleting} class="flex-1 bg-red-500 text-white font-bold py-2.5 rounded-lg">Ya, Hapus</button>
      </div>
    </div>
  </div>
{/if}
