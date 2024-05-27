<script setup lang="ts">
const { formatCreditCardNumber } = useFormat();
const { setValue } = useField('cardNumber');
</script>

<template>
  <FormInputField
    name="cardNumber"
    placeholder="4242 4242 4242 4242"
    @input="(e) => setValue(formatCreditCardNumber(e))" />
</template>
