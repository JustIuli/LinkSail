<template>
    <div class="min-h-screen flex items-center justify-center text-white">
      <div class="p-12">
        <div class="bg-[#242a30] rounded-lg shadow-md p-4">
          <div v-if="fetchedData.uniqueId">
            <div class="mb-4">
              <h2 class="text-lg font-semibold">Link ID:</h2>
              <p>{{ fetchedData.uniqueId }}</p>
            </div>
            <div class="mb-4">
              <h2 class="text-lg font-semibold">Original Link:</h2>
              <a :href="fetchedData.linkUrl" class="text-primary hover:underline">{{ fetchedData.linkUrl }}</a>
            </div>
            <div class="mb-4">
              <h2 class="text-lg font-semibold">Link Visits:</h2>
              <p class="text-primary">{{ fetchedData.linkVisits }}</p>
            </div>
            <div class="mb-4">
              <h2 class="text-lg font-semibold">Shortened Link:</h2>
              <a :href="fetchedData.shortenedLink" class="text-white hover:underline">{{ fetchedData.shortenedLink }}</a>
            </div>
          </div>
          <router-link to="/" class="block text-primary font-semibold mt-4 hover:underline">Shorten a New Link</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  interface FetchedData {
    linkUrl: string;
    linkVisits: number;
    shortenedLink: string;
    uniqueId: string;
  }
  
  const fetchedData = ref<FetchedData>({
    linkUrl: '',
    linkVisits: 0,
    shortenedLink: '',
    uniqueId: '',
  });
  
  const route = useRoute();
  
  onMounted(async () => {
    const id = route.params.linkId;
    try {
      const response = await axios.get(`https://linksail-api.adaptable.app/api/a/${id}`);
      fetchedData.value = response.data[0];
    } catch (err) {
      console.error(err);
    }
  });
  </script>
  
  <style scoped>
  </style>
  
