import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/shopping-cart',
      name: 'shopping-cart',
      component: () => import('@/views/ShoppingCartView.vue'),
    },
    {
      path: '/book/:id',
      name: 'book-details',
      component: () => import('@/views/BookDetailsView.vue'),
      props: true,
    },
  ],
  linkActiveClass: 'active',
});

export default router;
