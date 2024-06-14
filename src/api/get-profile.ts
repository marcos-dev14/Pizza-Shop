import { api } from "@/lib/axios";

interface GetProfilerResponse {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  created_at: Date | null
  updated_at: Date | null
}
export async function getProfile() {
  const response = await api.get<GetProfilerResponse>('/me')

  return response.data 
}