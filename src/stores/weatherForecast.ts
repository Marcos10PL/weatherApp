import type { UnitsParam, WeatherForecastResponse } from '@/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_KEY = import.meta.env.VITE_API_KEY
const WEATHER_FORECAST_API_URL = import.meta.env.VITE_WEATHER_FORECAST_API_URL
const METRIC: UnitsParam = 'metric'

export const useWeatherForecastStore = defineStore('weatherForecast', () => {
  const data = ref<WeatherForecastResponse | null>(null)
  const loading = ref(false)
  const error = ref(false)

  const fetchWeatherForecast = async ({ lat, lon }: { lat: number; lon: number }) => {
    loading.value = true
    error.value = false
    data.value = null

    try {
      const res = await axios.get(
        `${WEATHER_FORECAST_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${METRIC}`
      )
      data.value = res.data
    } catch (err) {
      console.log(err)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchWeatherForecast }
})
