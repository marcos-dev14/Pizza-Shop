import { z } from 'zod'

const envSchema = z.object({
    VITE_ENV_URL: z.string().url(),
})

export const env = envSchema.parse(import.meta.env)