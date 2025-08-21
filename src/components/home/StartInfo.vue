<script setup lang="ts">
import gsap from 'gsap'
import { onMounted } from 'vue'

onMounted(() => {
  gsap.fromTo(
    '.start-info p, .start-info ul',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: 'power2.out' }
  )
})
</script>

<template>
  <div class="flex flex-col gap-4 mb-6 mt-5 start-info">
    <p>Search for a city and select a result to see the weather forecast.</p>
    <p>You can type, for example:</p>
    <ul class="list-disc pl-5">
      <li>Warsaw</li>
      <li>Warsaw, Masovian Voivodeship</li>
      <li>Warsaw, Masovian Voivodeship, PL</li>
      <li>Warsaw, PL</li>
    </ul>
    <div class="flex gap-2">
      <p>
        <span class="font-bold">Note:</span>
        Location data comes from an external provider. Occasionally, the selected result may point
        to a nearby locality rather than the exact city you intended (e.g., choosing Warsaw might
        return a neighbouring town). If that happens, try a more specific query, such as “Warsaw,
        Masovian Voivodeship”.
      </p>
    </div>
  </div>
</template>
