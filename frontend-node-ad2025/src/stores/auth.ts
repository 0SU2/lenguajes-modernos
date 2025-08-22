// guardar las variables globales
import { defineStore } from "pinia";
import { loginRequest, registerRequest } from '@/services/authService';
import router from "@/router";
import axios from "axios";

interface StateUse {
  user: string | null,
  token: string | null,
};

export const useAuthStore = defineStore('auth', {
  state: (): StateUse => {
    return {
      user: null,
      token: localStorage.getItem('token') || null
    }
  },
  actions: {
    async login(credentials:object):Promise<void> {
      try {
        const response:any = await loginRequest(credentials);
        localStorage.setItem('token', response.token);
        router.push('/dashboard');
        return;
      } catch (error) {
        if(axios.isAxiosError(error)) {
          alert(`${error.response?.data.error}`);
        }
      }
    },
    async register(payload:any):Promise<void> {
      try {
        await registerRequest(payload);
        router.push('/');
      } catch (error) {
        if(axios.isAxiosError(error)) {
          alert(`${error.response?.data.error}`);
        }
      }
    },
    async logout():Promise<void> {
      this.token = null;
      localStorage.removeItem('token');
      router.push('/');
    }
  },
  getters: { }
})
