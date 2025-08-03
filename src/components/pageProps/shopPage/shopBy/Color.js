import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import NavTitle from "./NavTitle";

const Color = ({ onColorSelect, selectedColor }) => {
  const { t } = useTranslation();
  const [showColors, setShowColors] = useState(true);
  const colors = [
    {
      _id: 9000,
      titleKey: "colors.all",
      base: "",
    },
    {
      _id: 9001,
      titleKey: "colors.green",
      base: "#22c55e",
    },
    {
      _id: 9002,
      titleKey: "colors.gray",
      base: "#a3a3a3",
    },
    {
      _id: 9003,
      titleKey: "colors.red",
      base: "#dc2626",
    },
    {
      _id: 9004,
      titleKey: "colors.yellow",
      base: "#f59e0b",
    },
    {
      _id: 9005,
      titleKey: "colors.blue",
      base: "#3b82f6",
    },
  ];

  return (
    <div>
      <div
        onClick={() => setShowColors(!showColors)}
        className="cursor-pointer"
      >
        <NavTitle title={t('products.shopByColor')} icons={true} />
      </div>
      {showColors && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {colors.map((item) => (
              <li
                key={item._id}
                onClick={() => onColorSelect && onColorSelect(item.base)}
                className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 cursor-pointer transition-colors duration-300 hover:text-primeColor ${
                  selectedColor === item.base ? 'text-primeColor font-semibold' : ''
                }`}
              >
                {item.base ? (
                  <span
                    style={{ background: item.base }}
                    className={`w-3 h-3 bg-gray-500 rounded-full`}
                  ></span>
                ) : (
                  <span className="w-3 h-3 border border-gray-300 rounded-full"></span>
                )}
                {t(item.titleKey)}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Color;
