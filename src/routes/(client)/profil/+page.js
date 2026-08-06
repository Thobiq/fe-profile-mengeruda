import { env } from '$env/dynamic/public';

export const ssr = false;

export async function load({ fetch }) {
    const API_URL = import.meta.env.DEV ? '/api' : (env.PUBLIC_API_URL || import.meta.env.VITE_PUBLIC_API_URL || 'https://api.mengeruda.id/api');
    
    const endpoints = [
        fetch(`${API_URL}/galleries`),
        fetch(`${API_URL}/village-profile`),
        fetch(`${API_URL}/struktur-desa`)
    ];

    const results = await Promise.allSettled(endpoints);

    const parseRes = async (resObj) => {
        if (resObj.status === 'fulfilled' && resObj.value.ok) {
            try {
                const json = await resObj.value.json();
                return json.data || json;
            } catch (e) {
                return null;
            }
        }
        return null;
    };

    return {
        galleries: await parseRes(results[0]),
        villageProfile: await parseRes(results[1]),
        strukturDesa: await parseRes(results[2])
    };
}
