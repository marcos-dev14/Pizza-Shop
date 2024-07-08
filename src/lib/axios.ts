import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true, // Fazendo com que os cookies do frontend seja enviados automaticamente para o backend
})


// Pequeno rackizinho para simular o delay de uma requisição
if (env.VITE_ENABLE_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => 
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  })
}