<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const router = useRouter();
const data = useCartStore();

function goToCheckout() {
  router.push({ path: '/checkout' });
}
</script>

<template>
  <div class="text-white">
    <div v-if="!data.cartItemsCount" class="text-center">
      <img src="/empty-cart.webp" alt="Empty Cart" class="mx-auto w-44" />
      <p class="text-xl font-semibold mb-2">Your cart is empty</p>
      <p>Looks like you haven't added anything to your cart.</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg m-4">
        <router-link to="/">Explore books</router-link>
      </button>
    </div>
    <div v-else>
      <div class="rounded-xl p-2 bg-gray-800 m-4">
        <p class="text-xl text-center font-semibold">Shopping Cart</p>
        <div class="md:grid md:grid-cols-2 mb-2 md:gap-8">
          <div
            v-for="(book, index) in data.getCartItems"
            :key="index"
            class="md:mt-0 border-t border-gray-600 pt-2 md:border-0 flex gap-2 my-4 md:gap-12 items-center">
            <img
              :src="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '/placeholder.png'"
              :alt="book.volumeInfo.title"
              class="w-24" />
            <div class="md:flex md:flex-col md:gap-2">
              <p class="text-lg font-semibold">{{ book.volumeInfo.title }}</p>
              <p class="text-sm italic">
                by: <span class="uppercase font-semibold">{{ book.volumeInfo.authors!.join(', ') }}</span>
              </p>
              <p class="text-sm">Price: ${{ book.price }}</p>
            </div>
            <div class="mt-4 flex flex-col md:flex-1 md:block md:justify-center gap-6">
              <button
                class="md:mx-3 px-3 py-1 align-middle bg-red-600 hover:bg-red-700 rounded-full font-bold"
                @click="data.decrementQuantity(book)">
                -
              </button>
              <span class="text-center align-middle">{{ book.quantity }}</span>
              <button
                class="md:mx-3 px-3 py-1 align-middle bg-green-600 hover:bg-green-700 rounded-full font-bold"
                @click="data.incrementQuantity(book)">
                +
              </button>
              <i
                class="pi pi-trash text-xl text-red-600 font-semibold px-3 align-middle cursor-pointer"
                @click="data.removeFromCart(book)" />
            </div>
          </div>

          <div class="border-y border-gray-600 md:border-y-0 flex flex-col gap-4 justify-end py-2">
            <div class="flex justify-between">
              <p class="text-lg font-semibold">Total:</p>
              <p class="text-lg font-semibold">${{ data.getTotalPrice }}</p>
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
  </div>
</template>
