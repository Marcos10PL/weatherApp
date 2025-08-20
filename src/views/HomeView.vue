<script setup lang="ts">
import { mapIcons } from '@/data/icons'
import { useCurrentWeatherStore } from '@/stores/currentWeather'
import { useGeoStore } from '@/stores/geo'
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import WeatherAnimations from '@/components/home/WeatherAnimations.vue'

// store
const geo = useGeoStore()
const { selectedGeo } = storeToRefs(geo)

const currentWeather = useCurrentWeatherStore()
const { data, loading } = storeToRefs(currentWeather)
const { fetchWeather } = currentWeather

watch(selectedGeo, async (newValue) => {
  if (!newValue) return
  await fetchWeather({ lat: newValue.lat, lon: newValue.lon })
})

const weatherDescription = computed(() => {
  return data.value?.weather?.[0]?.description
    ? data.value.weather[0].description[0].toUpperCase() +
        data.value.weather[0].description.slice(1)
    : ''
})

const getLocalTime = (date: Date, cityTimezoneOffset: number) => {
  const utcTime = date.getTime() + cityTimezoneOffset * 1000
  return new Date(utcTime).toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  })
}
</script>

<template>
  <section
    v-if="data"
    class="border-t border-gray-500 w-full max-w-[40rem] mx-auto text-lg flex flex-col py-6 gap-y-4 relative"
  >
    <div class="flex items-center justify-between gap-4">
      <h2 class="flex items-center gap-2">
        <i class="pi pi-map-marker"></i>
        <span> {{ data.name }}, {{ data.sys.country }} </span>
      </h2>
      <div>
        <div class="flex items-center gap-1">
          <p>{{ getLocalTime(new Date(data.dt * 1000), data.timezone) }}</p>
          <span title="Local time of last update">
            <i class="pi pi-info-circle !text-sm ml-1 text-gray-400" />
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2">
      <div>
        <p class="text-6xl">
          <span class="temperature">{{ Math.round(data.main.temp) }}</span>
          <span class="temperature-unit">°C</span>
        </p>
        <p class="text-2xl mt-2">{{ weatherDescription }}</p>
      </div>
      <div class="mt-2 sm:mt-4">
        <WeatherAnimations :weather="mapIcons[data.weather[0].icon]" :loading="loading" />
      </div>
    </div>

    <p>Feeling: {{ Math.round(data.main.feels_like) }}°C</p>

    <!-- <div class="">
      <div class="weather-details">
        <div class="p-d-flex p-mb-2">
          <i class="pi pi-wind p-mr-2"></i>
          <span>Wiatr: {{ data.wind.speed }} m/s</span>
        </div>
        <div class="p-d-flex p-mb-2">
          <i class="pi pi-cloud p-mr-2"></i>
          <span>Wilgotność: {{ data.main.humidity }}%</span>
          <ProgressBar :value="data.main.humidity"></ProgressBar>
        </div>
        <div class="p-d-flex">
          <i class="pi pi-compass p-mr-2"></i>
          <span>Ciśnienie: {{ data.main.pressure }} hPa</span>
        </div>
      </div>
    </div> -->
  </section>
</template>
