<script setup>
import { useStore } from 'vuex';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import BackButton from '@/components/BackButton.vue';
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const store = useStore();

const state = reactive({
  product: {},
  isLoading: true,
});

const form = reactive({
  name: '',
  price: '',
  description: '',
  image: '',
});
const token = store.state.user;
const id = route.params.id;

const handleSubmit = async () => {
  const formData = new FormData();

  formData.append('name', form.name);
  formData.append('description', form.description);
  formData.append('price', form.price);

  if (form.image) {
    formData.append('image', form.image);
  }

  try {
    const response = await axios.patch(
      `http://localhost:8000/api/products/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    toast.success('Product Edited Successfully');
    router.push({ name: 'home' });
  } catch (error) {
    console.error('Error adding job', error);
    toast.error('Product Was Not Edted');
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    state.product = response.data;

    form.name = state.product.name || '';
    form.price = state.product.price || '';
    form.description = state.product.description || '';
    form.image = state.product.imageURL || '';
  } catch (error) {
    console.error('Error fetching product', error);
    toast.error('Failed to fetch product');
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <BackButton />
  <section v-if="!state.isLoading" class="bg-green-50">
    <div class="bg-green-50">
      <div class="container m-auto max-w-2xl py-24">
        <div
          class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form @submit.prevent="handleSubmit">
            <h2 class="text-3xl text-center font-semibold mb-6">
              Edit Product
            </h2>

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
              <label
                for="description"
                class="block text-gray-700 font-bold mb-2"
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
                Edit Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>
