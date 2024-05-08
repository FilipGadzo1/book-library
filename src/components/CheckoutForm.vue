<script setup lang="ts">
import type { FormValues } from '@/types/book';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const emit = defineEmits<{
  submit: [values: FormValues, evt?: Event];
}>();

const { handleSubmit } = useForm<FormValues>({
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  },
  validationSchema: toTypedSchema(
    z.object({
      firstName: z.string().min(1, "First name can't be empty"),
      lastName: z.string().min(1, "Last name can't be empty"),
      email: z.string().email(),
      address: z.string().min(1, "Address can't be empty"),
      city: z.string().min(1, "City can't be empty"),
      zip: z.string().min(1, "Zip can't be empty").max(5, 'Zip code must be 5 digits'),
      cardNumber: z.string().min(1, "Card number can't be empty"),
      expDate: z.string().min(1, "Expiration date can't be empty"),
      cvv: z.string().min(1, "CVV can't be empty"),
    })
  ),
});

const onSubmit = handleSubmit((values, ctx) => {
  emit('submit', values, ctx.evt);
});

defineExpose({ submit: onSubmit });
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="text-white mb-4 border-gray-800 border rounded-lg p-4 bg-gray-700">
      <div class="md:flex gap-4 md:mb-4">
        <FormInputField name="firstName" placeholder="First Name" />
        <FormInputField name="lastName" placeholder="Last Name" />
      </div>
      <FormInputField name="email" placeholder="Email" />
    </div>

    <div class="text-white mb-4 border border-gray-800 rounded-lg p-4 bg-gray-700">
      <FormInputField name="address" placeholder="Address" />
      <div class="md:flex gap-4 md:mt-4">
        <FormInputField name="city" placeholder="City" />
        <FormInputField name="zip" placeholder="Zip" />
      </div>
    </div>

    <div class="text-white border border-gray-800 rounded-lg p-4 bg-gray-700">
      <div class="relative">
        <CardInputForm name="cardNumber" placeholder="4242 4242 4242 4242" />
      </div>
      <div class="md:flex gap-4 md:mt-4">
        <CardDateInputForm name="expDate" placeholder="MM/YY" />
        <CardCvvInputForm name="cvv" placeholder="CVV" />
      </div>
    </div>
  </form>
</template>
