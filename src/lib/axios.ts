import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true, // Fazendo com que os cookies do frontend seja enviados automaticamente para o backend
})