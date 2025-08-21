<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/header/TheHeader.vue'
// import ButtonLinks from './components/ButtonLinks.vue'
</script>

<template>
  <TheHeader />
  <main class="m-4">
    <RouterView />
  </main>
  
  <!-- <ButtonLinks /> -->
</template>
