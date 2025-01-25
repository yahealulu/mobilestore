import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ShoppingCart, Smartphone, User, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from './CurrencySwitcher';

export default function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { t } = useTranslation();

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Smartphone className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl">MobileStore</span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {/* Language and Currency Switchers */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <CurrencySwitcher />
            </div>

            {/* Account and Cart */}
            <Link 
              to="/account" 
              className="p-2 hover:text-indigo-600"
              aria-label={t('common.account')}
            >
              <User className="h-6 w-6" />
            </Link>
            <Link 
              to="/cart" 
              className="p-2 hover:text-indigo-600 relative"
              aria-label={t('common.cart')}
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}