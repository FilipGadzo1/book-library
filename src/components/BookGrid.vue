<script setup lang="ts">
import { type RootObject } from '@/types';

const props = defineProps<{
  data?: RootObject[];
}>();

const bookInfo = computed(() => {
  return props.data?.map((book) => {
    return { ...book.volumeInfo };
  });
});
</script>

<template>
  <div class="grid grid-cols-5 gap-4 m-4">
    <Card
      class="overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out"
      v-for="book in bookInfo"
      :key="book.title"
    >
      <template #header>
        <img
          alt="Book Cover"
          :src="
            book.imageLinks
              ? book.imageLinks.smallThumbnail
              : 'https://via.placeholder.com/128x192.png?text=No+Image'
          "
          class="w-full h-52 object-cover"
        />
      </template>
      <template #title>{{ book.title }}</template>
      <template #content>
        <p class="m-0 line-clamp-2">
          {{ book.description }}
        </p>
      </template>
      <template #footer>
        <div class="flex gap-3 mt-1"></div>
      </template>
    </Card>
  </div>
</template>
