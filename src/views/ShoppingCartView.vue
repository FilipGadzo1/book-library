<script setup lang="ts">
import type CheckoutForm from '@/components/CheckoutForm.vue';
import { useCartStore } from '@/stores/cart';
import { useToast } from 'primevue/usetoast';
import emailjs from '@emailjs/browser';
import type { FormValues } from '@/types/book';
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';
import { Vue3Lottie } from 'vue3-lottie';
import success from '@/assets/lottie/success.json';

enum ScreenWidth {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

const cart = useCartStore();
const toast = useToast();

const screenWidth = ref(window.innerWidth);

const stepperOrientation = ref<ScreenWidth>(ScreenWidth.HORIZONTAL);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

window.addEventListener('resize', handleResize);

watch(
  () => screenWidth.value,
  (value) => {
    stepperOrientation.value = value > 768 ? ScreenWidth.HORIZONTAL : ScreenWidth.VERTICAL;
  }
);

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

function validateForm(data: FormValues, nextCallback: () => void) {
  formData.value = data;
  nextCallback();
}
const checkoutForm = ref<InstanceType<typeof CheckoutForm> | null>(null);

function clickToCheckout() {
  checkoutForm.value?.submit();
}

function onSubmit() {
  isSubmitting.value = true;
  const template = {
    firstName: formData.value?.firstName,
    lastName: formData.value?.lastName,
    email: formData.value?.email,
    address: formData.value?.address,
    city: formData.value?.city,
    zip: formData.value?.zip,
    price: cart.getTotalPrice,
  };
  emailjs
    .send('service_c1zjkzr', 'template_rqvh9rf', template, {
      publicKey: 'user_AxAtucXpLtym8PVqPywlf',
    })
    .then(
      () => {
        toast.add({
          severity: 'success',
          summary: 'Success Message',
          detail: `Book${cart.cartItemsCount > 1 ? 's' : ''} successfully purchased. Email confirmation will be sent to ${template.email}`,
          life: 3000,
        });
        cart.removeAllItemsFromCart();
      },
      (error) => {
        toast.add({
          severity: 'error',
          summary: 'Error Message',
          detail: `${error.text || 'An error occurred'}`,
          life: 3000,
        });
      }
    )
    .finally(() => {
      isSubmitting.value = false;
    });
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
    <div v-if="!cart.cartItemsCount" class="text-center text-white">
      <img src="/empty-cart.webp" alt="Empty Cart" class="mx-auto w-44" />
      <p class="text-xl font-semibold mb-2">Your cart is empty</p>
      <p>Looks like you haven't added anything to your cart.</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg m-4">
        <router-link to="/">Explore books</router-link>
      </button>
    </div>
    <div v-else>
      <Stepper
        :orientation="stepperOrientation"
        :pt="{
          panelContainer: {
            class: 'bg-gray-600 ',
          },
          nav: {
            class: ' mx-8',
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
          <template #content="">
            <div class="flex justify-center">
              <CheckoutDetails />
            </div>
            <div class="flex mt-2 justify-end">
              <Button label="Submit" icon="pi pi-check" iconPos="right" class="text-xs md:text-lg" @click="onSubmit" />
            </div>
          </template>
        </StepperPanel>
      </Stepper>
    </div>
  </div>
</template>
