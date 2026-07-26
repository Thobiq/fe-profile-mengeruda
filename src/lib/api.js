import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.DEV ? '' : (import.meta.env.VITE_PUBLIC_BACKEND_URL || 'http://localhost:8000'),
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
});

// Tambahkan interceptor agar Axios tetap mengirimkan token CSRF lintas subdomain (Cross-Origin)
api.interceptors.request.use(config => {
    if (typeof document !== 'undefined') {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(XSRF-TOKEN)=([^;]*)'));
        if (match) {
            config.headers['X-XSRF-TOKEN'] = decodeURIComponent(match[3]);
        }
    }
    return config;
});

// Helper untuk fetch CSRF cookie Sanctum sebelum login
export const fetchCsrfCookie = async () => {
    return await api.get('/sanctum/csrf-cookie');
};

export default api;
