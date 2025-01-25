import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = useSelector((state: RootState) => 
    state.products.items.find(p => p.id === id)
  );

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-indigo-600 hover:text-indigo-500"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity }));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="relative">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-none w-20 h-20 rounded-lg overflow-hidden ${
                  currentImageIndex === index ? 'ring-2 ring-indigo-600' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-xl text-gray-500">{product.brand}</p>
          <p className="mt-4 text-3xl font-bold text-indigo-600">
            ${product.price.toLocaleString()}
          </p>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">Specifications</h2>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="bg-gray-50 px-4 py-3 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500 capitalize">
                    {key}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <label htmlFor="quantity" className="mr-2 text-gray-700">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-gray-900">
              Customer Reviews
            </h2>
            {product.reviews.length > 0 ? (
              <div className="mt-4 space-y-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating ? 'fill-current' : 'stroke-current'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.username}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-gray-500">No reviews yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}