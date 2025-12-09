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

export const getProfessions = async (): Promise<Profession[]> => {
    const response = await api.get<Profession[]>('/professions');
    return response.data;
};

export default api;
