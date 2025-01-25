import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-lg font-bold text-indigo-600">
              ${product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}