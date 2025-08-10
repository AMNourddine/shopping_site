import {
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
} from "../assets/images/index";

// Map filename strings to actual imported images
const imageMap = {
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
};

export const getImageSrc = (imageName) => {
  return imageMap[imageName] || imageName; // Return mapped image or fallback to original name
};