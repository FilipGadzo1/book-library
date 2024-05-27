<script setup lang="ts">
import success from '@/assets/lottie/success.json';
import { EmailService } from '@/email.service';
import { useCartStore } from '@/stores/cart';
import type { EmailTemplate, FormValues } from '@/types/book';
import { useToast } from 'primevue/usetoast';
import { Vue3Lottie } from 'vue3-lottie';

const cart = useCartStore();
const router = useRouter();
const toast = useToast();

const isSubmitting = ref(false);

const emailService = new EmailService(
  import.meta.env.VITE_EMAIL_SERVICE_ID,
  import.meta.env.VITE_EMAIL_TEMPLATE_ID,
  import.meta.env.VITE_EMAIL_USER_ID
);

async function onSubmit(data: FormValues) {
  isSubmitting.value = true;

  const template: EmailTemplate = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    address: data.address,
    city: data.city,
    zip: data.zip,
    price: cart.totalPrice,
    orderNumber: cart.orderNumber,
  };
  try {
    await emailService.sendEmail(template);
    cart.removeAllItemsFromCart();
    toast.add({
      severity: 'success',
      summary: 'Success Message',
      detail: `Book${cart.cartItemsCount > 1 ? 's' : ''} successfully purchased. Email confirmation will be sent to ${template.email}`,
      life: 3000,
    });
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Error Message',
      detail: `${error.text || 'An error occurred'}`,
      life: 3000,
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div v-if="isSubmitting">
    <Vue3Lottie
      class="mx-auto"
      :animationData="success"
      :height="200"
      :width="200"
      :loop="false"
      :speed="0.8"
      :autoPlay="true" />
  </div>
  <div v-else class="m-8">
    <div v-if="!cart.cartItemsCount">
      <EmptyPage />
    </div>
    <div v-else>
      <Button
        label="Back home"
        size="small"
        icon="pi pi-arrow-left"
        class="text-xs ml-10"
        @click="() => router.push('/')" />
      <ShoppingCartStepper @submit="onSubmit" />
    </div>
  </div>
</template>
