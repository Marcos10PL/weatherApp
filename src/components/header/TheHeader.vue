<script setup lang="ts">
import TheLogo from '../TheLogo.vue'
import SearchInput from './SearchInput.vue'
</script>

<template>
  <header class="flex flex-col justify-center items-center py-4 gap-y-4">
    <h1>
      <TheLogo />
    </h1>
    <SearchInput />
  </header>
</template>
