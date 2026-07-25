import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000',
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
});

// Helper untuk fetch CSRF cookie Sanctum sebelum login
export const fetchCsrfCookie = async () => {
    return await api.get('/sanctum/csrf-cookie');
};

export default api;
