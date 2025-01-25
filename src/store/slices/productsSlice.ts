import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  filters: {
    brand: string[];
    priceRange: [number, number];
  };
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  filters: {
    brand: [],
    priceRange: [0, 2000],
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setFilters: (state, action: PayloadAction<ProductsState['filters']>) => {
      state.filters = action.payload;
      state.filteredItems = state.items.filter(product => {
        const matchesBrand = state.filters.brand.length === 0 || 
          state.filters.brand.includes(product.brand);
        const matchesPrice = product.price >= state.filters.priceRange[0] && 
          product.price <= state.filters.priceRange[1];
        return matchesBrand && matchesPrice;
      });
    },
  },
});

export const { setProducts, setFilters } = productsSlice.actions;
export default productsSlice.reducer;