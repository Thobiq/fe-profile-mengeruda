import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.DEV ? '' : (import.meta.env.VITE_PUBLIC_BACKEND_URL || 'http://localhost:8000'),
    headers: {
        'Accept': 'application/json'
    }
});

// Interceptor untuk menyisipkan token JWT
api.interceptors.request.use(config => {
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('sso_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return config;
});

// Interceptor untuk meredirect ke SSO jika token invalid (401)
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('sso_token');
                localStorage.removeItem('sso_user');
                // Redirect ke SSO Frontend
                const ssoUrl = import.meta.env.VITE_PUBLIC_SSO_URL || 'http://localhost:5176/';
                window.location.href = ssoUrl;
            }
        }
        return Promise.reject(error);
    }
);

export default api;
