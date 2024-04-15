<script setup lang="ts">
import BookGrid from '@/components/BookGrid.vue';

const onSearchClick = (query: string) => {
  let trimmedQuery = query.trim();
  if (trimmedQuery === '') {
    return;
  }
  searchBooks(trimmedQuery);
};

const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
const bookData = ref([]);
async function searchBooks(query: string) {
  await fetch(`${apiUrl}?q=${query}&maxResults=40`)
    .then((res) => res.json())
    .then((data) => {
      bookData.value = data.items;
    });
}
</script>

<template>
  <SearchBar @search="onSearchClick" />

  <BookGrid :data="bookData" />
</template>
