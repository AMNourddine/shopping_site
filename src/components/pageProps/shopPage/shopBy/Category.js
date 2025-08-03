import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { useTranslation } from "react-i18next";
import NavTitle from "./NavTitle";

const Category = () => {
  const { t } = useTranslation();
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const items = [
    {
      _id: 990,
      titleKey: "products.newArrivals",
      icons: true,
    },
    {
      _id: 991,
      titleKey: "footer.categories.gadgets",
    },
    {
      _id: 992,
      titleKey: "footer.categories.accessories",
      icons: true,
    },
    {
      _id: 993,
      titleKey: "footer.categories.electronics",
    },
    {
      _id: 994,
      titleKey: "footer.categories.others",
    },
  ];
  return (
    <div className="w-full">
      <NavTitle title={t('products.category')} icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, titleKey, icons }) => (
            <li
              key={_id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
            >
              {t(titleKey)}
              {icons && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
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
