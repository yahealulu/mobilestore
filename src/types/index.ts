export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  images: string[];
  specs: {
    display: string;
    processor: string;
    ram: string;
    storage: string;
    camera: string;
    battery: string;
  };
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}