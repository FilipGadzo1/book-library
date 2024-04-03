<template>
  <nav class="bg-gray-900">
    <div class="grid grid-cols-6 items-center p-4">
      <RouterLink to="/" class="flex gap-3">
        <img src="../assets//logo.webp" class="h-8" alt="Bookstore Logo" />
        <span class="self-center text-2xl font-semibold text-white"
          >Bookstore</span
        >
      </RouterLink>
      <div class="flex mt-2 font-medium gap-12 col-start-2 col-end-5">
        <RouterLink to="/" class="text-white">Home</RouterLink>
        <RouterLink to="/about" class="text-white"
          ><span>About</span></RouterLink
        >
      </div>
      <div class="flex justify-end mr-5 mt-2 col-start-6">
        <RouterLink to="/shopping-cart">
          <i class="pi pi-shopping-cart text-white relative">
            <Badge value="2" severity="info" class="absolute bottom-2 left-3" />
          </i>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.active {
  --tw-bg-opacity: 1;
  color: rgb(59 130 246 / var(--tw-bg-opacity));
}
</style>
