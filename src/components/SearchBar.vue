<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const query = ref('');

const search = () => {
  emit('search', query.value);
};

const emit = defineEmits(['search']);
</script>

<template>
  <div
    class="flex flex-col gap-4 justify-center items-center bg-gray-200 p-4 w-full"
  >
    <label for="search" class="font-bold text-xl">Search for a book</label>
    <div class="flex gap-2">
      <InputText id="search" type="text" v-model="query" class="p-1" />
      <Button
        icon="pi pi-search"
        severity="info"
        raised
        rounded
        size="small"
        @click="search"
      />
    </div>
  </div>
</template>
