<script setup lang="ts">
import { Card } from 'primevue'
</script>

<template>
  <Card class="w-full !shadow-[0_0_5px_rgba(0,0,0,.5)]">
    <template #subtitle>
      <slot name="subtitle" />
    </template>
    <template #content>
      <slot name="content" />
    </template>
  </Card>
</template>

<style>
.p-card-body {
  padding-top: 0.75rem;
}
</style>
