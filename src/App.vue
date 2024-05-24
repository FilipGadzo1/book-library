<script setup lang="ts">
import { RouterView } from 'vue-router';
import Toast from 'primevue/toast';

const route = useRoute();
</script>

<template>
  <header>
    <NavigationBar />
  </header>
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="page-slide" mode="out-in">
        <div :key="route.fullPath" class="mt-20">
          <component :is="Component" />
        </div>
      </Transition>
    </RouterView>
  </main>
  <Toast position="bottom-center" />
</template>
