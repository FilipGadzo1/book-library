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
      path: '/about',
      name: 'about',
      component: HomeView,
    },
    {
      path: '/shopping-cart',
      name: 'shopping-cart',
      component: () => import('@/views/ShoppingCart.vue'),
    },
    {
      path: '/book/:id',
      name: 'book-details',
      component: () => import('@/views/BookDetails.vue'),
      props: true,
    },
  ],
  linkActiveClass: 'active',
});

export default router;
