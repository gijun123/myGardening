import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081', // 필요시 변경
});

// JWT 인터셉터 추가
axiosInstance.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token'); // 예: 로컬스토리지에서 JWT 가져오기
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);
