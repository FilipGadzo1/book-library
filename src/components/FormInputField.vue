<script setup lang="ts">
import { ErrorMessage } from 'vee-validate';

const props = defineProps<{
  name: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  input: [value: Event];
}>();

const { value } = useField(() => props.name);
</script>

<template>
  <div class="w-full">
    <input type="text" :name="name" v-model="value" :placeholder="placeholder" @input="emit('input', $event)" />
    <div class="min-h-[20px]">
      <ErrorMessage :name="name" class="text-red-500 text-xs" />
    </div>
  </div>
</template>

<style scoped>
input {
  @apply block w-full p-4 text-sm text-gray-200 border border-gray-500 rounded-lg placeholder-gray-400 bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent;
}
</style>
