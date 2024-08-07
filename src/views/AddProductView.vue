<script setup>
import { useStore } from 'vuex';
import router from '@/router';
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const form = reactive({
  name: '',
  price: '',
  description: '',
  image: null,
});

const toast = useToast();
const store = useStore();

const handleSubmit = async () => {
  const formData = new FormData();

  formData.append('name', form.name);
  formData.append('description', form.description);
  formData.append('price', form.price);

  if (form.image) {
    formData.append('image', form.image);
  }

  try {
    const token = store.state.user;
    const response = await axios.post(
      'http://localhost:8000/api/add-product',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    toast.success('Product Added Successfully');
    router.push({ name: 'home' });
  } catch (error) {
    console.error('Error adding job', error);
    toast.error('Product Was Not Added');
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
          <h2 class="text-3xl text-center font-semibold mb-6">Add Product</h2>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Product Name</label
            >
            <input
              type="text"
              v-model="form.name"
              id="name"
              name="name"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="e.g., carrot"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2"
              >Description</label
            >
            <textarea
              id="description"
              v-model="form.description"
              name="description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Fresh and nutritious"
            ></textarea>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Price</label>
            <input
              type="number"
              v-model="form.price"
              id="price"
              name="price"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="7000"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Image</label>
            <input
              type="file"
              @change="(event) => (form.image = event.target.files[0])"
              id="image"
              name="image"
              class="border rounded w-full py-2 px-3"
            />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
