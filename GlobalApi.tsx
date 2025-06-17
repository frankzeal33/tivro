// axiosClient.ts
import axios from "axios"
import { useAuthStore } from "@/store/AuthStore"

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

if (typeof window !== "undefined") {
  axiosClient.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().userInfo?.access
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export { axiosClient }
