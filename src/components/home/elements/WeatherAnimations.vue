<script setup lang="ts">
import { useTheme } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { computed, nextTick, toRefs, watch, watchEffect } from 'vue'
import { onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import cloudSvg from '@/assets/icons/cloud.svg'
import snowFlake from '@/assets/icons/snowflake.svg'
import type { Weather } from '@/types'
import { useWeatherAnimations } from '@/composables/useWeatherAnimations'

const props = defineProps<{
  weather: Weather
  tabValue: string
}>()

// store & vars
const theme = useTheme()
const { isDarkMode } = storeToRefs(theme)

const { weather, tabValue } = toRefs(props)

const route = useRoute()
const { clearAnimations, initAnimations, error } = useWeatherAnimations()

// watchers
watchEffect(async () => {
  if (weather.value && tabValue.value) {
    await nextTick()
    clearAnimations()
    initAnimations(weather.value)
  }
})

watch(() => route.path, clearAnimations)
watch(() => tabValue.value, clearAnimations)
onUnmounted(clearAnimations)

// classes
const weatherColors = computed(() => ({
  sun: isDarkMode.value ? 'text-amber-200' : 'text-amber-400',
  sunRay: isDarkMode.value ? 'via-amber-200' : 'via-amber-400',
  moon: isDarkMode.value ? 'text-blue-200' : 'text-blue-400',
  star: isDarkMode.value ? 'text-amber-200' : 'text-amber-400',
}))
</script>

<template>
  <div v-if="!error" class="animation relative *:absolute *:will-change-transform flex justify-end">
    <!-- CLEAR SKY - SUN -->
    <template v-if="weather === 'clearSkySun'">
      <i :class="weatherColors.sun" class="pi pi-sun !text-7xl"></i>
      <span
        v-for="i in 5"
        :key="i"
        class="sun-ray h-1 w-96 bg-gradient-to-r from-transparent to-transparent rounded-full"
        :class="weatherColors.sunRay"
      ></span>
    </template>

    <!-- CLEAR SKY - MOON -->
    <template v-else-if="weather === 'clearSkyMoon'">
      <i class="pi pi-moon !text-7xl" :class="weatherColors.moon"></i>
      <i v-for="i in 2" :key="i" class="pi pi-star" :class="weatherColors.star"></i>
      <i v-for="i in 3" :key="i" class="pi pi-star-fill" :class="weatherColors.star"></i>
    </template>

    <!-- FEW CLOUDS - SUN -->
    <template v-else-if="weather === 'fewCloudsSun'">
      <i
        :class="weatherColors.sun"
        class="pi pi-sun !text-7xl drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
      ></i>
      <span
        v-for="i in 3"
        :key="i"
        class="sun-ray h-1 w-96 bg-gradient-to-r from-transparent to-transparent rounded-full"
        :class="weatherColors.sunRay"
      ></span>

      <img v-for="i in 2" :key="i" :src="cloudSvg" alt="Cloud" class="cloud-icon" />
    </template>

    <!-- FEW CLOUDS - MOON -->
    <template v-else-if="weather === 'fewCloudsMoon'">
      <i class="pi pi-moon !text-7xl" :class="weatherColors.moon"></i>
      <i class="pi pi-star" :class="weatherColors.star"></i>
      <i class="pi pi-star-fill" :class="weatherColors.star"></i>

      <img v-for="i in 2" :key="i" :src="cloudSvg" alt="Cloud" class="cloud-icon" />
    </template>

    <!-- CLOUDS -->
    <template v-else-if="weather === 'clouds'">
      <img v-for="i in 2" :key="i" :src="cloudSvg" alt="Cloud" class="cloud-icon" />
    </template>

    <!-- RAIN -->
    <template v-else-if="weather === 'rain'">
      <img v-for="i in 3" :key="i" :src="cloudSvg" alt="Cloud" class="cloud-icon z-20" />
      <div class="box z-10">
        <span v-for="i in 7" :key="i" class="h-12 w-0.5 bg-blue-400 rain-drop absolute"></span>
      </div>
    </template>

    <!-- SNOW -->
    <template v-else-if="weather === 'snow'">
      <img v-for="i in 3" :key="i" :src="cloudSvg" alt="Cloud" class="cloud-icon z-20" />
      <div class="box z-10">
        <img
          v-for="i in 7"
          :key="i"
          :src="snowFlake"
          alt="Snowflake"
          class="min-w-2.5 min-h-2.5 snowflake absolute"
        />
      </div>
    </template>

    <!-- THUNDERSTORM -->
    <template v-else-if="weather === 'thunderstorm'">
      <img v-for="i in 3" :key="i" :src="cloudSvg" alt="Cloud" class="cloud-icon z-20" />
      <i
        v-for="i in 2"
        :key="i"
        class="pi pi-bolt !text-2xl text-yellow-500 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
      ></i>
      <div class="box z-10">
        <span v-for="i in 7" :key="i" class="h-12 w-0.5 bg-blue-400 rain-drop absolute"></span>
      </div>
    </template>

    <!-- MIST -->
    <template v-else-if="weather === 'mist'">
      <img :src="cloudSvg" alt="Cloud" class="cloud-icon z-20" />
      <div class="*:absolute *:rounded-full flex justify-center mist">
        <span class="h-0.5 w-12 bg-gray-800 mist-stick"></span>
        <span class="h-0.5 w-9 bg-gray-500 mist-stick"></span>
        <span class="h-0.5 w-14 bg-gray-400/50 mist-stick"></span>
        <span class="h-0.5 w-12 bg-gray-800 mist-stick"></span>
        <span class="h-0.5 w-10 bg-gray-500 mist-stick"></span>
      </div>
    </template>
  </div>
</template>
