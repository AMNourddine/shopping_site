// UI Images served from public directory
// This file provides URLs for UI elements like banners, logos, etc.

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// UI Image URLs
export const logo = `${API_BASE_URL}/images/orebiLogo.png`;
export const logoLight = `${API_BASE_URL}/images/logoLight.png`;
export const bannerImgOne = `${API_BASE_URL}/images/banner/bannerImgOne.webp`;
export const bannerImgTwo = `${API_BASE_URL}/images/banner/bannerImgTwo.webp`;
export const bannerImgThree = `${API_BASE_URL}/images/banner/bannerImgThree.webp`;
export const saleImgOne = `${API_BASE_URL}/images/sale/saleImgOne.webp`;
export const saleImgTwo = `${API_BASE_URL}/images/sale/saleImgTwo.webp`;
export const saleImgThree = `${API_BASE_URL}/images/sale/saleImgThree.webp`;
export const paymentCard = `${API_BASE_URL}/images/payment.png`;
export const emptyCart = `${API_BASE_URL}/images/emptyCart.png`;

// Export all as default for easier importing
const uiImages = {
  logo,
  logoLight,
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  saleImgOne,
  saleImgTwo,
  saleImgThree,
  paymentCard,
  emptyCart,
};

export default uiImages;