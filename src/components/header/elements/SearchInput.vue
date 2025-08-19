<script setup lang="ts">
import { useGeoStore } from '@/stores/geo'
import type { GeoData } from '@/types'
import gsap from 'gsap'
import { storeToRefs } from 'pinia'
import { AutoComplete, FloatLabel } from 'primevue'
import { computed, ref, useTemplateRef, watch } from 'vue'

// store
const geo = useGeoStore()
const { data, loading, error } = storeToRefs(geo)
const { fetchGeo, setSelectedGeo } = geo

// refs & vars
const search = ref('')
const isFocused = ref(false)
const inputRef = useTemplateRef('inputRef')

const label = 'Search and select a city...'
const labelLetters = label.split('').map((char) => (char === ' ' ? '\u00A0' : char))

const cites = computed((oldValue: GeoData[] | undefined) => {
  if (!loading.value) {
    return data.value || []
  } else {
    return oldValue || []
  }
})

// functions
const selectCity = async (event: { originalEvent: Event; value: GeoData }) => {
  search.value = optionLabel(event.value)
  setSelectedGeo(event.value)
  setTimeout(() => {
    inputRef.value?.focus()
  }, 10)
}

const onKeyPress = (e: KeyboardEvent) => {
  const char = e.key
  const isAllowed = /^[\p{L}0-9 \-,]$/u.test(char)
  const isCommaAtStart = char === ',' && search.value.length === 0

  if ((!isAllowed && char !== ',') || isCommaAtStart) {
    e.preventDefault()
  }
}

const optionLabel = (option: GeoData) =>
  [option.name, option.state, option.country].filter(Boolean).join(', ')

// watcher for search input
let timeout: ReturnType<typeof setTimeout>
watch(search, (newValue = '') => {
  clearTimeout(timeout)

  timeout = setTimeout(async () => {
    if (typeof newValue !== 'string') return
    if (newValue !== '') {
      const hasTwoCommas = (newValue.match(/,/g) || []).length === 2
      if (!hasTwoCommas) newValue += ','
    }
    let segments = newValue.split(',')
    if (segments.length > 3) {
      segments = segments.slice(0, 3)
    }

    newValue = segments.join(',')

    await fetchGeo(newValue)
  }, 300)
})

// animation
const enterAnimation = (el: Element, done: () => void) => {
  gsap.fromTo(
    el,
    { x: -150, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, delay: 1, ease: 'expo.out', onComplete: done }
  )
  gsap.fromTo(
    '.letters span',
    { opacity: 0 },
    { opacity: 1, duration: 0.5, delay: 1.5, stagger: 0.07, ease: 'power2.out' }
  )
}
</script>

<template>
  <Transition appear @enter="enterAnimation">
    <FloatLabel variant="on">
      <AutoComplete
        input-class="w-[calc(100vw-2rem)] sm:w-96"
        v-model="search"
        :suggestions="cites"
        :option-label="optionLabel"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @item-select="selectCity"
        @keypress="onKeyPress"
        force-selection
      >
        <template #option="{ option }: { option: GeoData }">
          <p v-if="error">Sorry, an error occurred while fetching data.</p>
          <div v-else class="flex flex-wrap items-center max-w-[calc(100vw-4rem)] sm:max-w-80">
            <div class="truncate">{{ option.name }}{{ ',&nbsp;' }}</div>
            <div class="opacity-50">
              {{ option.state ? `${option.state}, ` : ' ' }}{{ option.country }}
            </div>
          </div>
        </template>
      </AutoComplete>
      <label for="on_label" class="flex items-center">
        <i
          class="pi pi-search text-gray-400 mr-2"
          :class="{ '!hidden': isFocused || search?.length > 0 }"
        ></i>
        <p class="letters">
          <span v-for="(char, i) in labelLetters" :key="i" class="inline-block">
            {{ (isFocused || search?.length > 0) && char === '.' ? '' : char }}
          </span>
        </p>
      </label>
      <input type="text" ref="inputRef" class="absolute left-0 opacity-0 z-[-999]" />
    </FloatLabel>
  </Transition>
</template>
