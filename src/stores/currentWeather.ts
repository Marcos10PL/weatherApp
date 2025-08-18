import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_API_KEY
const CURRENT_WEATHER_API_URL = import.meta.env.VITE_CURRENT_WEATHER_URL

export const useCurrentWeatherStore = defineStore('currentWeather', () => {
  const data = ref<CurrentWeatherData | null>(null)
  const loading = ref(false)
  const error = ref(false)

  const fetchWeather = async (lat: string, lon: string) => {
    if (!lat || !lon) return

    loading.value = true
    error.value = false
    data.value = null

    try {
      const res = await axios.get(
        `${CURRENT_WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
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
