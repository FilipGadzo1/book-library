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
    addToCart(book: BookObject, quantity: number) {
      const index = this.cartList.findIndex((item) => item.id === book.id);
      if (index !== -1) {
        this.cartList[index].quantity += quantity;
      } else {
        if (!book.quantity) book.quantity = 1;
        this.cartList.push(book);
      }
    },
    incrementQuantity(book: BookObject) {
      const index = this.cartList.findIndex((item) => item.id === book.id);
      if (index !== -1) {
        this.cartList[index].quantity++;
      }
    },
    decrementQuantity(book: BookObject) {
      const index = this.cartList.findIndex((item) => item.id === book.id);
      if (index !== -1) {
        this.cartList[index].quantity--;
      }
      if (this.cartList[index].quantity <= 0) {
        this.removeFromCart(book);
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
