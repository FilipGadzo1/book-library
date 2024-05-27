<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const format = useFormatter();
const cart = useCartStore();

const totalPrice = computed(() => {
  return format.number(cart.totalPrice, {
    style: 'currency',
  });
});
</script>

<template>
  <div class="text-white">
    <div class="md:grid md:grid-cols-4 md:m-4 md:gap-8">
      <div v-for="(book, index) in cart.cartItems" :key="index">
        <ShoppingCartCard :book="book" :cart="cart" />
      </div>
    </div>
    <div
      class="border-y border-gray-700 md:border-y-0 flex flex-row-reverse md:flex-row justify-between md:justify-end items-center gap-4 py-2 mx-4">
      <div class="flex gap-4">
        <p class="text-lg font-semibold">Total:</p>
        <p class="text-xl font-bold">{{ totalPrice }}</p>
      </div>
    </div>
  </div>
</template>
