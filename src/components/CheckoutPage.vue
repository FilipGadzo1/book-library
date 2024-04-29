<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import type CheckoutForm from './CheckoutForm.vue';

const cart = useCartStore();
const cartItems = cart.cartList;
const toatlPrice = cart.getTotalPrice;
</script>

<template>
  <div class="m-4">
    <div v-if="!cartItems.length" class="text-center text-white">
      <img src="/empty-cart.webp" alt="Empty Cart" class="mx-auto w-44" />
      <p class="text-xl font-semibold mb-2">Your cart is empty</p>
      <p>Looks like you haven't added anything to your cart.</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg m-4">
        <router-link to="/">Explore books</router-link>
      </button>
    </div>
    <div v-else>
      <h1 class="md:ml-12 text-white text-2xl font-bold mb-5">Checkout</h1>
      <div class="flex flex-col-reverse gap-4 md:grid md:grid-cols-2 md:mx-12">
        <CheckoutForm />
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
      </div>
    </div>
  </div>
</template>
