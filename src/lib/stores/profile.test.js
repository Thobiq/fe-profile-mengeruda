import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import { villageProfileStore, fetchVillageProfile } from './profile';
import api from '$lib/api';

vi.mock('$lib/api', () => ({
  default: {
    get: vi.fn()
  }
}));

describe('villageProfileStore', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    villageProfileStore.set({
      nama_desa: 'Desa Mengeruda',
      alamat_desa: 'Kab. Ngada, Nusa Tenggara Timur',
      logo_url: '/logo.png',
      kecamatan: 'Soa',
      kabupaten: 'Ngada',
      provinsi: 'Nusa Tenggara Timur',
      alamat: 'Mengeruda, Kec. Soa, Kabupaten Ngada, Nusa Tenggara Tim.',
      telp: '0812-3456-7890',
      email: 'pemdes@mengeruda.id',
      loaded: false
    });
  });

  it('has initial default values', () => {
    const value = get(villageProfileStore);
    expect(value.nama_desa).toBe('Desa Mengeruda');
    expect(value.loaded).toBe(false);
  });

  it('updates store on successful fetch', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: {
          nama_desa: 'Mengeruda',
          kabupaten: 'Ngada',
          provinsi: 'Nusa Tenggara Timur',
          logo_url: '/storage/logo.png',
        }
      }
    });

    await fetchVillageProfile();
    
    const value = get(villageProfileStore);
    expect(value.nama_desa).toBe('Desa Mengeruda'); // because prefix logic
    expect(value.loaded).toBe(true);
    expect(api.get).toHaveBeenCalledTimes(1);
  });
});
