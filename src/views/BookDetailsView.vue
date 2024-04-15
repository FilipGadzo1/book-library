<script setup lang="ts">
import type { BookObject } from '@/types/book';

const props = defineProps<{ id: string }>();
const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
const book = ref<BookObject>();

onBeforeMount(async () => {
  let data: BookObject = await fetch(`${apiUrl}/${props.id}`).then((res) => res.json());
  book.value = data;
});
</script>

<template>
  <BookDetail :book-data="book" :id="id" />
</template>
