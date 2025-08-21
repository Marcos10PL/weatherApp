<script setup lang="ts">
import { onMounted } from 'vue'
import TheLogo from './TheLogo.vue'
import ThemeSwitch from './ThemeSwitch.vue'
import gsap from 'gsap'

onMounted(() => {
  gsap.fromTo(
    'footer',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, delay: 1, ease: 'power2.out' }
  )
})
</script>

<template>
  <footer class="max-w-[40rem] flex justify-between items-center mx-auto px-4 gap-x-8 pt-4 pb-6">
    <div class="text-sm flex flex-wrap gap-1.5 items-center text-gray-500 font-semibold">
      <p>All rights reserved.</p>
      <p>
        2025 <span class="font-sans"> &copy; </span>
        <TheLogo class="inline-block text-sm" icon-class="!text-[0.6rem]" :animate="false" />
      </p>
    </div>
    <ThemeSwitch />
  </footer>
</template>
