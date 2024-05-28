<script setup lang="ts">
import { type BookObject } from '@/types';

const props = defineProps<{
  data?: BookObject[];
}>();

defineEmits<{
  details: [book: BookObject];
}>();

const bookInfo = computed<BookObject[]>(
  () =>
    props.data?.map((book) => {
      return {
        volumeInfo: {
          ...book.volumeInfo,
          rating: Math.floor(Math.random() * 5) + 1,
        },
        id: book.id,
        price: Math.floor(Math.random() * 100) + 1,
        quantity: 0,
      };
    }) || []
);
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 m-4 gap-4">
    <div v-for="(book, index) in bookInfo" :key="index">
      <BookCard :book="book" @details="(e) => $emit('details', e)" />
    </div>
  </div>
</template>
