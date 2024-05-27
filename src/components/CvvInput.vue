<script setup lang="ts">
const { formatCvv } = useFormat();
const { setValue } = useField('cvv');
</script>

<template>
  <FormInputField name="cvv" placeholder="CVV" @input="(e) => setValue(formatCvv(e))" />
</template>
