<script setup lang="ts">
import type { BookObject } from '@/types';
import { useVModel } from '@vueuse/core';
const props = defineProps<{
  visible: boolean;
  bookData?: BookObject;
}>();

defineEmits<{
  cancel: [];
}>();

const isModalVisible = useVModel(props, 'visible');
</script>

<template>
  <Dialog v-model:visible="isModalVisible" modal :header="bookData?.volumeInfo.title" class="w-[90%] md:w-[50%]">
    <template #container>
      <div class="bg-gray-700 border-none rounded-xl">
        <div class="flex justify-end">
          <Button icon="pi pi-times" class="text-white hover:bg-gray-500" text rounded @click="$emit('cancel')" />
        </div>
        <BookDetail :book-data="bookData" @cancel="$emit('cancel')" />
      </div>
    </template>
  </Dialog>
</template>
