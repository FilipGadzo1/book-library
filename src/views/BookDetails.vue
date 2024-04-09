<script setup lang="ts">
import type { RootObject, VolumeInfo } from '@/types/book';

const props = defineProps<{ id: string }>();
const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
const bookData = ref<VolumeInfo>();

onBeforeMount(async () => {
  let data: RootObject = await fetch(`${apiUrl}/${props.id}`).then((res) => res.json());
  bookData.value = data.volumeInfo;
});
</script>

<template>
  <BookDetail :book-data="bookData" :id="id" />
</template>
