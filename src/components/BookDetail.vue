<script setup lang="ts">
import type { BookObject } from '@/types';
import { useCartStore } from '@/stores/cart';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

const router = useRouter();
const toast = useToast();
const price = ref(+router.currentRoute.value.query.price!);
const props = defineProps<{
  id: string;
  bookData?: BookObject;
}>();

console.log(props.bookData);

const cartStore = useCartStore();
const addToCart = () => {
  if (!props.bookData) return;
  const quantity = document.querySelector('input[name="quantity"]') as HTMLInputElement;
  if (quantity.valueAsNumber <= 0 || isNaN(quantity.valueAsNumber)) {
    toast.add({
      severity: 'error',
      summary: 'Error Message',
      detail: 'Please enter a valid quantity',
      group: 'bc',
      life: 3000,
    });
    return;
  }
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: `Item${quantity.valueAsNumber > 1 ? 's' : ''} successfully added to cart`,
    group: 'bc',
    life: 3000,
  });
  cartStore.addToCart(
    { ...props.bookData, price: price.value, quantity: quantity.valueAsNumber },
    quantity.valueAsNumber
  );
};
</script>

<template>
  <div class="m-4 md:grid md:grid-cols-6 md:gap-4 items-center text-gray-200 h-[80vh]">
    <div class="mb-4 items-center md:mb-0 md:col-start-3 justify-self-center flex flex-col md:gap-4 p-2">
      <img
        :src="bookData?.volumeInfo.imageLinks.thumbnail"
        :alt="bookData?.volumeInfo.title"
        class="md:w-96 rounded-md shadow-2xl" />
    </div>
    <div class="md:col-start-4 md:col-span-2">
      <div class="flex flex-col gap-6">
        <div>
          <p class="text-3xl font-semibold mb-2">{{ bookData?.volumeInfo.title }}</p>

          <p class="italic text-sm">
            by: <span class="uppercase font-semibold">{{ bookData?.volumeInfo.authors?.join(', ') }}</span>
          </p>
          <p class="text-md font-semibold self-center">Book ID: {{ id }}</p>
        </div>
        <div v-html="bookData?.volumeInfo.description" class="text-sm" />
        <div class="mb-4 md:mb-0 flex justify-between">
          <p class="text-lg font-semibold">Price: ${{ price }}</p>
          <div>
            <input
              name="quantity"
              value="1"
              type="number"
              min="1"
              class="w-16 p-2 text-center border border-gray-500 rounded-lg bg-gray-900 mr-2"
              placeholder="1" />
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" @click="addToCart">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <Toast position="bottom-center" group="bc" />
  </div>
</template>
