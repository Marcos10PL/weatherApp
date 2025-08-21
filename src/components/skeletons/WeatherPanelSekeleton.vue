<script setup lang="ts">
import { Skeleton } from 'primevue'
</script>

<template>
  <div class="flex flex-col gap-y-6 mx-auto skeletons mb-2">
    <Skeleton width="100%" height="2.7rem" class="mt-4"></Skeleton>

    <div class="flex justify-between gap-y-4 -mt-0.5">
      <Skeleton width="10rem" height="2rem"></Skeleton>
      <Skeleton width="4rem" height="2rem"></Skeleton>
    </div>

    <div class="flex flex-col gap-3">
      <Skeleton width="9rem" height="3rem"></Skeleton>
      <Skeleton width="7rem" height="1.5rem"></Skeleton>
    </div>

    <Skeleton width="7rem" height="1.5rem"></Skeleton>

    <div class="mt-2 flex flex-col gap-4">
      <Skeleton width="100%" height="6rem"></Skeleton>
      <Skeleton width="100%" height="6rem" class="!block sm:!hidden"></Skeleton>
      <Skeleton width="100%" height="8.8rem"></Skeleton>
      <Skeleton width="100%" height="8.8rem" class="!block sm:!hidden"></Skeleton>
      <Skeleton width="100%" height="4.3rem"></Skeleton>
    </div>
  </div>
</template>
