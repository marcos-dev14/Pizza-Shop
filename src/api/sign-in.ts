// Função tipada para a requisição de signIn, isso é para manter as comunicações feitas entre o frontend e o backend tipadas

import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
}

export async function signIn({ email }: SignInBody) {
  await api.post('/authenticate', { email})
}