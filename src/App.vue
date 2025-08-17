<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavigation from './components/TheNavigation.vue'
import ThemeSwitch from './components/ThemeSwitch.vue'
</script>

<template>
  <TheNavigation />
  <ThemeSwitch />
  <RouterView />
</template>
