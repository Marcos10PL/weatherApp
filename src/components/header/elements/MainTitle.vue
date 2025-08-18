<script setup lang="ts">
import gsap from 'gsap'
import { onMounted } from 'vue'

const title = 'Weather App'
const titleChars = title.split('')

onMounted(() => {
  gsap.fromTo(
    'h1 span',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: 'power2.out' }
  )

  gsap.fromTo(
    'h1 i',
    { x: 50, opacity: 0, rotate: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.5,
      rotate: 180,
      delay: titleChars.length * 0.1,
      ease: 'bounce.out',
    }
  )
})
</script>

<template>
  <h1 class="text-2xl font-bold flex items-center">
    <span v-for="(char, i) in titleChars" :key="i" class="inline-block">{{ char }}</span>
    <i class="ml-1 -mr-0.5 pt-1 pi pi-sun !text-lg !w-fit !h-fit text-yellow-500"></i>
  </h1>
</template>
