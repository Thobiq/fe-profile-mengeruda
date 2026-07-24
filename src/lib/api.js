import axios from 'axios';

const api = axios.create({
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
