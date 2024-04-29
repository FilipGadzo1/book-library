import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CheckoutPage from '@/components/CheckoutPage.vue';

const router = createRouter({
  history: createWebHistory(),
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
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutPage,
    },
  ],
  linkActiveClass: 'active',
});

export default router;
