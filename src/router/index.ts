import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import BookDetails from '@/views/BookDetails.vue';

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
      component: HomeView,
    },
    {
      path: '/book/:id',
      name: 'book-details',
      component: () => BookDetails,
      props: true,
    },
  ],
  linkActiveClass: 'active',
});

export default router;
