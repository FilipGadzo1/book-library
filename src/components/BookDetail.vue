<script setup lang="ts">
import type { BookObject } from '@/types';
import { useCartStore } from '@/stores/cart';
import { useToast } from 'primevue/usetoast';

const emit = defineEmits<{
  cancel: [];
}>();

const toast = useToast();
const props = defineProps<{
  bookData?: BookObject;
}>();

const cartStore = useCartStore();

const quantity = ref<number>(1);

const addToCart = () => {
  if (!props.bookData) return;

  if (quantity.value <= 0 || isNaN(quantity.value)) {
    toast.add({
      severity: 'error',
      summary: 'Error Message',
      detail: 'Please enter a valid quantity',
      life: 3000,
    });
    return;
  }

  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: `Item${quantity.value > 1 ? 's' : ''} successfully added to cart`,
    life: 3000,
  });
  cartStore.addToCart({ ...props.bookData, quantity: quantity.value }, quantity.value);
  emit('cancel');
};
</script>

<template>
  <div class="mx-4 mb-9 md:grid md:grid-cols-2 items-center text-white">
    <div class="flex justify-center mb-4">
      <img
        :src="bookData?.volumeInfo.imageLinks.thumbnail"
        :alt="bookData?.volumeInfo.title"
        class="md:w-96 rounded-md shadow-xl md:shadow-2xl" />
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div>
        <p class="text-lg md:text-3xl font-semibold">{{ bookData?.volumeInfo.title }}</p>
        <StarRating :rating="bookData?.volumeInfo.rating!" />
        <p v-if="bookData?.volumeInfo.authors" class="italic text-xs md:text-sm text-gray-800">
          by: <span class="font-semibold">{{ bookData?.volumeInfo.authors.join(', ') }}</span>
        </p>
        <p class="text-xs md:text-sm font-semibold self-center text-gray-800">Serial Number: {{ bookData?.id }}</p>
      </div>
      <div
        v-html="bookData?.volumeInfo.description"
        class="text-xs md:text-sm h-44 md:h-80 overflow-auto text-justify pr-3" />
      <div class="mb-4 md:mb-0 flex justify-between items-center">
        <p class="text-2xl md:text-3xl font-bold text-blue-300">${{ bookData?.price }}</p>
        <div>
          <input
            name="quantity"
            v-model="quantity"
            type="number"
            min="1"
            class="w-16 p-2 text-center border border-gray-500 rounded-lg bg-gray-900 mr-2"
            placeholder="1" />

          <Button
            severity="info"
            label="Add to cart"
            icon-pos="right"
            icon="pi pi-shopping-cart"
            class="font-bold"
            @click="addToCart" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
