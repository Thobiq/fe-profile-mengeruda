import { env } from '$env/dynamic/public';

export const ssr = false; // Gunakan CSR sementara jika proxy Vite di perlukan, atau true jika backend tersedia penuh

export async function load({ fetch }) {
    // Menggunakan PUBLIC_API_URL dari env, fallback ke import.meta.env, atau absolute URL
    const API_URL = import.meta.env.DEV ? '/api' : (env.PUBLIC_API_URL || import.meta.env.VITE_PUBLIC_API_URL || 'https://api.mengeruda.id/api');
    
    const endpoints = [
        fetch(`${API_URL}/galleries`),
        fetch(`${API_URL}/village-profile`),
        fetch(`${API_URL}/demographic`),
        fetch(`${API_URL}/struktur-desa`),
        fetch(`${API_URL}/apb-desa`),
        fetch(`${API_URL}/news`)
    ];

    const results = await Promise.allSettled(endpoints);

    const parseRes = async (resObj) => {
        if (resObj.status === 'fulfilled' && resObj.value.ok) {
            try {
                const json = await resObj.value.json();
                return json.data || json; // Tergantung struktur response Laravel
            } catch (e) {
                return null;
            }
        }
        return null;
    };

    return {
        galleries: await parseRes(results[0]),
        villageProfile: await parseRes(results[1]),
        demographic: await parseRes(results[2]),
        strukturDesa: await parseRes(results[3]),
        apbDesa: await parseRes(results[4]),
        news: await parseRes(results[5]),
    };
}
