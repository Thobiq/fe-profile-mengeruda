// @ts-nocheck
/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ fetch }) {
    try {
        const response = await fetch('http://localhost:8000/api/struktur-desa');
        
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
