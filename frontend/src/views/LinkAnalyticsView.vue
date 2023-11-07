<template>
  <div class="min-h-screen flex items-center justify-center text-white">
    <div class="p-4">
      <div class="bg-[#242a30] rounded-lg shadow-md p-4">
        <h1 class="text-2xl font-semibold mb-4">
          Link
          <span class="text-primary">Analytics</span>
        </h1>

        <!-- Input Link ID -->
        <div class="mb-4">
          <form @submit.prevent="validateForm" action="">
            <div class="flex flex-col">
              <label for="linkId" class="text-lg font-semibold mr-4">Enter Link</label>
              <input v-model="linkUrl" id="linkId" class="input input-bordered mt-4" placeholder="Enter a link" />
              <button type="submit" class="btn btn-outline mt-2 border-primary border-2 hover:bg-primaryDark hover:border-0 hover:text-white">Submit</button>
            </div>
          </form>
          <div v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div> <!-- Error message -->
        </div>

        <!-- Display Analytics Data -->
        <div v-if="fetchedDataRef.uniqueId">
          <div class="mb-4">
              <h2 class="text-lg font-semibold">Link ID:</h2>
              <p>{{ fetchedDataRef.uniqueId }}</p>
            </div>
            <div class="mb-4">
              <h2 class="text-lg font-semibold">Original Link:</h2>
              <a :href="fetchedDataRef.linkUrl" class="text-primary hover:underline">{{ fetchedDataRef.linkUrl }}</a>
            </div>
            <div class="mb-4">
              <h2 class="text-lg font-semibold">Link Visits:</h2>
              <p class="text-primary">{{ fetchedDataRef.linkVisits }}</p>
            </div>
        </div>

        <!-- New Link Link -->
        <router-link to="/" class="block text-primary font-semibold mt-4 hover:underline">Shorten a New Link</router-link>
      </div>
    </div>
  </div>
</template>

  
  <script setup lang="ts">
  import axios from 'axios';
  import { ref } from 'vue';
  
  interface FetchedData {
    linkUrl: string;
    linkVisits: number;
    uniqueId: string;
  }
  
  const linkUrl = ref('');
  const linkId = ref('');
  const errorMessage = ref('');

  const fetchedDataRef = ref<FetchedData>({
    linkUrl: '',
    linkVisits: 0,
    uniqueId: '',
  });
  
  const validateForm = () => {
    if (linkUrl.value) {
      const formatLink = linkUrl.value.split('/');
      if (formatLink.length >= 5) {
        linkId.value = formatLink[4];
        fetchAnalytics();
      } else {
        errorMessage.value = 'Invalid link format';
      }
    } else {
      errorMessage.value = 'Please enter a link';
    }
  };
  
  const fetchAnalytics = () => {
    axios
      .get(`https://linksail-api.adaptable.app/api/a/${linkId.value}`)
      .then((response) => {
        fetchedDataRef.value = response.data[0];
      })
      .catch((err) => {
        console.error(err);
      });
  };
  </script>
  
  <style scoped>
  </style>
  
