import { mockData } from '../data/mock';

export const loadMockData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(mockData.users));
  }
  if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify(mockData.patients));
  }
  if (!localStorage.getItem('incidents')) {
    localStorage.setItem('incidents', JSON.stringify(mockData.incidents));
  }
};