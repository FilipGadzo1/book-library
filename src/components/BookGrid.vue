<script setup lang="ts">
import { type BookObject } from '@/types';

const props = defineProps<{
  data?: BookObject[];
}>();

defineEmits<{
  details: [book: BookObject];
}>();

const bookInfo: BookObject[] =
  props.data?.map((book) => {
    return {
      volumeInfo: book.volumeInfo,
      id: book.id,
      price: Math.floor(Math.random() * 100) + 1,
      rating: Math.floor(Math.random() * 5) + 1,
      quantity: 0,
    };
  }) || [];
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 m-4 gap-4">
    <div v-for="(book, index) in bookInfo" :key="index">
      <BookCard :book="book" @details="($event) => $emit('details', $event)" />
    </div>
  </div>
</template>
