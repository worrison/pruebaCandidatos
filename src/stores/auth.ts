import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null as { id: string; name: string } | null,
  }),
  getters: {
  },
  actions: {
    setUser(user: { id: string; name: string }) {
      this.currentUser = user;
    },
  },
});
