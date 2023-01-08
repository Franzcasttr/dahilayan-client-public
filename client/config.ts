import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { initFirebase } from '../firebase/firebaseApp';
export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENT_API_URL,
});

API.interceptors.request.use(
  async (config) => {
    initFirebase();
    const auth = getAuth();
    const token = await auth.currentUser?.getIdToken();

    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
