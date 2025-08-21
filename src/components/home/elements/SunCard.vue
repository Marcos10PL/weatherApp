<script setup lang="ts">
import CardWrapper from '@/ui/CardWrapper.vue'
import { getLocalTime } from '@/utils/date'

defineProps<{
  sunrise: number
  sunset: number
  timezone: number
}>()
</script>

<template>
  <CardWrapper>
    <template #content>
      <!-- INFO -->
      <h4 class="flex justify-between -mt-0.5">
        <span class="text-[#a1a1aa]">Sunrise</span>
        <span class="text-[#a1a1aa]">Sunset</span>
      </h4>

      <!-- SUN TIME -->
      <div class="flex justify-between">
        <p>
          {{ getLocalTime(new Date(sunrise * 1000), timezone) }}
        </p>
        <p class="col-start-4 text-right">
          {{ getLocalTime(new Date(sunset * 1000), timezone) }}
        </p>
      </div>

      <!-- SUN -->
      <div
        class="relative -mt-7 inset-0 flex justify-center min-h-18 overflow-hidden border-b-2 border-green-700"
      >
        <i class="pi pi-sun text-yellow-500 !text-8xl absolute animate-pulse mt-4"></i>
        <i class="pi pi-sun text-yellow-500 !text-8xl absolute rotate-24 mt-4"></i>
      </div>
    </template>
  </CardWrapper>
</template>
