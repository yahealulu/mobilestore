import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { Trash2, MinusCircle, PlusCircle, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.items);

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
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 0 ? 10 : 0; // Flat rate shipping
  const total = subtotal + tax + shipping;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  if (cartProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-2 text-gray-500">
            Looks like you haven't added any items to your cart yet.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg shadow">
            <ul className="divide-y divide-gray-200">
              {cartProducts.map(({ product, quantity, productId }) => (
                <li key={productId} className="p-6">
                  <div className="flex items-center">
                    <img
                      src={product?.images[0]}
                      alt={product?.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="ml-6 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {product?.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {product?.brand}
                          </p>
                        </div>
                        <p className="text-lg font-medium text-gray-900">
                          ${((product?.price || 0) * quantity).toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleQuantityChange(productId, quantity - 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <MinusCircle className="h-5 w-5" />
                          </button>
                          <span className="text-gray-600">{quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(productId, quantity + 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <PlusCircle className="h-5 w-5" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(productId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <dl className="mt-6 space-y-4">
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
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">
                  ${total.toLocaleString()}
                </dd>
              </div>
            </dl>

            <button
              onClick={() => navigate('/checkout')}
              className="mt-6 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}