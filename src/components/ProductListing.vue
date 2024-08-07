<script setup>
import { useStore } from 'vuex';
import { RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import { defineProps, ref, computed } from 'vue';
import axios from 'axios';

const props = defineProps({
  product: Object,
});

const toast = useToast();
const store = useStore();

const showFullDescription = ref(false);

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

const truncatedDescription = computed(() => {
  let description = props.product.description;
  if (!showFullDescription.value) {
    description = description.substring(0, 90) + '...';
  }
  return description;
});
const deleteProduct = async (id) => {
  try {
    const token = store.state.user;
    const response = await axios.delete(
      'http://localhost:8000/api/products/' + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    window.location.reload();
    toast.success('product deleted successfully');
  } catch (error) {
    console.error('Error fetching job', error);
    toast.error(error.message);
  }
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative max-h-[400px]">
    <img
      :src="product.imageURL"
      alt="product image"
      class="rounded-t-xl w-full h-40 object-cover"
    />
    <div class="p-4">
      <div class="mb-3">
        <h3 class="text-xl font-bold">{{ product.name }}</h3>
      </div>

      <div class="mb-1">
        <div>
          {{ truncatedDescription }}
        </div>
        <button
          @click="toggleFullDescription"
          class="text-green-500 hover:text-green-600"
        >
          {{ showFullDescription ? 'Less' : 'More' }}
        </button>
      </div>

      <h3 class="text-green-500 mb-2">${{ product.price }}</h3>

      <div class="border border-gray-100 mb-2"></div>

      <div class="flex flex-col lg:flex-row justify-between p-2">
        <RouterLink
          :to="'/products/' + product._id"
          class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Edit
        </RouterLink>
        <Button
          @click="deleteProduct(product._id)"
          :disabled="isDeleting"
          class="h-[36px] bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Delete
        </Button>
      </div>
    </div>
  </div>
</template>
