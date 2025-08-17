import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useTheme = defineStore('theme', () => {
  const isDarkMode = ref(false)

  // inicjalizacja z localStorage
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }

  watch(isDarkMode, (val) => {
    document.documentElement.classList.toggle('dark', val)
    localStorage.setItem('theme', val ? 'dark' : 'light')
  })

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
  }

  return { isDarkMode, toggleDarkMode }
})
