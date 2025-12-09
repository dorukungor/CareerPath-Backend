import axios from 'axios';
import type { Profession } from '../types/profession';

// Note: Using port 5038 as confirmed by the running backend instance
const API_URL = 'http://localhost:5038/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export interface UserProfessionDto {
    professionId: string;
    title: string;
    slug: string;
    progressPercentage: number;
    isCompleted: boolean;
    startedAt: string;
}

export const getProfessions = async (): Promise<Profession[]> => {
    const response = await api.get<Profession[]>('/professions');
    return response.data;
};

export const getProfessionById = async (id: string): Promise<Profession> => {
    const response = await api.get<Profession>(`/professions/${id}`);
    return response.data;
};

export const followProfession = async (professionId: string): Promise<void> => {
    await api.post(`/user-professions/${professionId}`);
};

export const unfollowProfession = async (professionId: string): Promise<void> => {
    await api.delete(`/user-professions/${professionId}`);
};

export const getMyProfessions = async (): Promise<UserProfessionDto[]> => {
    const response = await api.get<UserProfessionDto[]>('/user-professions');
    return response.data;
};

export const toggleStepProgress = async (stepId: string): Promise<{ isCompleted: boolean }> => {
    const response = await api.post<{ isCompleted: boolean }>(`/progress/${stepId}`);
    return response.data;
};

export default api;
