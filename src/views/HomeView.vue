<script setup lang="ts">
import BookGrid from '@/components/BookGrid.vue';
import type { BookObject } from '@/types';

const onSearchClick = (query: string) => {
  let trimmedQuery = query.trim();

  if (trimmedQuery === '') {
    return;
  }

  searchBooks(trimmedQuery);
};

const apiUrl = 'https://www.googleapis.com/books/v1/volumes';

const bookData = ref([]);

const showScrollButton = ref(false);

const handleScroll = () => {
  if (window.scrollY > 100) {
    showScrollButton.value = true;
  } else {
    showScrollButton.value = false;
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function searchBooks(query: string) {
  await fetch(`${apiUrl}?q=${query}&maxResults=40`)
    .then((res) => res.json())
    .then((data) => {
      bookData.value = data.items;
    });
}

const isDialogVisible = ref<boolean>(false);
const bookDetails = ref<BookObject>();

function onDetailClick(book: BookObject) {
  bookDetails.value = book;
  isDialogVisible.value = true;
}

function hideDialog() {
  isDialogVisible.value = false;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <SearchBar @search="onSearchClick" />

  <div v-if="!bookData.length">
    <img src="/empty-book.svg" alt="Empty Search" class="mx-auto mt-10 w-48" />
    <p class="text-center text-white text-xl font-semibold mb-2">
      Start searching for books
      <i class="pi pi-arrow-up animate-bounce p-2" />
    </p>
  </div>
  <BookGrid v-else :data="bookData" @details="onDetailClick" />
  <Button
    v-if="showScrollButton"
    @click="scrollToTop"
    icon="pi pi-arrow-up"
    rounded
    severity="info"
    class="fixed bottom-4 md:right-1/2 right-4" />
  <BookDetailDialog v-model:visible="isDialogVisible" :book-data="bookDetails" @cancel="hideDialog" />
</template>
