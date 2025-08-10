// Product data now comes from MongoDB via API - no static imports needed

// =================== NavBarList Start here ====================
export const navBarList = [
  {
    _id: 1001,
    title: "Home",
    link: "/",
  },
  {
    _id: 1002,
    title: "Shop",
    link: "/shop",
  },
  {
    _id: 1003,
    title: "About",
    link: "/about",
  },
  {
    _id: 1004,
    title: "Contact",
    link: "contact",
  },
  {
    _id: 1005,
    title: "Journal",
    link: "/journal",
  },
];
// =================== NavBarList End here ======================

// =================== Special Offer data Start here ============
// Special offer products are now fetched from MongoDB via API
export const SplOfferData = [];
// =================== Special Offer data End here ==============

// =================== PaginationItems Start here ===============
// Product data is now fetched from MongoDB via API
// This array is kept for backwards compatibility but should be empty
export const paginationItems = [];
// =================== PaginationItems End here =================