<template>
  <div class="text-center text-white">
    <img src="/empty-cart.webp" alt="Empty Cart" class="mx-auto w-44" />
    <p class="text-xl font-semibold mb-2">Your cart is empty</p>
    <p>Looks like you haven't added anything to your cart.</p>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg m-4">
      <router-link to="/">Explore books</router-link>
    </button>
  </div>
</template>
