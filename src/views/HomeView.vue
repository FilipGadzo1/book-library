<script setup lang="ts">
import BookGrid from '@/components/BookGrid.vue';
import type { BookObject } from '@/types';
import { Vue3Lottie } from 'vue3-lottie';
import loading from '@/assets/lottie/loading.json';

const bookData = ref([]);
const showScrollButton = ref(false);
const isLoading = ref(false);
const isDialogVisible = ref<boolean>(false);
const bookDetails = ref<BookObject>();

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  if (window.scrollY > 100) {
    showScrollButton.value = true;
  } else {
    showScrollButton.value = false;
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function onSearchClick(query: string) {
  let trimmedQuery = query.trim();

  if (trimmedQuery === '') {
    return;
  }

  searchBooks(trimmedQuery);
}

const apiUrl = 'https://www.googleapis.com/books/v1/volumes';

async function searchBooks(query: string) {
  isLoading.value = true;
  await fetch(`${apiUrl}?q=${query}&maxResults=40`)
    .then((res) => res.json())
    .then((data) => {
      isLoading.value = false;
      bookData.value = data.items;
    });
}

function onDetailClick(book: BookObject) {
  bookDetails.value = book;
  isDialogVisible.value = true;
}

function hideDialog() {
  isDialogVisible.value = false;
}
</script>

<template>
  <SearchBar @search="onSearchClick" />

  <div v-if="!bookData.length">
    <div v-if="isLoading">
      <Vue3Lottie
        class="mx-auto"
        :animationData="loading"
        :height="200"
        :width="200"
        :loop="true"
        :speed="0.8"
        :autoPlay="true" />
    </div>
    <div v-else>
      <img src="/empty-book.svg" alt="Empty Search" class="mx-auto mt-10 w-48" />
      <p class="text-center text-white text-xl font-semibold mb-2">
        Start searching for books
        <i class="pi pi-arrow-up animate-bounce p-2" />
      </p>
    </div>
  </div>
  <div v-else>
    <BookGrid :data="bookData" @details="onDetailClick" />
    <Button
      v-if="showScrollButton"
      @click="scrollToTop"
      icon="pi pi-arrow-up"
      rounded
      severity="info"
      class="fixed bottom-4 right-4" />
    <BookDetailDialog v-model:visible="isDialogVisible" :book-data="bookDetails" @cancel="hideDialog" />
  </div>
</template>
