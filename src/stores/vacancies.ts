import { defineStore } from 'pinia';

export const useVacancyStore = defineStore('vacancy', {
  state: () => ({
    vacanciesStates: [] ,
  }),
  actions: {
    addVacancy(vacancy: any) {
      this.vacanciesStates = vacancy;
    },
  },
});
