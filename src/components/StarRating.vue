<script setup lang="ts">
defineProps<{
  rating: number;
}>();
</script>

<template>
  <div class="flex gap-2 my-2">
    <i v-for="i in 5" :key="i" :class="['pi', 'pi-star-fill', rating >= i ? 'text-yellow-400' : 'text-gray-400']"></i>
  </div>
</template>
