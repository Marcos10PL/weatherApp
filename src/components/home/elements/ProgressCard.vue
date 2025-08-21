<script setup lang="ts">
import { computed, toRefs } from 'vue'
import tearSvg from '@/assets/icons/tear.svg'
import { ProgressBar } from 'primevue'
import CardWrapper from '@/ui/CardWrapper.vue'

const props = defineProps<{
  value: number
  icon: keyof typeof icons
  title: string
}>()

const icons = {
  tear: { type: 'img', src: tearSvg, alt: 'Tear icon', class: 'w-5 h-5 mt-0.5 -mr-1' },
  cloud: { type: 'i', class: 'pi pi-cloud' },
} as const

const { value, icon, title } = toRefs(props)

const currentIcon = computed(() => (icon.value && icons[icon.value] ? icons[icon.value] : null))
</script>

<template>
  <CardWrapper>
    <template #subtitle>
      <h4 class="flex items-center gap-2 mt-1">
        <component v-if="currentIcon" :is="currentIcon.type" v-bind="currentIcon" />
        {{ title }}
      </h4>
    </template>
    <template #content>
      <p class="!m-0 !p-0 flex items-center gap-2">
        <ProgressBar class="w-full" :value>{{ ' ' }}</ProgressBar>
        {{ value }}%
      </p>
    </template>
  </CardWrapper>
</template>
