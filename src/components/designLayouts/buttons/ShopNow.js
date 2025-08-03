import React from "react";
import { useTranslation } from "react-i18next";

const ShopNow = () => {
  const { t } = useTranslation();
  
  return (
    <button className="bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold">
      {t('common.shopNow')}
    </button>
  );
};

export default ShopNow;
