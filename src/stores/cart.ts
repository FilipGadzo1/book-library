import type { BookObject, FormValues } from '@/types';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartList: [] as BookObject[],
    orderNumber: 1,
    shippingInfo: {} as FormValues,
  }),

  getters: {
    cartItemsCount: (state) => state.cartList.length,
    cartItems: (state) => state.cartList.map((item) => item),
    totalPrice: (state) => state.cartList.reduce((acc, item) => acc + item.price * item.quantity, 0),
  },

  actions: {
    findItem(id: string) {
      return this.cartList.find((item) => item.id === id);
    },
    addToCart(book: BookObject, quantity: number) {
      const item = this.findItem(book.id);
      if (item) {
        item.quantity += quantity;
      } else {
        if (!book.quantity) book.quantity = 1;

        this.cartList.push(book);
      }
    },
    incrementQuantity(book: BookObject) {
      const item = this.findItem(book.id);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity(book: BookObject) {
      const item = this.findItem(book.id);
      if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
          this.removeFromCart(book);
        }
      }
    },
    removeFromCart(book: BookObject) {
      this.cartList = this.cartList.filter((item) => item.id !== book.id);
    },
    removeAllItemsFromCart() {
      this.cartList = [];
      this.orderNumber += 1;
    },
    setShippingInfo(info: FormValues) {
      this.shippingInfo = info;
    },
  },
  persist: true,
});
