import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const Shop = () => {
  const { t } = useTranslation();
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };
  
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleColorFilter = (color) => {
    setSelectedColor(color);
  };

  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
  };

  const handlePriceRangeFilter = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title={t('nav.shop')} />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav 
            onCategorySelect={handleCategoryFilter} 
            selectedCategory={selectedCategory}
            onColorSelect={handleColorFilter}
            selectedColor={selectedColor}
            onBrandSelect={handleBrandFilter}
            selectedBrand={selectedBrand}
            onPriceRangeSelect={handlePriceRangeFilter}
            selectedPriceRange={selectedPriceRange}
          />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <Pagination 
            itemsPerPage={itemsPerPage} 
            selectedCategory={selectedCategory}
            selectedColor={selectedColor}
            selectedBrand={selectedBrand}
            selectedPriceRange={selectedPriceRange}
          />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
