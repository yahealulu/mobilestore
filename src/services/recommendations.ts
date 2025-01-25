import { db } from '../config/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { Product } from '../types';

export const getRecommendedProducts = async (userId: string, currentProductId: string): Promise<Product[]> => {
  try {
    // Get user's purchase history and preferences
    const userPreferences = await getUserPreferences(userId);
    
    // Query products based on user preferences
    const productsRef = collection(db, 'products');
    const q = query(
      productsRef,
      where('brand', 'in', userPreferences.preferredBrands),
      where('price', '>=', userPreferences.minPrice),
      where('price', '<=', userPreferences.maxPrice),
      where('id', '!=', currentProductId),
      limit(4)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
};

const getUserPreferences = async (userId: string) => {
  // This would typically come from a machine learning model or user behavior analysis
  // For now, we'll return some default preferences
  return {
    preferredBrands: ['Apple', 'Samsung'],
    minPrice: 500,
    maxPrice: 2000,
  };
};