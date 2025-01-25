import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Sample data - In a real app, this would come from an API
const sampleProducts = [
  {
    id: '1',
    name: 'iPhone 14',
    brand: 'Apple',
    price: 799,
    description: 'Powerful A15 Bionic chip and amazing camera system',
    images: ['https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1'],
    specs: {
      display: '6.1" Super Retina XDR',
      processor: 'A15 Bionic',
      ram: '6GB',
      storage: '128GB',
      camera: '12MP Dual Camera',
      battery: '3279mAh',
    },
    reviews: [],
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 1199,
    description: 'Ultimate Android experience with AI features',
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c'],
    specs: {
      display: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '512GB',
      camera: '200MP Main',
      battery: '5000mAh',
    },
    reviews: [],
  },
  
  {
    id: '4',
    name: 'Samsung Galaxy S24+',
    brand: 'Samsung',
    price: 999,
    description: 'Premium performance with advanced AI',
    images: ['https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3'],
    specs: {
      display: '6.7" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      camera: '50MP Main',
      battery: '4900mAh',
    },
    reviews: [],
  },
  {
    id: '5',
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    price: 999,
    description: 'Pro camera system and Dynamic Island',
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569'],
    specs: {
      display: '6.1" Super Retina XDR',
      processor: 'A16 Bionic',
      ram: '6GB',
      storage: '256GB',
      camera: '48MP Main',
      battery: '3200mAh',
    },
    reviews: [],
  },
  {
    id: '6',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    price: 799,
    description: 'Flagship features at a great value',
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf'],
    specs: {
      display: '6.2" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      ram: '8GB',
      storage: '128GB',
      camera: '50MP Main',
      battery: '4000mAh',
    },
    reviews: [],
  }
];

export default function ProductList() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(setProducts(sampleProducts));
  }, [dispatch]);

  const { items } = useSelector((state: RootState) => state.products);

  const filteredProducts = items.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesBrand && matchesPrice;
  });

  const brands = Array.from(new Set(items.map(product => product.brand)));
  const maxPrice = Math.max(...items.map(product => product.price));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('products.title')}</h1>
        
        {/* Search and Filter Controls */}
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brand Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Brand</h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(selectedBrands.filter(b => b !== brand));
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Min</label>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      min="0"
                      max={priceRange[1]}
                      className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Max</label>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      min={priceRange[0]}
                      max={maxPrice}
                      className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}