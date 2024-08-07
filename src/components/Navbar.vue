<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const handleLogout = () => {
  store.dispatch('logout').then(() => {
    // Redirect to home or sign-in page after logout
    router.push('/signin');
  });
};
</script>

<template>
  <nav class="bg-green-700 border-b border-green-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <span class="hidden md:block text-white text-2xl font-bold ml-2">
              Learnly E-shop
            </span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/products"
                :class="[
                  isActiveLink('/products')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
              >
                Products
              </RouterLink>
              <RouterLink
                to="/products/add"
                :class="[
                  isActiveLink('/jobs/add')
                    ? 'bg-green-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
              >
                Add Products
              </RouterLink>
              <template v-if="!isAuthenticated">
                <RouterLink
                  to="/signin"
                  :class="[
                    isActiveLink('/signin')
                      ? 'bg-green-900'
                      : 'hover:bg-gray-900 hover:text-white',
                    'text-white',
                    'px-3',
                    'py-2',
                    'rounded-md',
                  ]"
                >
                  Sign In
                </RouterLink>
              </template>
              <template v-else>
                <button
                  @click="handleLogout"
                  class="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 "
                >
                  Log Out
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
