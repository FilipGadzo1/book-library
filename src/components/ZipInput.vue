<script setup lang="ts">
const { formatZip } = useFormat();
const { setValue } = useField('zip');
</script>

<template>
  <FormInputField name="zip" placeholder="Zip Code" @input="(e) => setValue(formatZip(e))" />
</template>
