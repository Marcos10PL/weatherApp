<script setup lang="ts">
import CardWrapper from '@/ui/CardWrapper.vue'
import { toRefs } from 'vue'

const props = defineProps<{
  windSpeed: number
  windDeg: number
}>()

const { windSpeed, windDeg } = toRefs(props)
</script>

<template>
  <CardWrapper>
    <template #content>
      <div class="flex items-center justify-evenly gap-4">
        <!-- INFO -->
        <p class="flex flex-col items-center w-[calc(50%-1rem)]">
          <span class="text-[#a1a1aa]"> Wind </span>
          <span> {{ windSpeed }} m/s </span>
        </p>

        <!-- COMPASS -->
        <div class="border border-gray-400 rounded-full p-0.5 w-fit">
          <div
            class="relative w-24 h-24 rounded-full border flex items-center justify-center border-gray-400"
          >
            <div class="absolute w-2 h-14" :style="{ transform: `rotate(${windDeg}deg)` }">
              <div
                class="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-10 border-b-red-500"
              ></div>
              <div class="w-0.5 h-4 bg-red-500 mx-auto"></div>
              <div class="w-1 h-1 bg-red-300 rounded-full mx-auto"></div>
            </div>

            <span class="absolute top-0.5 text-xs text-red-400">N</span>
            <span class="absolute bottom-0.5 text-xs">S</span>
            <span class="absolute left-1 text-xs">W</span>
            <span class="absolute right-1 text-xs">E</span>
          </div>
        </div>
      </div>
    </template>
  </CardWrapper>
</template>
