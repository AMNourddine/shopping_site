import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/orebiSlice';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.orebiReducer.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(setLanguage(lng));
    
    // Update document direction and font
    const html = document.documentElement;
    if (lng === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.classList.add('rtl');
      html.classList.remove('ltr');
      html.style.fontFamily = 'Noto Sans Arabic, Arial, sans-serif';
    } else {
      html.setAttribute('dir', 'ltr');
      html.classList.add('ltr');
      html.classList.remove('rtl');
      html.style.fontFamily = 'DM Sans, sans-serif';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 text-sm rounded transition-colors ${
          currentLanguage === 'en'
            ? 'bg-primeColor text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('ar')}
        className={`px-3 py-1 text-sm rounded transition-colors ${
          currentLanguage === 'ar'
            ? 'bg-primeColor text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        عربي
      </button>
    </div>
  );
};

export default LanguageSwitcher;