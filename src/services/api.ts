import axios, { CancelTokenSource } from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.5:3333',
});

export const getToken = (): CancelTokenSource => axios.CancelToken.source();

export default api;
