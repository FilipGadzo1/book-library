<script setup lang="ts">
import BookGrid from '@/components/BookGrid.vue';
import * as $ from 'jquery';

const onSearchClick = (query: string) => {
  let trimmedQuery = query.trim();
  if (trimmedQuery === '') {
    return;
  }
  searchBooks(trimmedQuery);
};

const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
const bookData = ref();
function searchBooks(query: string) {
  $.ajax({
    url: `${apiUrl}?q=${query}&maxResults=40`,
    type: 'GET',
    success: function (data) {
      bookData.value = data.items;
    },
    error: function (error) {
      console.error(error);
    },
  });
}
</script>

<template>
  <SearchBar @search="onSearchClick" />

  <BookGrid :data="bookData" />
</template>
