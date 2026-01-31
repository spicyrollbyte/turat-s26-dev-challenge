// Local storage utilities for cart and wishlist
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: string;
  inStock: boolean;
};

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  addedAt: Date;
};

export type WishlistItem = {
  id: string;
  productId: string;
  addedAt: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
};

const CART_KEY = 'ecommerce_cart';
const WISHLIST_KEY = 'ecommerce_wishlist';
const USER_KEY = 'ecommerce_user';

// Cart functions
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (productId: string): CartItem => {
  const cart = getCart();
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    throw new Error('Product already in cart');
  }
  
  const newItem: CartItem = {
    id: `cart_${Date.now()}_${Math.random()}`,
    productId,
    quantity: 1,
    addedAt: new Date()
  };
  
  cart.push(newItem);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return newItem;
};

export const updateCartQuantity = (itemId: string, quantity: number): CartItem => {
  const cart = getCart();
  const item = cart.find(i => i.id === itemId);
  
  if (!item) {
    throw new Error('Cart item not found');
  }
  
  item.quantity = quantity;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return item;
};

export const removeFromCart = (itemId: string): void => {
  const cart = getCart();
  const filtered = cart.filter(item => item.id !== itemId);
  localStorage.setItem(CART_KEY, JSON.stringify(filtered));
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};

// Wishlist functions
export const getWishlist = (): WishlistItem[] => {
  const wishlist = localStorage.getItem(WISHLIST_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
};

export const addToWishlist = (productId: string): WishlistItem => {
  const wishlist = getWishlist();
  const existingItem = wishlist.find(item => item.productId === productId);
  
  if (existingItem) {
    throw new Error('Product already in wishlist');
  }
  
  const newItem: WishlistItem = {
    id: `wish_${Date.now()}_${Math.random()}`,
    productId,
    addedAt: new Date()
  };
  
  wishlist.push(newItem);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  return newItem;
};

export const removeFromWishlist = (itemId: string): void => {
  const wishlist = getWishlist();
  const filtered = wishlist.filter(item => item.id !== itemId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtered));
};

export const isInWishlist = (productId: string): boolean => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.productId === productId);
};

export const clearWishlist = (): void => {
  localStorage.removeItem(WISHLIST_KEY);
};

// User/Auth functions
export const getUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const login = (name: string, email: string): User => {
  const user: User = {
    id: `user_${Date.now()}`,
    name,
    email,
    isLoggedIn: true
  };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const logout = (): void => {
  localStorage.removeItem(USER_KEY);
  clearCart();
  clearWishlist();
};

export const isLoggedIn = (): boolean => {
  const user = getUser();
  return user !== null && user.isLoggedIn;
};
