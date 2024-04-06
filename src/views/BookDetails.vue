<script setup lang="ts">
import type { RootObject, VolumeInfo } from '@/types/book';
import * as $ from 'jquery';

const props = defineProps<{ id: string }>();
const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
const bookData = ref<VolumeInfo>();

onMounted(() => {
  $.ajax({
    url: `${apiUrl}/${props.id}`,
    type: 'GET',
    success: function (data: RootObject) {
      bookData.value = data.volumeInfo;
    },
    error: function (error) {
      console.error(error);
    },
  });
});
</script>

<template>
  <div>
    <h1>Book Details for ID: {{ bookData?.authors }}</h1>
    <img :src="bookData?.imageLinks.thumbnail" alt="" />
  </div>
</template>
