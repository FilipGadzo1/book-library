<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const cartList = computed(() => cartStore.cartList.length);
const books = computed(() => cartStore.booksInCart);
</script>

<template>
  <div>
    <p>Shopping Cart list: {{ cartList }}</p>
    <!-- change to list -->
    <div>
      <p>
        Shopping Cart books:
        <span v-for="book in books" :key="book.pageCount">{{ book.title }}</span>
      </p>
    </div>
  </div>
</template>
