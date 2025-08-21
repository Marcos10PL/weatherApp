<script setup lang="ts">
import gsap from 'gsap'
import { onMounted, useTemplateRef } from 'vue'

const props = withDefaults(
  defineProps<{
    iconClass?: string
    animate?: boolean
  }>(),
  {
    iconClass: '',
    animate: true,
  }
)

const logoRef = useTemplateRef('logo')

const title = 'Weather App'
const titleChars = title.split('')

onMounted(() => {
  const spans = logoRef.value?.querySelectorAll('span')
  const icon = logoRef.value?.querySelector('i')

  if (!props.animate || !spans || !icon) return

  gsap.fromTo(
    spans,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: 'power2.out' }
  )

  gsap.fromTo(
    icon,
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
  <div class="text-2xl font-bold flex items-center" ref="logo">
    <span v-for="(char, i) in titleChars" :key="i" class="inline-block">{{ char }}</span>
    <i class="ml-1 -mr-0.5 pt-1 pi pi-sun !text-lg text-yellow-500" :class="iconClass"></i>
  </div>
</template>
