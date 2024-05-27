<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import type { BookObject } from '@/types/book';
import { useToast } from 'primevue/usetoast';

defineProps<{
  book: BookObject;
}>();

defineEmits<{
  details: [book: BookObject];
}>();

const format = useFormatter();
const cart = useCartStore();
const toast = useToast();

function addToCart(book: BookObject) {
  cart.addToCart(book, 1);
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: `Item${book.quantity > 1 ? 's' : ''} successfully added to cart`,
    life: 3000,
  });
}
</script>

<template>
  <div class="grid grid-cols-4 bg-gray-900 rounded-lg shadow text-white">
    <img
      :src="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '/placeholder.png'"
      :alt="book.volumeInfo.title"
      class="object-cover md:w-full md:h-40 h-full rounded-s-lg" />
    <div class="p-2 flex flex-col justify-between leading-normal col-span-3 h-60 md:h-auto">
      <div>
        <p class="md:text-xl font-bold truncate mb-2">{{ book.volumeInfo.title }}</p>
        <p v-if="book.volumeInfo.authors" class="text-gray-400 italic text-sm">
          Authors: {{ book.volumeInfo.authors.join(', ') }}
        </p>
      </div>
      <div class="flex items-center justify-between">
        <p class="text-lg md:text-2xl font-bold">{{ format.number(book.price, { style: 'currency' }) }}</p>
        <div class="flex">
          <Button
            label="Add"
            rounded
            text
            icon="pi pi-shopping-cart"
            iconPos="right"
            size="small"
            @click="addToCart(book)" />
          <Button label="Details" size="small" severity="info" text rounded @click="$emit('details', book)" />
        </div>
      </div>
    </div>
  </div>
</template>
