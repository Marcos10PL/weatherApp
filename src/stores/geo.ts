import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_API_KEY
const GEO_API_URL = import.meta.env.VITE_GEO_API_URL

export const useGeoStore = defineStore('geo', () => {
  const data = ref<WeatherGeoData[] | null>(null)
  const loading = ref(false)
  const error = ref(false)

  const fetchGeo = async (city: string) => {
    loading.value = true
    error.value = false
    data.value = null

    try {
      const res = await axios.get(
        `${GEO_API_URL}?q=${city}&limit=${10}&appid=${API_KEY}&lang=pl`
      )
      data.value = res.data
    } catch (err) {
      console.log(err)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchGeo }
})
