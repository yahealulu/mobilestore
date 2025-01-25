import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { RootState } from '../store';
import { clearCart } from '../store/slices/cartSlice';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.items);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const cartProducts = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product,
    };
  }).filter(item => item.product);

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const shipping = 10;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // In a real app, you would make an API call to your backend to create a payment intent
      // and handle the payment confirmation. This is just a simulation.
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful payment
      dispatch(clearCart());
      navigate('/account', { 
        state: { 
          success: true, 
          message: 'Order placed successfully!' 
        } 
      });
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartProducts.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-6">
                <Truck className="h-6 w-6 text-indigo-600" />
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={shippingAddress.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    required
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="h-6 w-6 text-indigo-600" />
                <h2 className="text-lg font-medium text-gray-900">
                  Payment Information
                </h2>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-gray-600">
                    Your payment information is encrypted and secure
                  </p>
                </div>
                {/* Stripe Elements will be mounted here in production */}
                <div className="mt-4 grid gap-4">
                  <input
                    type="text"
                    placeholder="Card number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2 ${
                isProcessing ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? 'Processing...' : `Pay $${total.toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <ul className="mt-6 space-y-4">
              {cartProducts.map(({ product, quantity }) => (
                <li key={product?.id} className="flex items-center gap-4">
                  <img
                    src={product?.images[0]}
                    alt={product?.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {product?.name}
                    </h3>
                    <p className="text-sm text-gray-500">Qty: {quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${((product?.price || 0) * quantity).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${subtotal.toLocaleString()}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Tax (10%)</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${tax.toLocaleString()}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Shipping</dt>
                <dd className="text-sm font-medium text-gray-900">
                  ${shipping.toLocaleString()}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Total</dt>
                <dd className="text-base font-medium text-gray-900">
                  ${total.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}