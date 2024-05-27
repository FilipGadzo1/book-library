<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();
</script>

<template>
  <div class="flex flex-col gap-2 p-4 rounded-lg border border-gray-800 bg-gray-700 text-white overflow-y">
    <div class="text-bold md:text-xl mb-4">Shipping Details</div>
    <div class="flex gap-4 text-sm md:text-base">
      Name: {{ cart.shippingInfo.firstName }} {{ cart.shippingInfo.lastName }}
    </div>
    <div class="text-sm md:text-base">E-mail: {{ cart.shippingInfo.email }}</div>
    <div class="flex gap-4 text-sm md:text-base">
      Adress: {{ cart.shippingInfo.address }} {{ cart.shippingInfo.city }}, {{ cart.shippingInfo.zip }}
    </div>
    <div class="text-bold md:text-xl mb-4 mt-4">Billing information</div>
    <div class="text-sm md:text-base">Card Number: {{ cart.shippingInfo.cardNumber }}</div>
    <div class="text-sm md:text-base">Expiration Date: {{ cart.shippingInfo.expDate }}</div>
  </div>
</template>
