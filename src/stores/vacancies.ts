import { defineStore } from 'pinia';

export const useVacancyStore = defineStore('vacancy', {
  state: () => ({
    vacanciesStates: [] ,
  }),
  actions: {
    // async fetchVacancies() {
    //   // Simulación de llamada API
    //   const data = await fetch('/api/vacancies').then((res) => res.json());
    //   this.vacancies = data;
    // },
    addVacancy(vacancy: any) {
      this.vacanciesStates = vacancy;
    },
  },
});
