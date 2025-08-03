import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { useTranslation } from "react-i18next";

const ProductInfo = ({ productInfo }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.des}</p>
      <p className="text-sm">{t('products.firstReview')}</p>
      <p className="font-medium text-lg">
        <span className="font-normal">{t('common.color')}:</span> {productInfo.color}
      </p>
      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo.id,
              name: productInfo.productName,
              quantity: 1,
              image: productInfo.img,
              badge: productInfo.badge,
              price: productInfo.price,
              colors: productInfo.color,
            })
          )
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        {t('common.addToCart')}
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> {t('products.categories')}:</span> {t('products.springCollection')},
        {t('products.streetwear')}, {t('products.women')} {t('products.tags')}: {t('products.featured')} {t('products.sku')}: {t('products.notAvailable')}
      </p>
    </div>
  );
};

export default ProductInfo;
