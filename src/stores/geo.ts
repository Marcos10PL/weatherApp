import type { GeoData } from '@/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_API_KEY
const GEO_API_URL = import.meta.env.VITE_GEO_API_URL

export const useGeoStore = defineStore('geo', () => {
  const data = ref<GeoData[]>([])
  const loading = ref(false)
  const error = ref(false)

  const selectedGeo = ref<GeoData | null>(null)
  const setSelectedGeo = (geo: GeoData) => {
    selectedGeo.value = geo
  }

  const fetchGeo = async (city: string, limit: number = 10) => {
    if (!city) return []

    loading.value = true
    error.value = false
    data.value = []

    try {
      const res = await axios.get(
        `${GEO_API_URL}?q=${city}&limit=${limit}&appid=${API_KEY}&lang=en`
      )
      data.value = res.data
    } catch (err) {
      console.log(err)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchGeo, selectedGeo, setSelectedGeo }
})
