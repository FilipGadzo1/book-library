<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const router = useRouter();
const store = useCartStore();

function goToCheckout() {
  router.push({ path: '/checkout' });
}
</script>

<template>
  <div class="text-white">
    <div v-if="!store.cartItemsCount" class="text-center">
      <img src="/empty-cart.webp" alt="Empty Cart" class="mx-auto w-44" />
      <p class="text-xl font-semibold mb-2">Your cart is empty</p>
      <p>Looks like you haven't added anything to your cart.</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg m-4">
        <router-link to="/">Explore books</router-link>
      </button>
    </div>
    <div v-else>
      <p class="text-xl text-center font-semibold">Shopping Cart</p>
      <div class="md:grid md:grid-cols-2 m-4 md:gap-8">
        <div
          v-for="(book, index) in store.getCartItems"
          :key="index"
          class="flex gap-6 bg-gray-800 p-3 rounded-md my-2">
          <img
            :src="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '/placeholder.png'"
            :alt="book.volumeInfo.title"
            class="w-24" />
          <div class="w-full">
            <div class="md:flex md:flex-col md:gap-2">
              <p class="text-lg font-semibold">{{ book.volumeInfo.title }}</p>
              <p v-if="book.volumeInfo?.authors" class="text-sm italic">
                by:
                <span class="uppercase font-semibold">{{ book.volumeInfo.authors.join(', ') }}</span>
              </p>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-md font-bold">Price: ${{ book.price }}</p>
              <div class="bg-gray-600 rounded-md align-middle flex items-center">
                <button class="px-3 py-1 font-bold" @click="store.decrementQuantity(book)">-</button>
                <span class="text-center">{{ book.quantity }}</span>
                <button class="px-3 py-1 font-bold" @click="store.incrementQuantity(book)">+</button>

                <i
                  class="pi pi-trash text-xl text-red-600 font-semibold px-3 cursor-pointer"
                  @click="store.removeFromCart(book)" />
              </div>
            </div>
          </div>
        </div>

        <div class="border-y border-gray-600 md:border-y-0 flex flex-col gap-4 justify-end py-2">
          <div class="flex justify-between">
            <p class="text-lg font-semibold">Total:</p>
            <p class="text-lg font-semibold">${{ store.getTotalPrice }}</p>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-fit"
            @click="goToCheckout">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
