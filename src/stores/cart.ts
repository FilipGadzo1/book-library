import type { VolumeInfo } from '@/types';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartList: [] as { item: Partial<VolumeInfo>; quantity: number }[],
  }),

  getters: {
    totalItems: (state) => state.cartList.length,
    booksInCart: (state) => state.cartList.map((item) => item.item),
  },

  actions: {
    addToCart(item: Partial<VolumeInfo>, quantity: number) {
      for (let i = 0; i < quantity; i++) {
        this.cartList.push({ item, quantity });
      }
    },
    removeFromCart(index: number) {
      this.cartList.splice(index, 1);
    },
  },
});
