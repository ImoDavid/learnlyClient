<script setup>
import { useStore } from 'vuex';
import router from '@/router';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const form = reactive({
  name: '',
  email: '',
  price: '',
});

const toast = useToast();
const store = useStore();

const handleSubmit = async () => {
  const payload = {
    name: form.name,
    email: form.email,
    password: form.password,
  };

  try {
    const response = await axios.post(
      'http://localhost:8000/api/signin',
      payload,
    );
    store.dispatch('login', response.data.token);
    toast.success('user signin Successfully');
    router.push({ name: 'home' });
  } catch (error) {
    console.error('Error fetching job', error);
    toast.error(error.message);
  }
};
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Sign In</h2>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">name</label>
            <input
              type="text"
              v-model="form.name"
              id="name"
              name="name"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="gabsy fernans"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Email </label>
            <input
              type="email"
              v-model="form.email"
              id="email"
              name="email"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="example@yourmail.com"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> password </label>
            <input
              type="password"
              v-model="form.password"
              id="password"
              name="password"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder=""
              required
            />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
