<script setup lang="ts">
import { links } from '@/data/links'
import { useTheme } from '@/stores/theme'
import gsap from 'gsap'
import { Button, ButtonGroup } from 'primevue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ThemeSwitch from './ThemeSwitch.vue'

const theme = useTheme()
const router = useRouter()

const className = computed(
  () => `
  ${theme.isDarkMode ? '!bg-emerald-900/50' : '!bg-emerald-400/15'}
  pointer-events-none
  `
)

const routeName = (name: string) => name[0].toUpperCase() + name.slice(1)
const goTo = (path: string) => router.push(path)

const enterAnimationNav = (el: Element, done: () => void) => {
  gsap.fromTo(
    el,
    { x: -50, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, delay: 0.3, onComplete: done }
  )
}
</script>

<template>
  <Transition appear @enter="enterAnimationNav">
    <nav class="card flex justify-center fixed bottom-16 left-1/2 !-translate-x-1/2 z-50">
      <div class="relative">
        <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 h-6 rounded-t-2xl">
          <ThemeSwitch />
        </div>
        <ButtonGroup class="border-2 border-emerald-400 rounded-full overflow-hidden">
          <Button
            v-for="link in links"
            :key="link.name"
            :label="routeName(link.name)"
            @click="goTo(link.path)"
            :icon="link.icon || undefined"
            :class="{
              [className]: link.path === $route.fullPath,
            }"
            class="!py-1 !w-full"
            raised
            text
          />
        </ButtonGroup>
      </div>
    </nav>
  </Transition>
</template>
