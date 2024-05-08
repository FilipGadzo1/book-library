<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();
</script>

<template>
  <div class="text-white">
    <div class="md:grid md:grid-cols-4 md:m-4 md:gap-8">
      <div v-for="(book, index) in cart.getCartItems" :key="index" class="flex gap-6 bg-gray-800 p-3 rounded-md my-2">
        <img
          :src="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '/placeholder.png'"
          :alt="book.volumeInfo.title"
          class="w-16 md:w-24" />
        <div class="w-full">
          <div class="md:flex md:flex-col md:gap-2">
            <div class="flex justify-between">
              <p class="text-sm md:text-lg font-semibold">{{ book.volumeInfo.title }}</p>
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
    </div>
    <div
      class="border-y border-gray-700 md:border-y-0 flex flex-row-reverse md:flex-row justify-between md:justify-end items-center gap-4 py-2 mx-4">
      <div class="flex gap-4">
        <p class="text-lg font-semibold">Total:</p>
        <p class="text-xl font-bold">${{ cart.getTotalPrice }}</p>
      </div>
    </div>
  </div>
</template>
