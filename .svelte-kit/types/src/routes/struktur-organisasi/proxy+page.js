// @ts-nocheck
/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ fetch }) {
    try {
        const response = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/struktur-desa`);
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data struktur organisasi');
        }
        
        const data = await response.json();
        
        return {
            perangkat: data.data || []
        };
    } catch (error) {
        console.error('Error fetching org chart data:', error);
        return {
            perangkat: [],
            error: error.message
        };
    }
}
