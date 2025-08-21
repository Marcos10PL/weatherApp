<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/header/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <TheHeader />
  <main class="px-4 mx-auto max-w-[40rem]">
    <RouterView />
  </main>
  <TheFooter />
</template>
