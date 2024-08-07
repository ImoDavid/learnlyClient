import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProductsView from '@/views/products.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import SignInView from '@/views/signInView.vue';
import store from '@/store';
import ProductView from '@/views/ProductView.vue';
import AddProductView from '@/views/AddProductView.vue';
import EditProductView from '@/views/EditProductView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
    },
    {
      path: '/products/:id',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/products/add',
      name: 'add-product',
      component: AddProductView,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next({ name: 'signin' });
        }
      },
    },
    {
      path: '/products/edit/:id',
      name: 'edit-product',
      component: EditProductView,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next({ name: 'signin' });
        }
      },
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
