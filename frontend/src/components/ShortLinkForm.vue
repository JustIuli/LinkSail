<template>
    <div class="min-h-screen flex items-center justify-center text-white">
      <div class="form-container">
        <h1 class="text-center">Create a short link</h1>
        <div class="join">
          <form @submit.prevent="validateForm">
            <input v-model="formData.inputLink" class="input input-bordered join-item" name="link" id="link" placeholder="Paste link" />
            <button class="btn join-item bg-primary border-primary hover:bg-primaryDark rounded-r-full">Shorten</button>
          </form>
        </div>
        <p class="m-2 text-center">OR</p>
        <router-link to="/a" class="text-primary font-bold text-lg text-center">View analytics for a short URL</router-link>
  
        <div v-if="showError" class="toast toast-top toast-center">
          <div class="alert alert-error">
            <span>Please enter a valid link</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  
  import { ref ,computed } from 'vue';
  import axios from 'axios';
  import { AxiosResponse } from 'axios';

  interface FormData {
    inputLink: string;
  }
  
  const formData = ref<FormData>({
    inputLink: '',
  });
  
  const showError = computed(() => error.value);


  const sendForm = () => {
  axios
    .post('https://linksail-api.adaptable.app/api/c', formData.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response: AxiosResponse) => {
      console.log(response);
      if (response.status === 200) {
        window.location.href = response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

  const error = ref(false);
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  const validateForm = () => {
    if (urlPattern.test(formData.value.inputLink)) {
      sendForm();
    } else {
      error.value = true;
      setTimeout(() => {
        error.value = false;
      }, 2500);
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap');
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  font-family: 'Quicksand', sans-serif;
}
.form-container h1 {
  margin: 15px;
  font-size: 25px;
}

@media only screen and (min-width: 768px) {
  /* For desktop: */
  .containerApp h1 {
    font-size: 35px;
  }
  p {
    margin: 10px;
  }
}
</style>
