<script setup lang="ts">
import { links } from '@/data/links'
import { useTheme } from '@/stores/theme'
import gsap from 'gsap'
import { Button, ButtonGroup } from 'primevue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

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
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, delay: 0.3, onComplete: done }
  )
}
</script>

<template>
  <Transition appear @enter="enterAnimationNav">
    <nav class="card flex justify-center">
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
    </nav>
  </Transition>
</template>
