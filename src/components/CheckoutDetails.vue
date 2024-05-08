<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
const cart = useCartStore();
const cartItems = cart.cartList;
const toatlPrice = cart.getTotalPrice;
</script>
<template>
  <div class="p-4 rounded-lg border border-gray-800 bg-gray-700 text-white overflow-y">
    <h2 class="text-lg mb-2 font-bold">Order Summary</h2>
    <div v-for="item in cartItems" :key="item.id" class="mb-4">
      <div class="flex gap-6">
        <img :src="item.volumeInfo.imageLinks.thumbnail" alt="Book Cover" class="h-20 w-12" />
        <div class="text-sm flex flex-col">
          <span>{{ item.volumeInfo.title }} ({{ item.quantity }})</span>
          <span>{{ item.volumeInfo.authors?.join(', ') }} </span>
          <span class="mt-5 font-semibold">Price: ${{ item.price }}</span>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-4 border-y border-gray-800 py-4">
      <span class="font-semibold">Total</span>
      <span>${{ toatlPrice }}</span>
    </div>
  </div>
</template>
