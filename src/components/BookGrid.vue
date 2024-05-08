<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { type BookObject } from '@/types';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const props = defineProps<{
  data?: BookObject[];
}>();

const cart = useCartStore();
const toast = useToast();

const bookInfo = computed(() => {
  return props.data?.map((book) => {
    return {
      ...book.volumeInfo,
      id: book.id,
      price: Math.floor(Math.random() * 100) + 1,
      rating: Math.floor(Math.random() * 5) + 1,
    };
  });
});

function addToCart(book: BookObject) {
  cart.addToCart(book, 1);
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: `Item${book.quantity > 1 ? 's' : ''} successfully added to cart`,
    life: 3000,
  });
}

defineEmits<{
  details: [book: BookObject];
}>();
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 m-4 gap-4">
    <div
      v-for="(book, index) in bookInfo"
      :key="index"
      class="grid grid-cols-4 bg-gray-900 rounded-lg shadow text-white transition-colors">
      <img
        :src="book.imageLinks ? book.imageLinks.thumbnail : '/placeholder.png'"
        :alt="book.title"
        class="object-cover w-full h-full rounded-s-lg" />
      <div class="p-2 flex flex-col justify-between leading-normal col-span-3 h-60 md:h-auto">
        <div>
          <p class="md:text-xl font-bold truncate mb-2">{{ book.title }}</p>
          <p v-if="book.authors" class="text-gray-400 italic text-sm">Authors: {{ book.authors.join(', ') }}</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-lg md:text-2xl font-bold">${{ book.price }}</p>
          <div class="flex">
            <Button
              label="Add to the cart"
              rounded
              text
              icon="pi pi-shopping-cart"
              iconPos="right"
              size="small"
              @click="addToCart({ id: book.id, volumeInfo: book, price: book.price, quantity: 1 })" />
            <Button
              label="Details"
              size="small"
              severity="info"
              text
              rounded
              @click="$emit('details', { id: book.id, volumeInfo: book, price: book.price, quantity: 1 })" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
