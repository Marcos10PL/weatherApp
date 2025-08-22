<script setup lang="ts">
import { useCurrentWeatherStore } from '@/stores/currentWeather'
import { useGeoStore } from '@/stores/geo'
import { storeToRefs } from 'pinia'
import { watch, computed, ref, nextTick } from 'vue'
import { useWeatherForecastStore } from '@/stores/weatherForecast'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primevue'
import { format, addDays, isSameDay } from 'date-fns'
import WeatherPanel from '@/components/home/WeatherPanel.vue'
import { mappedData } from '@/utils/data'
import gsap from 'gsap'
import WeatherPanelSekeleton from '@/components/skeletons/WeatherPanelSekeleton.vue'
import StartInfo from '@/components/home/StartInfo.vue'

// store
const geo = useGeoStore()
const { selectedGeo } = storeToRefs(geo)

const currentWeather = useCurrentWeatherStore()
const { data, loading } = storeToRefs(currentWeather)
const { fetchWeather } = currentWeather

const weatherForecast = useWeatherForecastStore()
const { data: forecastData, loading: forecastLoading } = storeToRefs(weatherForecast)
const { fetchWeatherForecast } = weatherForecast

// vars
const activeTab = ref('0')
const showExamples = ref(true)
const showContent = ref(false)

// tabs
const scrollableTabs = computed(() => {
  if (!forecastData.value?.list) return []

  const today = new Date(forecastData.value.list[0].dt_txt)
  const forecasts = forecastData.value.list

  function findForecastForDay(dayOffset: number, hour: number) {
    return forecasts.find((item) => {
      const date = new Date(item.dt_txt)
      return isSameDay(date, addDays(today, dayOffset)) && date.getHours() === hour
    })
  }

  const today15h = findForecastForDay(0, 15)
  const tomorrow15h = findForecastForDay(1, 15)
  const day2 = findForecastForDay(2, 15)
  const day3 = findForecastForDay(3, 15)
  const day4 = findForecastForDay(4, 15)

  const city = forecastData.value.city

  const tabs = [
    { title: 'Now', raw: data.value },
    { title: 'Today', raw: today15h },
    { title: 'Tomorrow', raw: tomorrow15h },
    { title: format(addDays(today, 2), 'EEEE'), raw: day2 },
    { title: format(addDays(today, 3), 'EEEE'), raw: day3 },
    { title: format(addDays(today, 4), 'EEEE'), raw: day4 },
  ] as const

  return tabs
    .filter((t) => t.raw)
    .map((t, i) => ({
      title: t.title,
      value: i.toString(),
      content: mappedData(t.raw!, city),
    }))
})

// watchers
watch(selectedGeo, async (newValue, oldValue) => {
  if (!newValue || (newValue.lat === oldValue?.lat && newValue.lon === oldValue?.lon)) return

  await fetchWeather({ lat: newValue.lat, lon: newValue.lon })
  await fetchWeatherForecast({ lat: newValue.lat, lon: newValue.lon })
  activeTab.value = '0'
})

// watchers for animations
watch([loading, forecastLoading], async ([isLoading, isForecastLoading]) => {
  await nextTick()
  showExamples.value = false

  if (isLoading || isForecastLoading) {
    showContent.value = false
  } else {
    setTimeout(() => {
      showContent.value = true

      gsap.fromTo('.tabs', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' })

      gsap.to('.skeletons', {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      })
    }, 200)
  }
})

watch(activeTab, () => {
  gsap.fromTo(
    '.weather-panel',
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: 'power5.out' }
  )
})
</script>

<template>
  <StartInfo v-if="showExamples" />

  <WeatherPanelSekeleton v-else-if="!showContent" />

  <Tabs v-else v-model:value="activeTab" scrollable class="mx-auto tabs opacity-0">
    <TabList>
      <Tab
        v-for="tab in scrollableTabs"
        :key="tab?.value"
        :value="tab?.value || -1"
        class="!bg-transparent"
      >
        {{ tab?.title }}
      </Tab>
    </TabList>
    <TabPanels class="!bg-transparent !px-0 !pb-0">
      <TabPanel
        v-for="tab in scrollableTabs"
        :key="tab?.value"
        :value="tab?.value || -1"
        class="py-2 weather-panel"
      >
        <WeatherPanel
          v-if="tab?.content && activeTab === tab.value"
          :data="tab.content"
          :tab-value="activeTab"
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<style>
.p-tablist-tab-list {
  background-color: transparent !important;
  font-size: 1rem;
}
</style>
