import type { CurrentWeatherData, UnitsParam } from '@/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_API_KEY
const CURRENT_WEATHER_API_URL = import.meta.env.VITE_CURRENT_WEATHER_API_URL
const METRIC: UnitsParam = 'metric'

export const useCurrentWeatherStore = defineStore('currentWeather', () => {
  const data = ref<CurrentWeatherData | null>(null)
  const loading = ref(false)
  const error = ref(false)

  const fetchWeather = async ({ lat, lon }: { lat: number; lon: number }) => {
    loading.value = true
    error.value = false
    data.value = null

    try {
      const res = await axios.get(
        `${CURRENT_WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${METRIC}`
      )
      data.value = res.data
    } catch (err) {
      console.log(err)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchWeather }
})
