import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../store/slices/settingsSlice';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    dispatch(setLanguage(newLang));
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
      aria-label="Toggle language"
    >
      <Globe className="h-5 w-5 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">
        {i18n.language === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
}