import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
