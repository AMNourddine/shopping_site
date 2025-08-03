import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { paginationItems } from "../../../constants";
import { useTranslation } from "react-i18next";

const items = paginationItems;
function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              _id={item._id}
              img={item.img}
              productName={item.productName}
              price={item.price}
              color={item.color}
              badge={item.badge}
              des={item.des}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage, selectedCategory, selectedColor, selectedBrand, selectedPriceRange }) => {
  const { t } = useTranslation();
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  // Filter items based on all selected filters
  const filteredItems = items.filter(item => {
    // Category filter
    if (selectedCategory && item.category !== selectedCategory) {
      return false;
    }
    
    // Color filter - check if item color contains the selected color
    if (selectedColor) {
      // Convert hex color to color name for comparison
      const colorMap = {
        '#22c55e': 'green',
        '#a3a3a3': 'gray',
        '#dc2626': 'red', 
        '#f59e0b': 'yellow',
        '#3b82f6': 'blue'
      };
      const selectedColorName = colorMap[selectedColor];
      if (selectedColorName && !item.color.toLowerCase().includes(selectedColorName)) {
        return false;
      }
    }
    
    // Brand filter - for now, we'll map some products to brands based on names
    if (selectedBrand) {
      const brandMap = {
        'Smart Watch': 'Apple',
        'Headphones': 'Apple', 
        'Sun glasses': 'Ultron',
        'Travel Bag': 'Shoppers Home',
        'New Backpack': 'Shoppers Home'
      };
      const itemBrand = brandMap[item.productName] || 'Unknown';
      if (itemBrand !== selectedBrand) {
        return false;
      }
    }
    
    // Price range filter
    if (selectedPriceRange) {
      const itemPrice = parseFloat(item.price);
      if (itemPrice < selectedPriceRange.min || itemPrice > selectedPriceRange.max) {
        return false;
      }
    }
    
    return true;
  });
    
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filteredItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  // Reset pagination when any filter changes
  React.useEffect(() => {
    setItemOffset(0);
    setItemStart(1);
  }, [selectedCategory, selectedColor, selectedBrand, selectedPriceRange]);
  
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset},`
    // );
    setItemStart(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          {t('common.productsFrom')} {itemStart === 0 ? 1 : itemStart} {t('common.to')} {Math.min(endOffset, filteredItems.length)} {t('common.of')}{" "}
          {filteredItems.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
