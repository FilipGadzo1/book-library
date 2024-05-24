<script setup lang="ts">
const emit = defineEmits(['search']);

const query = ref('');

function search(e: any) {
  e.preventDefault();
  emit('search', query.value);
}
</script>

<template>
  <form class="md:max-w-md md:mx-auto mx-4" type="submit">
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <i class="pi pi-search text-gray-400"></i>
      </div>
      <input
        name="search"
        type="search"
        v-model="query"
        :unstyled="true"
        class="block w-full p-4 ps-10 text-sm text-gray-200 border border-gray-500 rounded-lg placeholder-gray-400 bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
        placeholder="Search for books..."
        required />
      <button
        type="submit"
        class="absolute end-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 bg-blue-500 hover:bg-blue-700 focus:ring-blue-800"
        @click="search">
        Search
      </button>
    </div>
  </form>
</template>
