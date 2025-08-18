<script setup lang="ts">
import { useTheme } from '@/stores/theme'
import ToggleSwitch from 'primevue/toggleswitch'

const theme = useTheme()
</script>

<template>
  <ToggleSwitch v-model="theme.isDarkMode">
    <template #handle="{ checked }">
      <i :class="['!text-xs pi', { 'pi-moon': checked, 'pi-sun': !checked }]" />
    </template>
  </ToggleSwitch>
</template>
