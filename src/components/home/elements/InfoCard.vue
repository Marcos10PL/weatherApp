<script setup lang="ts">
import CardWrapper from '@/ui/CardWrapper.vue'
import { computed, toRefs } from 'vue'
import tearSvg from '@/assets/icons/tear.svg'
import snowflakeSvg from '@/assets/icons/snowflake.svg'

const props = defineProps<{
  value: number
  unit: string
  title: string
  icon: keyof typeof icons
}>()

const { value, unit, title, icon } = toRefs(props)

const icons = {
  tear: { type: 'img', src: tearSvg, alt: 'Tear icon', class: 'w-5 h-5 mt-0.5 -mr-1' },
  snowflake: {
    type: 'img',
    src: snowflakeSvg,
    alt: 'Snowflake icon',
    class:
      'w-4 h-4 mt-0.5 mx-0.5 invert-[.7] sepia-[.13] saturate-[1.48] hue-rotate-[202deg] brightness-[.91] contrast-[.88] opacity-90',
  },
  arrowUp: { type: 'i', class: 'pi pi-arrow-up' },
} as const

const currentIcon = computed(() => (icon.value && icons[icon.value] ? icons[icon.value] : null))
</script>

<template>
  <CardWrapper>
    <template #content>
      <div class="flex items-center justify-between">
        <h4 class="text-[#a1a1aa] flex items-center gap-2">
          <component v-if="currentIcon" :is="currentIcon.type" v-bind="currentIcon" />
          <span> {{ title }} </span>
        </h4>
        <p class="!m-0 !p-0">{{ value }} {{ unit }}</p>
      </div>
    </template>
  </CardWrapper>
</template>
