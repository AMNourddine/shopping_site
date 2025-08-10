import logo from "./orebiLogo.png";
import logoLight from "./logoLight.png";
import bannerImgOne from "./banner/bannerImgOne.webp";
import bannerImgTwo from "./banner/bannerImgTwo.webp";
import bannerImgThree from "./banner/bannerImgThree.webp";
import saleImgOne from "./sale/saleImgOne.webp";
import saleImgTwo from "./sale/saleImgTwo.webp";
import saleImgThree from "./sale/saleImgThree.webp";

// ============== Products are now handled via MongoDB ==============
// All product images are stored as filenames in database and loaded directly
// This reduces bundle size and improves performance

import paymentCard from "./payment.png";
import emptyCart from "../images/emptyCart.png";

export {
  logo,
  logoLight,
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
  saleImgOne,
  saleImgTwo,
  saleImgThree,
  // ===================== Products removed - handled via MongoDB ========
  paymentCard,
  emptyCart,
};