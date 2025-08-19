<script setup lang="ts">
import { mapIcons } from '@/data/icons'
import { useCurrentWeatherStore } from '@/stores/currentWeather'
import { useGeoStore } from '@/stores/geo'
import gsap from 'gsap'
import { storeToRefs } from 'pinia'
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import cloudSvg from '@/assets/icons/cloud.svg'
import snowFlake from '@/assets/icons/snowflake.svg'
import { useTheme } from '@/stores/theme'

// store
const geo = useGeoStore()
const { selectedGeo } = storeToRefs(geo)

const theme = useTheme()
const { isDarkMode } = storeToRefs(theme)

const currentWeather = useCurrentWeatherStore()
const { data, loading } = storeToRefs(currentWeather)
const { fetchWeather } = currentWeather

watch(selectedGeo, async (newValue) => {
  if (!newValue) return
  await fetchWeather({ lat: newValue.lat, lon: newValue.lon })
})

const route = useRoute()

const weatherIcon = computed(() => {
  return data.value?.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.value.weather[0].icon}@2x.png`
    : ''
})

const weatherDescription = computed(() => {
  return data.value?.weather?.[0]?.description
    ? data.value.weather[0].description.charAt(0).toUpperCase() +
        data.value.weather[0].description.slice(1)
    : ''
})

function getLocalTime(date: Date, cityTimezoneOffset: number): string {
  const utcTime = date.getTime() + cityTimezoneOffset * 1000
  return new Date(utcTime).toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  })
}
const animations = ref<gsap.core.Tween[]>([])

const clearAnimations = () => {
  animations.value.forEach((animation) => animation.kill())
  animations.value = []
}

const initAnimations = async () => {
  if (!data.value) return

  await nextTick()
  clearAnimations()

  // ray animation
  const rayAnimation = () => {
    const sunRays = document.querySelectorAll('.sun-ray') as NodeListOf<HTMLElement>
    let animation = null
    sunRays.forEach((ray, index) => {
      const width = 140 + 20 * index
      animation = gsap.fromTo(
        ray,
        {
          opacity: 1,
          rotate: index * -5,
          x: -45,
          y: 15 + index * 18,
          width,
        },
        {
          duration: 2,
          repeat: -1,
          opacity: 0.5,
          yoyo: true,
          width: width * 0.8,
          ease: 'sine.inOut',
        }
      )
      animations.value.push(animation)
    })
  }
  const sunAnimation = () => {
    const sunAnimation = gsap.to('.pi-sun', {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'linear',
    })
    animations.value.push(sunAnimation)
  }
  const moonAnimation = () => {
    const moon = gsap.to('.pi-moon', {
      rotation: 40,
      duration: 5,
      repeat: -1,
      ease: 'linear',
      yoyo: true,
    })
    animations.value.push(moon)
  }
  const starsAnimation = () => {
    const starsPositions = [
      { x: -110, y: 15 },
      { x: -150, y: 25 },
      { x: -140, y: 80 },
      { x: -60, y: 90 },
      { x: -100, y: 60 },
    ] as const

    let allStars = []
    const stars = document.querySelectorAll('.pi-star') as NodeListOf<HTMLElement>
    const fillStars = document.querySelectorAll('.pi-star-fill') as NodeListOf<HTMLElement>
    allStars = [...stars, ...fillStars]

    allStars.forEach((star, index) => {
      const set = gsap.set(star, starsPositions[index])
      animations.value.push(set)

      const animation = gsap.to(star, {
        rotation: 360,
        duration: 50,
        repeat: -1,
        ease: 'linear',
      })
      animations.value.push(animation)
    })
  }
  const cloudsAnimation = ({ y1, y2, size }: { y1?: number; y2?: number; size?: number }) => {
    const cloudsPositions = [
      { x: -70, y: y1 || 15 },
      { x: -15, y: y2 || 25 },
      { x: -95, y: -15 },
    ] as const

    const cloudFilled = document.querySelectorAll('.cloud-icon') as NodeListOf<HTMLElement>

    cloudFilled.forEach((cloud, index) => {
      const set = gsap.set(cloud, {
        width: size || 80,
        ...cloudsPositions[index],
      })
      animations.value.push(set)

      const animation = gsap.to(cloud, {
        repeat: -1,
        x: 15 + cloudsPositions[index].x,
        duration: 5,
        yoyo: true,
        ease: 'sine.inOut',
      })
      animations.value.push(animation)
    })
  }
  const fallAnimation = (tab: NodeListOf<Element>) => {
    const container = document.querySelector<HTMLDivElement>('.box')
    const set = gsap.set(container, {
      x: -50,
      y: 30,
    })
    animations.value.push(set)

    const positions = [-2, 4, -6, -8, 10, -2, -1] as const
    tab.forEach((drop, index) => {
      const set = gsap.set(drop, {
        x: index * -15,
        rotate: 25,
        height: 12,
      })
      animations.value.push(set)

      const animation = gsap.fromTo(
        drop,
        {
          y: 20 + positions[index],
          opacity: 0,
          duration: positions[index] * 0.2,
          ease: 'sine.inOut',
        },
        {
          opacity: 1,
          repeat: -1,
          delay: Math.abs(positions[index]) * 0.2,
        }
      )
      animations.value.push(animation)
    })
  }

  const mappedIcon = mapIcons[data.value.weather[0].icon]

  // if (true) {
  //   cloudsAnimation({
  //     y1: -25,
  //     y2: -20,
  //     size: 95,
  //   })
  //   const snowflakes = document.querySelectorAll('.snowflake')
  //   fallAnimation(snowflakes)
  // }
  // return

  if (mappedIcon === 'clearSkySun') {
    sunAnimation()
    rayAnimation()
  } else if (mappedIcon === 'clearSkyMoon') {
    moonAnimation()
    starsAnimation()
  } else if (mappedIcon === 'fewCloudsSun') {
    sunAnimation()
    rayAnimation()
    cloudsAnimation({})
  } else if (mappedIcon === 'fewCloudsMoon') {
    moonAnimation()
    starsAnimation()
    cloudsAnimation({})
  } else if (mappedIcon === 'clouds') {
    cloudsAnimation({
      y1: -10,
      y2: -20,
      size: 100,
    })
  } else if (mappedIcon === 'rain') {
    cloudsAnimation({
      y1: -25,
      y2: -20,
      size: 95,
    })

    const rainDrops = document.querySelectorAll('.rain-drop')
    fallAnimation(rainDrops)
  } else if (mappedIcon === 'thunderstorm') {
    cloudsAnimation({
      y1: -25,
      y2: -20,
      size: 95,
    })
    const rainDrops = document.querySelectorAll('.rain-drop')
    fallAnimation(rainDrops)
  } else if (mappedIcon === 'snow') {
    cloudsAnimation({
      y1: -25,
      y2: -20,
      size: 95,
    })
    const snowflakes = document.querySelectorAll('.snowflake')
    fallAnimation(snowflakes)
  } else if (mappedIcon === 'mist') {
    cloudsAnimation({
      y1: -25,
      y2: -20,
      size: 95,
    })
    const snowflakes = document.querySelectorAll('.snowflake')
    fallAnimation(snowflakes)
  }
}

watch(
  [data, loading],
  ([newData, isLoading]) => {
    if (newData && !isLoading) {
      initAnimations()
    }
  },
  { immediate: true }
)

watch(
  () => route.path,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      clearAnimations()
    }
  }
)

onUnmounted(() => {
  clearAnimations()
})

const textSun = computed(() => (isDarkMode.value ? 'text-amber-200' : 'text-amber-400'))
const sunRay = computed(() => (isDarkMode.value ? 'via-amber-200' : 'via-amber-400'))
const textMoon = computed(() => (isDarkMode.value ? 'text-blue-200' : 'text-blue-400'))
const textStar = computed(() => (isDarkMode.value ? 'text-amber-200' : 'text-amber-400'))
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
          <!-- <Avatar :image="weatherIcon" size="large" class="!h-9 !w-9" /> -->
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
        <div class="animation relative *:absolute *:will-change-transform flex justify-end">
          <!-- CLEAR SKY - SUN -->
          <template v-if="mapIcons[data.weather[0].icon] === 'clearSkySun'">
            <i :class="textSun" class="pi pi-sun !text-7xl"></i>
            <span
              v-for="i in 5"
              :key="i"
              class="sun-ray h-1 w-96 bg-gradient-to-r from-transparent to-transparent rounded-full"
              :class="sunRay"
            ></span>
          </template>

          <!-- CLEAR SKY - MOON -->
          <template v-if="mapIcons[data.weather[0].icon] === 'clearSkyMoon'">
            <i class="pi pi-moon !text-7xl" :class="textMoon"></i>
            <i v-for="i in 2" :key="i" class="pi pi-star" :class="textStar"></i>
            <i v-for="i in 3" :key="i" class="pi pi-star-fill" :class="textStar"></i>
          </template>

          <!-- FEW CLOUDS - SUN -->
          <template v-if="mapIcons[data.weather[0].icon] === 'fewCloudsSun'">
            <i
              :class="textSun"
              class="pi pi-sun !text-7xl drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            ></i>
            <span
              v-for="i in 3"
              :key="i"
              class="sun-ray h-1 w-96 bg-gradient-to-r from-transparent to-transparent rounded-full"
              :class="sunRay"
            ></span>

            <img v-for="i in 2" :key="i" :src="cloudSvg" alt="Cloud" class="cloud-icon" />
          </template>

          <!-- FEW CLOUDS - MOON -->
          <template v-if="mapIcons[data.weather[0].icon] === 'fewCloudsMoon'">
            <i class="pi pi-moon !text-7xl" :class="textMoon"></i>
            <i class="pi pi-star" :class="textStar"></i>
            <i class="pi pi-star-fill" :class="textStar"></i>

            <img v-for="i in 2" :key="i" :src="cloudSvg" alt="Cloud" class="cloud-icon" />
          </template>

          <!-- CLOUDS -->
          <template v-if="mapIcons[data.weather[0].icon] === 'clouds'">
            <img v-for="i in 2" :key="i" :src="cloudSvg" alt="Cloud" class="cloud-icon" />
          </template>

          <!-- RAIN -->
          <template v-if="mapIcons[data.weather[0].icon] === 'rain'">
            <img v-for="i in 3" :key="i" :src="cloudSvg" alt="Cloud" class="cloud-icon z-20" />
            <div class="box z-10">
              <span
                v-for="i in 7"
                :key="i"
                class="h-12 w-0.5 bg-blue-400 rain-drop absolute"
              ></span>
            </div>
          </template>

          <!-- SNOW -->
          <template v-if="mapIcons[data.weather[0].icon] === 'snow'">
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
        </div>
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
