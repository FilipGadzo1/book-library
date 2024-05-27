<!-- WORK IN PROGRESS -->
<script setup lang="ts">
import type CheckoutForm from '@/components/CheckoutForm.vue';
import type { FormValues } from '@/types';
import { useWindowSize } from '@vueuse/core';
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';

defineEmits<{
  submit: [data: FormValues];
}>();

const { width } = useWindowSize();

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
</script>

<template>
  <Stepper
    linear
    :orientation="screenSize"
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
      <template #content="{ prevCallback }">
        <div class="md:w-1/2 md:mx-auto grid grid-cols-2 gap-4">
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
          <Button
            label="Submit"
            icon="pi pi-check"
            iconPos="right"
            class="text-xs md:text-lg"
            @click="$emit('submit', formData!)" />
        </div>
      </template>
    </StepperPanel>
  </Stepper>
</template>
