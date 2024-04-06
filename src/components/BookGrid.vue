<script setup lang="ts">
import { type RootObject } from '@/types';

const props = defineProps<{
  data?: RootObject[];
}>();

const bookInfo = computed(() => {
  return props.data?.map((book) => {
    return { ...book.volumeInfo, id: book.id, price: Math.floor(Math.random() * 100) + 1 };
  });
});

const emit = defineEmits(['details']);
function onDetailsClick(id: string) {
  emit('details', id);
}
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 m-4 gap-4">
    <div
      v-for="(book, index) in bookInfo"
      :key="index"
      class="flex flex-cols items-center bg-gray-900 rounded-lg hover:bg-gray-800 shadow text-white transition-colors">
      <img
        :src="book.imageLinks ? book.imageLinks.thumbnail : '/public/placeholder.png'"
        :alt="book.title"
        class="object-cover w-32 h-full rounded-s-lg" />
      <div class="p-4 flex flex-col justify-between leading-normal gap-2">
        <p class="text-xl font-bold">{{ book.title }}</p>
        <p class="text-gray-400 italic">Authors: {{ book.authors?.join(', ') }}</p>
        <p class="">Price: ${{ book.price }}</p>
        <div class="mt-8">
          <button @click="onDetailsClick(book.id)">
            <RouterLink
              :to="{ name: 'book-details', params: { id: book.id } }"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >Details</RouterLink
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
