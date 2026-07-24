export const ssr = false;

export async function load({ fetch }) {
    const API_URL = '/api';
    
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
