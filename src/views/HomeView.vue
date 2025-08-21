<script setup lang="ts">
import { useCurrentWeatherStore } from '@/stores/currentWeather'
import { useGeoStore } from '@/stores/geo'
import { storeToRefs } from 'pinia'
import { watch, computed, ref } from 'vue'
import { useWeatherForecastStore } from '@/stores/weatherForecast'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primevue'
import { format, addDays, isSameDay } from 'date-fns'
import WeatherPanel from '@/components/home/WeatherPanel.vue'
import { mappedData } from '@/utils/data'

// store
const geo = useGeoStore()
const { selectedGeo } = storeToRefs(geo)

const currentWeather = useCurrentWeatherStore()
const { data, loading } = storeToRefs(currentWeather)
const { fetchWeather } = currentWeather

const weatherForecast = useWeatherForecastStore()
const { data: forecastData, loading: forecastLoading } = storeToRefs(weatherForecast)
const { fetchWeatherForecast } = weatherForecast

const activeTab = ref('0')

watch(selectedGeo, async (newValue) => {
  if (!newValue) return
  await fetchWeather({ lat: newValue.lat, lon: newValue.lon })
  await fetchWeatherForecast({ lat: newValue.lat, lon: newValue.lon })
  activeTab.value = '0'
})

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

  const tomorrow15h = findForecastForDay(1, 15)
  const day2 = findForecastForDay(2, 15)
  const day3 = findForecastForDay(3, 15)
  const day4 = findForecastForDay(4, 15)

  const city = forecastData.value.city

  return [
    {
      title: 'Today',
      value: '0',
      content: data.value ? mappedData(data.value, city) : null,
    },
    {
      title: 'Tomorrow',
      value: '1',
      content: tomorrow15h ? mappedData(tomorrow15h, city) : null,
    },
    {
      title: format(addDays(today, 2), 'EEEE'),
      value: '2',
      content: day2 ? mappedData(day2, city) : null,
    },
    {
      title: format(addDays(today, 3), 'EEEE'),
      value: '3',
      content: day3 ? mappedData(day3, city) : null,
    },
    {
      title: format(addDays(today, 4), 'EEEE'),
      value: '4',
      content: day4 ? mappedData(day4, city) : null,
    },
  ].filter((tab) => tab.content)
})
</script>

<template>
  <Tabs v-model:value="activeTab" scrollable class="max-w-[40rem] mx-auto">
    <TabList>
      <Tab
        v-for="tab in scrollableTabs"
        :key="tab.value"
        :value="tab.value"
        class="!bg-transparent"
      >
        {{ tab.title }}
      </Tab>
    </TabList>
    <TabPanels class="!bg-transparent !px-0">
      <TabPanel v-for="tab in scrollableTabs" :key="tab.value" :value="tab.value">
        <WeatherPanel
          v-if="tab.content && activeTab === tab.value"
          :data="tab.content"
          :loading="loading || forecastLoading"
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
