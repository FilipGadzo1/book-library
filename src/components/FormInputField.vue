<script setup lang="ts">
import { ErrorMessage } from 'vee-validate';

const props = defineProps<{
  name: string;
  placeholder?: string;
}>();

const { formatZip, formatCreditCardNumber, formatCvv, formatDate } = useFormat();

const { value, setValue } = useField(() => props.name);

function format(name: string, e: Event) {
  if (name === 'zip') {
    return setValue(formatZip(e), true);
  } else if (name === 'cardNumber') {
    return setValue(formatCreditCardNumber(e), true);
  } else if (name === 'expDate') {
    return setValue(formatDate(e), true);
  } else if (name === 'cvv') {
    return setValue(formatCvv(e), true);
  } else {
    return undefined;
  }
}
</script>

<template>
  <div class="w-full">
    <input type="text" :name="name" v-model="value" :placeholder="placeholder" @input="(e) => format(name, e)" />
    <div class="min-h-[20px]">
      <ErrorMessage :name="name" class="text-red-500 text-xs" />
    </div>
  </div>
</template>

<style scoped>
input {
  @apply block w-full p-4 text-sm text-gray-200 border border-gray-500 rounded-lg placeholder-gray-400 bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent;
}
</style>
