<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { ButtonGroup } from 'primevue'
import { routes } from '@/router'
import { computed, onMounted } from 'vue'
import gsap from 'gsap'
import { useTheme } from '@/stores/theme'

const router = useRouter()
const theme = useTheme()

const title = 'Weather App'
const titleChars = title.split('')

function goTo(path: string) {
  router.push(path)
}

const iconMap: Record<string, string> = {
  home: 'pi pi-home',
}

const className = computed(
  () => `
    ${theme.isDarkMode ? '!bg-emerald-900/50' : '!bg-emerald-400/15'}
    pointer-events-none
`
)

const routeName = (name: string) => name[0].toUpperCase() + name.slice(1)
const links = routes
  .filter((route) => route.name !== undefined)
  .map((route) => ({
    ...route,
    icon: iconMap[route.name],
  }))

onMounted(() => {
  gsap.fromTo(
    'h1 span',
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
  )

  gsap.fromTo(
    'h1 i',
    { x: 120, opacity: 0, rotate: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1.5,
      rotate: 180,
      delay: titleChars.length * 0.1,
      ease: 'bounce.out',
    }
  )
})

function enterAnimationNav(el: Element, done: () => void) {
  gsap.fromTo(
    el,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, delay: 0.3, onComplete: done }
  )
}
</script>

<template>
  <header class="flex flex-col justify-center items-center py-4 gap-y-4">
    <h1 class="text-2xl font-bold flex items-center">
      <span v-for="(char, i) in titleChars" :key="i" class="inline-block">{{ char }}</span>
      <i class="ml-1 -mr-0.5 pt-1 pi pi-sun !text-lg text-yellow-500"></i>
    </h1>

    <Transition appear @enter="enterAnimationNav">
      <nav class="card flex justify-center">
        <ButtonGroup class="border-2 border-emerald-400 rounded-full overflow-hidden">
          <Button
            v-for="link in links"
            :key="link.name"
            :label="routeName(link.name)"
            @click="goTo(link.path)"
            :icon="link.icon"
            :class="{
              [className]: link.path === $route.fullPath,
            }"
            class="!py-1"
            raised
            text
          ></Button>
        </ButtonGroup>
      </nav>
    </Transition>
  </header>
</template>
