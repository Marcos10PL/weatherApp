<script setup lang="ts">
import { RouterView } from 'vue-router'
import ThemeSwitch from './components/ThemeSwitch.vue'
import TheHeader from './components/header/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <ThemeSwitch />
  <RouterView />
</template>
