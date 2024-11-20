import { defineStore } from "pinia";
export const useCandidateStore = defineStore("candidates", {
  // Estado inicial del store
  state: () => ({
    candidates: [] as any[], // Lista de candidatos
  }),

  getters: {
    filteredCandidates: (state) => (searchTerm: string) =>
      state.candidates.filter((candidate: any) =>
        candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      getCandidates: (state) => state.candidates
  },
  actions: {
    // Añadir candidatos
    addCandidates(candidate: any[]) {
      this.candidates = candidate;
    },
  },
});
