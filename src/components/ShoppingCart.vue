<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const router = useRouter();
const data = useCartStore();

function goHome() {
  router.push({ path: '/' });
}
</script>

<template>
  <div class="text-center text-white">
    <div v-if="!data.cartItemsCount">
      <img src="/empty-cart.webp" alt="Empty Cart" class="mx-auto w-44" />
      <p class="text-xl font-semibold mb-2">Your cart is empty</p>
      <p>Looks like you haven't added anything to your cart.</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg m-4" @click="goHome">
        Explore books
      </button>
    </div>
    <div v-else>
      <div class="rounded-xl p-2 bg-gray-800 m-4">
        <p class="text-xl font-semibold">Shopping Cart</p>
        <div class="grid grid-cols-2 mb-2 gap-8">
          <div class="flex flex-col gap-4 mr-4">
            <div
              v-for="(book, index) in data.getCartItems"
              :key="index"
              class="flex gap-8 items-center justify-between">
              <img
                :src="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '/placeholder.png'"
                :alt="book.volumeInfo.title"
                class="w-24" />
              <div class="flex flex-col gap-2">
                <p class="text-lg font-semibold">{{ book.volumeInfo.title }}</p>
                <p class="text-sm italic">
                  by: <span class="uppercase font-semibold">{{ book.volumeInfo.authors!.join(', ') }}</span>
                </p>
                <p class="text-sm">Price: ${{ book.price }}</p>
              </div>
              <div class="flex items-center justify-center gap-6">
                <button
                  class="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-full font-bold"
                  @click="data.decrementQuantity(book)">
                  -
                </button>
                <span class="">{{ book.quantity }}</span>
                <button
                  class="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-full font-bold"
                  @click="data.incrementQuantity(book)">
                  +
                </button>
                <button
                  class="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded-lg"
                  @click="data.removeFromCart(book)">
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-4 justify-end">
            <div class="flex justify-between">
              <p class="text-lg font-semibold">Total:</p>
              <p class="text-lg font-semibold">${{ data.getTotalPrice }}</p>
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-fit">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
