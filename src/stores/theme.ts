import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useTheme = defineStore('theme', () => {
  const isDarkMode = ref(true)

  const saved = localStorage.getItem('theme')

  if (saved === 'light') {
    isDarkMode.value = false
    document.documentElement.classList.toggle('dark', false)
  } else {
    isDarkMode.value = true
    document.documentElement.classList.toggle('dark', true)
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
