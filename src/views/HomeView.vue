<script setup lang="ts">
import BookGrid from '@/components/BookGrid.vue';
import type { BookObject } from '@/types';
import { Vue3Lottie } from 'vue3-lottie';
import loading from '@/assets/lottie/loading.json';
import { useWindowScroll } from '@vueuse/core';
import { service } from '@/service';

const { y } = useWindowScroll({ behavior: 'smooth' });

const bookData = ref<BookObject[]>();
const isLoading = ref(false);
const isDialogVisible = ref<boolean>(false);
const bookDetails = ref<BookObject>();

const showScrollButton = computed(() => y.value > 100);

function onSearchClick(query: string) {
  let trimmedQuery = query.trim();

  if (trimmedQuery === '') {
    return;
  }

  searchBooks(trimmedQuery);
}

async function searchBooks(query: string) {
  isLoading.value = true;
  const data = await service.getBooks(query);
  bookData.value = data.items;
  isLoading.value = false;
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

  <div v-if="!bookData?.length">
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
      <EmptySearchState />
    </div>
  </div>
  <div v-else>
    <BookGrid :data="bookData" @details="onDetailClick" />
    <Button
      v-if="showScrollButton"
      @click="y = 0"
      icon="pi pi-arrow-up"
      rounded
      severity="info"
      class="fixed bottom-4 right-4" />
    <BookDetailDialog v-model:visible="isDialogVisible" :book-data="bookDetails" @cancel="hideDialog" />
  </div>
</template>
