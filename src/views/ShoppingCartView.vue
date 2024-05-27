<script setup lang="ts">
import type CheckoutForm from '@/components/CheckoutForm.vue';
import { useCartStore } from '@/stores/cart';
import type { EmailTemplate, FormValues } from '@/types/book';
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';
import { Vue3Lottie } from 'vue3-lottie';
import success from '@/assets/lottie/success.json';
import { useWindowSize } from '@vueuse/core';
import { EmailService } from '@/email.service';
import { useToast } from 'primevue/usetoast';

const { width } = useWindowSize();
const cart = useCartStore();
const router = useRouter();
const toast = useToast();

const iPadSize = 768;
const stepperPanelDesign = {
  number: {
    class: 'bg-gray-600',
  },
  panel: {
    class: 'bg-gray-600',
  },
  title: {
    class: 'text-white',
  },
  toggleableContent: {
    class: 'bg-gray-600 ',
  },
  action: {
    class: 'bg-gray-700 p-2',
  },
};

const formData = ref<FormValues>();
const isSubmitting = ref(false);
const checkoutForm = ref<InstanceType<typeof CheckoutForm> | null>(null);

const screenSize = computed(() => {
  if (width.value < iPadSize) {
    return 'vertical';
  }

  return 'horizontal';
});

function validateForm(data: FormValues, nextCallback: () => void) {
  formData.value = data;
  nextCallback();
}

function clickToCheckout() {
  checkoutForm.value?.submit();
}

const emailService = new EmailService(
  import.meta.env.VITE_EMAIL_SERVICE_ID,
  import.meta.env.VITE_EMAIL_TEMPLATE_ID,
  import.meta.env.VITE_EMAIL_USER_ID
);

async function onSubmit() {
  isSubmitting.value = true;

  const template: EmailTemplate = {
    firstName: formData.value?.firstName,
    lastName: formData.value?.lastName,
    email: formData.value?.email,
    address: formData.value?.address,
    city: formData.value?.city,
    zip: formData.value?.zip,
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
      <Stepper
        linear
        :orientation="screenSize"
        :pt="{
          panelContainer: {
            class: 'bg-gray-600 ',
          },
          nav: {
            class: 'md:mx-8',
          },
        }">
        <StepperPanel header="Shopping Cart" :pt="stepperPanelDesign">
          <template #content="{ nextCallback }">
            <ShoppingCart />

            <div class="flex mt-2 justify-end">
              <Button
                label="Personal Info"
                icon="pi pi-arrow-right"
                severity="info"
                iconPos="right"
                class="text-xs md:text-lg"
                @click="nextCallback" />
            </div>
          </template>
        </StepperPanel>
        <StepperPanel header="Shipping Address" :pt="stepperPanelDesign">
          <template #content="{ prevCallback, nextCallback }">
            <div class="flex justify-center">
              <CheckoutForm ref="checkoutForm" @submit="(values, e) => validateForm(values, () => nextCallback(e!))" />
            </div>
            <div class="flex pt-4 justify-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                class="text-xs md:text-lg"
                @click="prevCallback" />
              <Button
                label="Checkout"
                icon="pi pi-arrow-right"
                severity="info"
                class="text-xs md:text-lg"
                iconPos="right"
                @click="clickToCheckout" />
            </div>
          </template>
        </StepperPanel>
        <StepperPanel header="Confirmation" :pt="stepperPanelDesign">
          <template #content="{ prevCallback }">
            <div class="md:w-1/2 md:mx-auto md:grid md:grid-cols-2 md:gap-4 flex flex-col gap-4">
              <ShippingDetails />
              <CheckoutDetails />
            </div>
            <div class="flex mt-2 justify-between">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                class="text-xs md:text-lg"
                @click="prevCallback" />
              <Button label="Submit" icon="pi pi-check" iconPos="right" class="text-xs md:text-lg" @click="onSubmit" />
            </div>
          </template>
        </StepperPanel>
      </Stepper>
    </div>
  </div>
</template>
