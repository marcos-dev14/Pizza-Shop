import { api } from "@/lib/axios";

interface GetManagerRestaurantResponse {
  id: string
  name: string
  created_at: Date | null
  updated_at: Date | null
  description: string | null
  managerId: string | null
}
export async function getManagerRestaurant() {
  const response = await api.get<GetManagerRestaurantResponse>('/managed-restaurant')

  return response.data 
}