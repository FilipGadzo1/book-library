<script setup lang="ts">
const router = useRouter();

function backToSearch() {
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="flex flex-col gap-4 items-center justify-center h-[calc(100vh-153px)]">
    <img src="/not-found.svg" class="text-white" />
    <Button label="Back to search" severity="info" @click="backToSearch" />
  </div>
</template>
