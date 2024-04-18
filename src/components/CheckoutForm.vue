<script setup lang="ts">
import { useCartStore } from '@/stores/cart';

const router = useRouter();

const cart = useCartStore();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const address = ref('');
const city = ref('');
const zip = ref('');
const cardNumber = ref('');
const formattedCreditCardNumber = ref('');
const expDate = ref('');
const cvv = ref('');

function submitForm(e: any) {
  e.preventDefault();
  const formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    address: address.value,
    city: city.value,
    zip: zip.value,
    cardNumber: formattedCreditCardNumber.value,
    expDate: expDate.value,
    cvv: cvv.value,
  };
  console.log(formData);
  cart.removeAllItemsFromCart();
  router.push('/');
}

function formatCreditCardNumber(e: Event) {
  const input = e.target as HTMLInputElement;
  let trimmedValue = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  if (trimmedValue.length > 16) {
    trimmedValue = trimmedValue.slice(0, 16);
  }

  const formattedValue = [];

  for (let i = 0; i < trimmedValue.length; i += 4) {
    formattedValue.push(trimmedValue.substr(i, 4));
  }

  cardNumber.value = trimmedValue;
  formattedCreditCardNumber.value = formattedValue.join(' ');
}

function formatDate(e: Event) {
  const input = e.target as HTMLInputElement;
  let trimmedValue = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

  if (trimmedValue.length > 4) {
    trimmedValue = trimmedValue.slice(0, 4);
  }

  const formattedValue = [];

  for (let i = 0; i < trimmedValue.length; i += 2) {
    formattedValue.push(trimmedValue.substr(i, 2));
  }

  expDate.value = formattedValue.join('/');
}

function formatCvv(e: Event) {
  const input = e.target as HTMLInputElement;
  let trimmedValue = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

  if (trimmedValue.length > 3) {
    trimmedValue = trimmedValue.slice(0, 3);
  }

  cvv.value = trimmedValue;
}

function formatZip(e: Event) {
  const input = e.target as HTMLInputElement;
  let trimmedValue = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

  if (trimmedValue.length > 5) {
    trimmedValue = trimmedValue.slice(0, 5);
  }

  zip.value = trimmedValue;
}
</script>

<template>
  <form @submit="submitForm" class="md:w-2/3">
    <div class="text-white mb-4 border-gray-800 border rounded-lg p-4 bg-gray-700">
      <h2 class="text-white text-lg mb-2 font-bold">Contact Information</h2>
      <div class="flex gap-4 mb-4">
        <input type="text" id="first-name" v-model="firstName" placeholder="First Name" required />
        <input type="text" id="last-name" v-model="lastName" placeholder="Last Name" required />
      </div>
      <input type="email" id="email" v-model="email" placeholder="Emal" required />
    </div>

    <div class="text-white mb-4 border border-gray-800 rounded-lg p-4 bg-gray-700">
      <h2 class="text-white text-lg mb-2 font-bold">Shipping Information</h2>
      <input type="text" id="address" v-model="address" placeholder="Address" required />
      <div class="flex gap-4 mt-4">
        <input type="text" id="city" v-model="city" placeholder="City" required />

        <input type="text" id="zip" v-model="zip" placeholder="Zip code" required @input="formatZip" />
      </div>
    </div>

    <div class="text-white border border-gray-800 rounded-lg p-4 bg-gray-700">
      <h2 class="text-white text-lg mb-2 font-bold">Payment method</h2>
      <div class="relative">
        <input
          type="text"
          id="card-number"
          v-model="formattedCreditCardNumber"
          placeholder="4242 4242 4242 4242"
          @input="formatCreditCardNumber"
          required />
        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
          <svg fill="none" class="h-6 text-[#1434CB] dark:text-white" viewBox="0 0 36 21">
            <path
              fill="currentColor"
              d="M23.315 4.773c-2.542 0-4.813 1.3-4.813 3.705 0 2.756 4.028 2.947 4.028 4.332 0 .583-.676 1.105-1.832 1.105-1.64 0-2.866-.73-2.866-.73l-.524 2.426s1.412.616 3.286.616c2.78 0 4.966-1.365 4.966-3.81 0-2.913-4.045-3.097-4.045-4.383 0-.457.555-.957 1.708-.957 1.3 0 2.36.53 2.36.53l.514-2.343s-1.154-.491-2.782-.491zM.062 4.95L0 5.303s1.07.193 2.032.579c1.24.442 1.329.7 1.537 1.499l2.276 8.664h3.05l4.7-11.095h-3.043l-3.02 7.543L6.3 6.1c-.113-.732-.686-1.15-1.386-1.15H.062zm14.757 0l-2.387 11.095h2.902l2.38-11.096h-2.895zm16.187 0c-.7 0-1.07.37-1.342 1.016L25.41 16.045h3.044l.589-1.68h3.708l.358 1.68h2.685L33.453 4.95h-2.447zm.396 2.997l.902 4.164h-2.417l1.515-4.164z" />
          </svg>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-4">
        <input type="text" id="exp-date" v-model="expDate" placeholder="MM/YY" required @input="formatDate" />

        <input type="text" id="cvv" v-model="cvv" placeholder="CVV" required @input="formatCvv" />
      </div>
    </div>
    <div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-4">
        Place Order
      </button>
    </div>
  </form>
</template>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition:
    background-color 600000s 0s,
    color 600000s 0s;
}
input[data-autocompleted] {
  background-color: transparent !important;
}

input {
  @apply block w-full p-4 text-sm text-gray-200 border border-gray-500 rounded-lg placeholder-gray-400 bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent;
}
</style>
