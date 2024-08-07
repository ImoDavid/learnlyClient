<script setup>
import { RouterLink } from 'vue-router';
import { reactive, defineProps, onMounted, computed } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import ProductListing from './ProductListing.vue';

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  products: [],
  isLoading: true,
  searchQuery: '',
});

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/products');
    state.products = response.data;
  } catch (error) {
    console.error('Error fetching jobs', error);
  } finally {
    state.isLoading = false;
  }
});
const filteredProducts = computed(() =>
  state.products.filter((product) =>
  product.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
  ),
);
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Products
      </h2>
      <div class="mb-6 flex justify-center items-center gap-3">
        <input
          type="text"
          id="name"
          name="name"
          class="border rounded py-2 px-3 sm:w-[500px] w-[60%]"
          placeholder="search here..."
          v-model="state.searchQuery"
          required
        />
        <div>
          <button
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            search
          </button>
        </div>
      </div>
      <!-- Show loading spinner while loading is true -->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!-- Shoe job listing when done loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductListing
          v-for="product in filteredProducts.slice(0, limit || state.products.length)"
          :key="product._id"
          :product="product"
        />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Products</RouterLink
    >
  </section>
</template>
