import React from "react";
import { useTranslation } from "react-i18next";
import NavTitle from "./NavTitle";

const Price = ({ onPriceRangeSelect, selectedPriceRange }) => {
  const { t } = useTranslation();
  const priceList = [
    {
      _id: 949,
      priceOne: null,
      priceTwo: null,
      label: "All Prices"
    },
    {
      _id: 950,
      priceOne: 0.0,
      priceTwo: 49.99,
    },
    {
      _id: 951,
      priceOne: 50.0,
      priceTwo: 99.99,
    },
    {
      _id: 952,
      priceOne: 100.0,
      priceTwo: 199.99,
    },
    {
      _id: 953,
      priceOne: 200.0,
      priceTwo: 399.99,
    },
    {
      _id: 954,
      priceOne: 400.0,
      priceTwo: 599.99,
    },
    {
      _id: 955,
      priceOne: 600.0,
      priceTwo: 1000.0,
    },
  ];
  return (
    <div className="cursor-pointer">
      <NavTitle title={t('products.priceRange')} icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {priceList.map((item) => (
            <li
              key={item._id}
              onClick={() => onPriceRangeSelect && onPriceRangeSelect(item.priceOne === null ? null : { min: item.priceOne, max: item.priceTwo })}
              className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 cursor-pointer transition-colors duration-300 hover:text-primeColor hover:border-gray-400 ${
                (item.priceOne === null && selectedPriceRange === null) || (selectedPriceRange && selectedPriceRange.min === item.priceOne && selectedPriceRange.max === item.priceTwo) ? 'text-primeColor font-semibold' : ''
              }`}
            >
              {item.label || `$${item.priceOne.toFixed(2)} - $${item.priceTwo.toFixed(2)}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;
