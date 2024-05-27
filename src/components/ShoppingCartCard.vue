<script setup lang="ts">
import type { useCartStore } from '@/stores/cart';
import type { BookObject } from '@/types';

defineProps<{
  book: BookObject;
  cart: ReturnType<typeof useCartStore>;
}>();
</script>

<template>
  <div class="flex gap-6 bg-gray-800 p-3 rounded-md my-2">
    <img
      :src="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '/placeholder.png'"
      :alt="book.volumeInfo.title"
      class="w-16 md:w-24 md:h-40" />
    <div class="w-full">
      <div class="md:flex md:flex-col md:gap-2">
        <div class="flex justify-between">
          <p class="text-sm md:text-lg font-semibold">
            {{ book.volumeInfo.title }}
          </p>
          <i
            class="pi pi-times text-xs md:text-md text-red-600 font-semibold cursor-pointer h-1"
            @click="cart.removeFromCart(book)" />
        </div>
        <p v-if="book.volumeInfo?.authors" class="text-sm italic">
          by:
          <span class="text-xs md:uppercase font-semibold">{{ book.volumeInfo.authors.join(', ') }}</span>
        </p>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <p class="md:text-xl font-bold">${{ book.price }}</p>
        <div class="flex items-center gap-1 md:gap-3">
          <Button text rounded severity="danger" icon="pi pi-minus" @click="cart.decrementQuantity(book)" />
          <span class="text-center">{{ book.quantity }}</span>
          <Button text rounded icon="pi pi-plus" @click="cart.incrementQuantity(book)" />
        </div>
      </div>
    </div>
  </div>
</template>
