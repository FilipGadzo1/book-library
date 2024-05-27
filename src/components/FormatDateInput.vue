<script setup lang="ts">
const { formatDate } = useFormat();
const { setValue } = useField('expDate');
</script>

<template>
  <FormInputField name="expDate" placeholder="MM/YY" @input="(e) => setValue(formatDate(e))" />
</template>
