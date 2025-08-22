<script setup lang="ts">
import WeatherAnimations from './elements/WeatherAnimations.vue'
import type { WeatherInfo } from '@/types'
import { computed, toRefs } from 'vue'
import { mapIcons } from '@/data/icons'
import ProgressCard from './elements/ProgressCard.vue'
import WindCard from './elements/WindCard.vue'
import SunCard from './elements/SunCard.vue'
import InfoCard from './elements/InfoCard.vue'

const props = defineProps<{
  data: WeatherInfo
  tabValue: string
}>()

const { data, tabValue } = toRefs(props)

const weatherDescription = computed(() => {
  return data.value.description
    ? data.value.description[0].toUpperCase() + data.value.description.slice(1)
    : ''
})
</script>

<template>
  <section class="w-full text-lg flex flex-col gap-y-4 relative">
    <h2 class="flex items-center gap-2">
      <i class="pi pi-map-marker"></i>
      <span> {{ data.name }}, {{ data.country }} </span>
    </h2>

    <div class="grid grid-cols-2">
      <div>
        <p class="text-6xl">
          <span class="temperature">{{ Math.round(data.temp) }}</span>
          <span class="temperature-unit">°C</span>
        </p>
        <p class="text-2xl mt-2">{{ weatherDescription }}</p>
      </div>
      <WeatherAnimations :weather="mapIcons[data.icon]" :tab-value="tabValue" />
    </div>

    <p>Feels like {{ Math.round(data.feelsLike) }}°C</p>

    <div class="mt-4 flex flex-col gap-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <ProgressCard :value="data.humidity" icon="tear" title="Humidity" />
        <ProgressCard :value="data.clouds" icon="cloud" title="Cloudiness" />
      </div>

      <div class="flex flex-col sm:flex-row gap-4">
        <WindCard :windSpeed="data.windSpeed" :windDeg="data.windDeg" />
        <SunCard :sunrise="data.sunrise" :sunset="data.sunset" :timezone="data.timezone" />
      </div>

      <div
        class="flex flex-col sm:flex-row w-full gap-4 flex-wrap *:flex-1 *:min-w-[calc(50%-0.5rem)]"
      >
        <InfoCard :value="data.pressure" unit="hPa" title="Pressure" icon="arrowUp" />
        <InfoCard v-if="data.rain" :value="data.rain" unit="mm/h" title="Rain" icon="tear" />
        <InfoCard v-if="data.snow" :value="data.snow" unit="mm/h" title="Snow" icon="snowflake" />
      </div>
    </div>
  </section>
</template>
