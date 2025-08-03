import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";

const ShopSideNav = ({ 
  onCategorySelect, 
  selectedCategory, 
  onColorSelect, 
  selectedColor, 
  onBrandSelect, 
  selectedBrand, 
  onPriceRangeSelect, 
  selectedPriceRange 
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={false} onCategorySelect={onCategorySelect} selectedCategory={selectedCategory} />
      <Color onColorSelect={onColorSelect} selectedColor={selectedColor} />
      <Brand onBrandSelect={onBrandSelect} selectedBrand={selectedBrand} />
      <Price onPriceRangeSelect={onPriceRangeSelect} selectedPriceRange={selectedPriceRange} />
    </div>
  );
};

export default ShopSideNav;
