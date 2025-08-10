import {
  // Original product images
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
  spfOne,
  spfTwo,
  spfThree,
  spfFour,
  productOfTheYear,

  // Office Supplies - Printers (PNG)
  imprimante1,
  imprimante2,
  imprimante3,
  imprimante4,
  imprimante5,
  imprimante6,
  imprimante7,
  imprimante8,
  imprimante9,

  // Office Supplies - Ink Cartridges (PNG)
  encre1,
  encre2,
  encre3,
  encre4,

  // Office Supplies - Ribbons (PNG)
  ruban1,
  ruban2,
  ruban3,

  // Office Supplies - Bags (PNG)
  bac1,
  bac2,
  bac3,
  bac4,

  // Best Seller Products (WEBP)
  bacBestSeller1,
  bacBestSeller2,
  bacBestSeller3,
  bacBestSeller4,
  encreBestSeller1,
  encreBestSeller2,
  encreBestSeller3,
  encreBestSeller4,
  rubanBestSeller1,
  rubanBestSeller2,
  rubanBestSeller3,
  rubanBestSeller4,
  imprimanteBestSeller1,
  imprimanteBestSeller2,
  imprimanteBestSeller4,
  imprimanteBestSeller5,
  imprimanteBestSeller6,
  imprimanteBestSeller7,
  imprimanteBestSeller8,
  imprimanteBestSeller9,

  // Premium Printers (WEBP)
  imprimantePantumBM5100FDW,
  imprimantePantumBP5100DN,
  imprimantePantumCP2200DW,
  imprimantePantumM6559N,
  imprimantePantumM6609N,
  imprimantePantumP2509,
  imprimantePantumP2509W,
  imprimantePantumP3300DN,
  imprimantePantumP3300DW,
  imprimanteEpson1,
  imprimanteEpson2,
  imprimanteHP1,
  imprimanteHP2,
  imprimanteHP3,
  imprimanteRicoh1,
  imprimanteRicoh2,
  imprimanteRicoh3,
  imprimanteRicoh4,
  imprimanteRicoh5,
} from "../assets/images/index";

// Comprehensive image mapping for all available product images
const imageMap = {
  // Original mapped images
  "spfOne.webp": spfOne,
  "spfTwo.webp": spfTwo,
  "spfThree.webp": spfThree,
  "spfFour.webp": spfFour,
  "bestSellerOne.webp": bestSellerOne,
  "bestSellerTwo.webp": bestSellerTwo,
  "bestSellerThree.webp": bestSellerThree,
  "bestSellerFour.webp": bestSellerFour,
  "newArrOne.webp": newArrOne,
  "newArrTwo.webp": newArrTwo,
  "newArrThree.webp": newArrThree,
  "newArrFour.webp": newArrFour,
  "productOfTheYear.webp": productOfTheYear,

  // Office Supplies - Printers (PNG)
  "imprimante1.png": imprimante1,
  "imprimante2.png": imprimante2,
  "imprimante3.png": imprimante3,
  "imprimante4.png": imprimante4,
  "imprimante5.png": imprimante5,
  "imprimante6.png": imprimante6,
  "imprimante7.png": imprimante7,
  "imprimante8.png": imprimante8,
  "imprimante9.png": imprimante9,

  // Office Supplies - Ink Cartridges (PNG)
  "encre1.png": encre1,
  "encre2.png": encre2,
  "encre3.png": encre3,
  "encre4.png": encre4,

  // Office Supplies - Ribbons (PNG)
  "ruban1.png": ruban1,
  "ruban2.png": ruban2,
  "ruban3.png": ruban3,

  // Office Supplies - Bags (PNG)
  "bac1.png": bac1,
  "bac2.png": bac2,
  "bac3.png": bac3,
  "bac4.png": bac4,

  // Best Seller Products (WEBP)
  "bac1.webp": bacBestSeller1,
  "bac2.webp": bacBestSeller2,
  "bac3.webp": bacBestSeller3,
  "bac4.webp": bacBestSeller4,
  "encre1.webp": encreBestSeller1,
  "encre2.webp": encreBestSeller2,
  "encre3.webp": encreBestSeller3,
  "encre4.webp": encreBestSeller4,
  "ruban1.webp": rubanBestSeller1,
  "ruban2.webp": rubanBestSeller2,
  "ruban3.webp": rubanBestSeller3,
  "ruban4.webp": rubanBestSeller4,
  "imprimante1.webp": imprimanteBestSeller1,
  "imprimante2.webp": imprimanteBestSeller2,
  "imprimante4.webp": imprimanteBestSeller4,
  "imprimante5.webp": imprimanteBestSeller5,
  "imprimante6.webp": imprimanteBestSeller6,
  "imprimante7.webp": imprimanteBestSeller7,
  "imprimante8.webp": imprimanteBestSeller8,
  "imprimante9.webp": imprimanteBestSeller9,

  // Premium Printers (WEBP)
  "IMPRIMANTE_PANTUM_BM5100FDW.webp": imprimantePantumBM5100FDW,
  "IMPRIMANTE_PANTUM_BP5100DN.webp": imprimantePantumBP5100DN,
  "IMPRIMANTE_PANTUM_CP2200DW.webp": imprimantePantumCP2200DW,
  "IMPRIMANTE_PANTUM_M6559N.webp": imprimantePantumM6559N,
  "IMPRIMANTE_PANTUM_M6609N.webp": imprimantePantumM6609N,
  "IMPRIMANTE_PANTUM_P2509.webp": imprimantePantumP2509,
  "IMPRIMANTE_PANTUM_P2509W.webp": imprimantePantumP2509W,
  "IMPRIMANTE_PANTUM_P3300DN.webp": imprimantePantumP3300DN,
  "IMPRIMANTE_PANTUM_P3300DW.webp": imprimantePantumP3300DW,
  "espson1.webp": imprimanteEpson1,
  "espson2.webp": imprimanteEpson2,
  "hp1.webp": imprimanteHP1,
  "hp2.webp": imprimanteHP2,
  "hp3.webp": imprimanteHP3,
  "ricoh1.webp": imprimanteRicoh1,
  "ricoh2.webp": imprimanteRicoh2,
  "ricoh3.webp": imprimanteRicoh3,
  "ricoh4.webp": imprimanteRicoh4,
  "ricoh5.webp": imprimanteRicoh5,
};

export const getImageSrc = (imageName) => {
  return imageMap[imageName] || imageName; // Return mapped image or fallback to original name
};