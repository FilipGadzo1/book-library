<script setup lang="ts">
import { RouterView } from 'vue-router';
const route = useRoute();
</script>

<template>
  <header>
    <NavigationBar />
  </header>

  <RouterView v-slot="{ Component }">
    <Transition name="page-slide" mode="out-in">
      <div :key="route.fullPath" class="mt-20">
        <component :is="Component" />
      </div>
    </Transition>
  </RouterView>
</template>

<style>
.page-slide-enter-active,
.page-slide-leave-active {
  transition: 400ms ease all;
}

.page-slide-enter-from,
.page-slide-leave-to {
  opacity: 0;
  transform: translateY(60px);
}
</style>
