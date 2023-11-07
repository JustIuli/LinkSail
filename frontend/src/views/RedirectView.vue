<template>
  <div class="min-h-screen flex items-center justify-center text-white">
    <div class="p-2">
      <div class="bg-[#242a30] rounded-lg shadow-md p-4 text-center">
        <h1 class="text-2xl font-semibold mb-4">Redirecting in <span class="text-primary font-bold">{{ countdown }}</span> seconds...</h1>
        <p>Please wait while we redirect you to the <span class="text-primary font-bold">{{ fetchedData.linkUrl }}</span></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref , reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

interface FetchedData {
  linkUrl: string;
  linkVisits: number;
  shortenedLink: string;
  uniqueId: string;
}

const countdown = ref(3);
const fetchedData = reactive<FetchedData>({
  linkUrl: '',
  linkVisits: 0,
  shortenedLink: '',
  uniqueId: '',
});

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  const id = route.params.linkId;

  try {
    const response = await axios.get(`https://linksail-api.adaptable.app/api/a/${id}`);
    Object.assign(fetchedData, response.data[0]);
    const linkVisits = fetchedData.linkVisits;

    console.log(linkVisits);

    await axios.post(`https://linksail-api.adaptable.app/api/l/visit/${id}`, { linkVisits }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }

  const timer = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value === 0) {
      clearInterval(timer);
      window.location.href = fetchedData.linkUrl;
    }
  }, 3000);
});
</script>

<style scoped>
</style>
