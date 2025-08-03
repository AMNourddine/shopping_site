import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { useTranslation } from "react-i18next";
import NavTitle from "./NavTitle";

const Category = ({ onCategorySelect, selectedCategory }) => {
  const { t } = useTranslation();
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const items = [
    {
      _id: 990,
      titleKey: "nav.home",
      category: "",
      icons: false,
    },
    {
      _id: 991,
      titleKey: "footer.categories.gadgets",
      category: "gadgets",
      icons: false,
    },
    {
      _id: 992,
      titleKey: "footer.categories.accessories",
      category: "accessories",
      icons: false,
    },
    {
      _id: 993,
      titleKey: "footer.categories.electronics",
      category: "electronics",
      icons: false,
    },
    {
      _id: 994,
      titleKey: "footer.categories.furniture",
      category: "furniture",
      icons: false,
    },
    {
      _id: 995,
      titleKey: "footer.categories.bags",
      category: "bags",
      icons: false,
    },
    {
      _id: 996,
      titleKey: "footer.categories.homeAppliances",
      category: "homeAppliances",
      icons: false,
    },
  ];
  return (
    <div className="w-full">
      <NavTitle title={t('products.category')} icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, titleKey, category, icons }) => (
            <li
              key={_id}
              onClick={() => onCategorySelect && onCategorySelect(category)}
              className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between cursor-pointer transition-colors duration-300 hover:text-primeColor ${
                selectedCategory === category ? 'text-primeColor font-semibold' : ''
              }`}
            >
              {t(titleKey)}
              {icons && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSubCatOne(!showSubCatOne);
                  }}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
