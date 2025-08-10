const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Comprehensive product database with all available images
const products = [
  // ================== ORIGINAL PRODUCTS ==================
  {
    _id: 1001,
    img: "spfOne.webp",
    productName: "Cap for Boys",
    price: "35.00",
    color: "Blank and White",
    badge: true,
    category: "accessories",
    des: "Stylish cap perfect for casual wear. High-quality materials and comfortable fit.",
    brand: "Fashion Plus"
  },
  {
    _id: 1002,
    img: "spfTwo.webp",
    productName: "Tea Table",
    price: "180.00",
    color: "Gray",
    badge: true,
    category: "furniture",
    des: "Elegant tea table for your living room. Durable construction and modern design.",
    brand: "Home Essentials"
  },
  {
    _id: 1003,
    img: "spfThree.webp",
    productName: "Premium Headphones",
    price: "25.00",
    color: "Mixed",
    badge: true,
    category: "electronics",
    des: "High-quality headphones with crystal clear sound and comfortable design.",
    brand: "Audio Tech"
  },
  {
    _id: 1004,
    img: "spfFour.webp",
    productName: "Designer Sun Glasses",
    price: "220.00",
    color: "Black",
    badge: true,
    category: "accessories",
    des: "Premium designer sunglasses with UV protection and stylish frame.",
    brand: "Style Vision"
  },

  // ================== OFFICE PRINTERS (PNG) ==================
  {
    _id: 2001,
    img: "imprimante1.png",
    productName: "Imprimante Jet d'encre Couleur",
    price: "89.99",
    color: "White",
    badge: false,
    category: "printers",
    des: "Imprimante jet d'encre couleur haute qualité pour usage professionnel et personnel.",
    brand: "PrintPro"
  },
  {
    _id: 2002,
    img: "imprimante2.png",
    productName: "Imprimante Laser Monochrome",
    price: "149.99",
    color: "Black",
    badge: true,
    category: "printers",
    des: "Imprimante laser monochrome rapide et efficace pour documents professionnels.",
    brand: "LaserTech"
  },
  {
    _id: 2003,
    img: "imprimante3.png",
    productName: "Imprimante Multifonction",
    price: "199.99",
    color: "Gray",
    badge: true,
    category: "printers",
    des: "Imprimante multifonction avec scanner et copieur intégrés.",
    brand: "MultiPrint"
  },
  {
    _id: 2004,
    img: "imprimante4.png",
    productName: "Imprimante Photo Professionelle",
    price: "329.99",
    color: "Black",
    badge: false,
    category: "printers",
    des: "Imprimante photo haute résolution pour impression professionnelle.",
    brand: "PhotoPrint"
  },
  {
    _id: 2005,
    img: "imprimante5.png",
    productName: "Imprimante Portable",
    price: "79.99",
    color: "White",
    badge: false,
    category: "printers",
    des: "Imprimante portable compacte pour usage mobile et déplacements.",
    brand: "MobilePrint"
  },
  {
    _id: 2006,
    img: "imprimante6.png",
    productName: "Imprimante Grand Format",
    price: "599.99",
    color: "Gray",
    badge: true,
    category: "printers",
    des: "Imprimante grand format pour affiches et documents de grande taille.",
    brand: "BigPrint"
  },
  {
    _id: 2007,
    img: "imprimante7.png",
    productName: "Imprimante Économique",
    price: "59.99",
    color: "White",
    badge: false,
    category: "printers",
    des: "Imprimante économique idéale pour usage domestique et étudiant.",
    brand: "EcoPrint"
  },
  {
    _id: 2008,
    img: "imprimante8.png",
    productName: "Imprimante Réseau",
    price: "249.99",
    color: "Black",
    badge: false,
    category: "printers",
    des: "Imprimante réseau Wi-Fi pour partage en entreprise et à domicile.",
    brand: "NetPrint"
  },
  {
    _id: 2009,
    img: "imprimante9.png",
    productName: "Imprimante 3D",
    price: "899.99",
    color: "Black",
    badge: true,
    category: "printers",
    des: "Imprimante 3D avancée pour prototypage et création d'objets personnalisés.",
    brand: "3DPrint"
  },

  // ================== INK CARTRIDGES ==================
  {
    _id: 3001,
    img: "encre1.png",
    productName: "Cartouche d'encre Noire",
    price: "19.99",
    color: "Black",
    badge: false,
    category: "ink",
    des: "Cartouche d'encre noire haute capacité compatible avec la plupart des imprimantes.",
    brand: "InkPlus"
  },
  {
    _id: 3002,
    img: "encre2.png",
    productName: "Cartouche d'encre Couleur",
    price: "24.99",
    color: "Mixed",
    badge: false,
    category: "ink",
    des: "Set de cartouches d'encre couleur (Cyan, Magenta, Jaune) pour impression couleur.",
    brand: "ColorInk"
  },
  {
    _id: 3003,
    img: "encre3.png",
    productName: "Cartouche d'encre Premium",
    price: "34.99",
    color: "Black",
    badge: true,
    category: "ink",
    des: "Cartouche d'encre premium longue durée pour qualité d'impression supérieure.",
    brand: "PremiumInk"
  },
  {
    _id: 3004,
    img: "encre4.png",
    productName: "Pack Cartouches Multipack",
    price: "69.99",
    color: "Mixed",
    badge: true,
    category: "ink",
    des: "Pack économique de cartouches d'encre noire et couleur pour usage intensif.",
    brand: "MultiInk"
  },

  // ================== RIBBONS ==================
  {
    _id: 4001,
    img: "ruban1.png",
    productName: "Ruban Encreur Noir",
    price: "12.99",
    color: "Black",
    badge: false,
    category: "ribbons",
    des: "Ruban encreur noir pour imprimantes matricielles et machines à écrire.",
    brand: "RibbonTech"
  },
  {
    _id: 4002,
    img: "ruban2.png",
    productName: "Ruban Textile Couleur",
    price: "18.99",
    color: "Blue",
    badge: false,
    category: "ribbons",
    des: "Ruban textile couleur haute qualité pour marquage et étiquetage.",
    brand: "TextileRibbon"
  },
  {
    _id: 4003,
    img: "ruban3.png",
    productName: "Ruban Thermique",
    price: "15.99",
    color: "White",
    badge: false,
    category: "ribbons",
    des: "Ruban thermique pour étiqueteuses et imprimantes thermiques.",
    brand: "ThermalRibbon"
  },

  // ================== BAGS ==================
  {
    _id: 5001,
    img: "bac1.png",
    productName: "Sac à Dos Professionnel",
    price: "49.99",
    color: "Black",
    badge: false,
    category: "bags",
    des: "Sac à dos professionnel avec compartiment ordinateur portable et multiple poches.",
    brand: "ProBag"
  },
  {
    _id: 5002,
    img: "bac2.png",
    productName: "Sacoche pour Ordinateur",
    price: "39.99",
    color: "Brown",
    badge: false,
    category: "bags",
    des: "Sacoche élégante pour ordinateur portable avec protection renforcée.",
    brand: "LaptopCase"
  },
  {
    _id: 5003,
    img: "bac3.png",
    productName: "Sac de Transport",
    price: "29.99",
    color: "Gray",
    badge: false,
    category: "bags",
    des: "Sac de transport polyvalent pour équipements bureautiques et accessoires.",
    brand: "CarryBag"
  },
  {
    _id: 5004,
    img: "bac4.png",
    productName: "Mallette de Rangement",
    price: "79.99",
    color: "Black",
    badge: true,
    category: "bags",
    des: "Mallette professionnelle de rangement avec compartiments modulables.",
    brand: "OrganizerCase"
  },

  // ================== PREMIUM PANTUM PRINTERS ==================
  {
    _id: 6001,
    img: "IMPRIMANTE_PANTUM_BM5100FDW.webp",
    productName: "PANTUM BM5100FDW Multifonction",
    price: "299.99",
    color: "White",
    badge: true,
    category: "printers",
    des: "Imprimante laser multifonction Wi-Fi avec impression recto-verso automatique.",
    brand: "Pantum"
  },
  {
    _id: 6002,
    img: "IMPRIMANTE_PANTUM_BP5100DN.webp",
    productName: "PANTUM BP5100DN Laser",
    price: "199.99",
    color: "Black",
    badge: false,
    category: "printers",
    des: "Imprimante laser monochrome réseau avec impression recto-verso.",
    brand: "Pantum"
  },
  {
    _id: 6003,
    img: "IMPRIMANTE_PANTUM_CP2200DW.webp",
    productName: "PANTUM CP2200DW Couleur",
    price: "349.99",
    color: "White",
    badge: true,
    category: "printers",
    des: "Imprimante laser couleur Wi-Fi avec impression recto-verso automatique.",
    brand: "Pantum"
  },
  {
    _id: 6004,
    img: "IMPRIMANTE_PANTUM_M6559N.webp",
    productName: "PANTUM M6559N Multifonction",
    price: "189.99",
    color: "Gray",
    badge: false,
    category: "printers",
    des: "Imprimante multifonction laser réseau avec scanner et copieur.",
    brand: "Pantum"
  },
  {
    _id: 6005,
    img: "IMPRIMANTE_PANTUM_M6609N.webp",
    productName: "PANTUM M6609N Pro",
    price: "249.99",
    color: "Black",
    badge: false,
    category: "printers",
    des: "Imprimante multifonction professionnelle avec vitesse d'impression élevée.",
    brand: "Pantum"
  },
  {
    _id: 6006,
    img: "IMPRIMANTE_PANTUM_P2509.webp",
    productName: "PANTUM P2509 Compact",
    price: "89.99",
    color: "White",
    badge: false,
    category: "printers",
    des: "Imprimante laser compacte idéale pour usage domestique et bureau.",
    brand: "Pantum"
  },
  {
    _id: 6007,
    img: "IMPRIMANTE_PANTUM_P2509W.webp",
    productName: "PANTUM P2509W Wi-Fi",
    price: "119.99",
    color: "White",
    badge: false,
    category: "printers",
    des: "Imprimante laser Wi-Fi compacte avec connectivité sans fil.",
    brand: "Pantum"
  },
  {
    _id: 6008,
    img: "IMPRIMANTE_PANTUM_P3300DN.webp",
    productName: "PANTUM P3300DN Réseau",
    price: "159.99",
    color: "Black",
    badge: false,
    category: "printers",
    des: "Imprimante laser réseau avec impression recto-verso automatique.",
    brand: "Pantum"
  },
  {
    _id: 6009,
    img: "IMPRIMANTE_PANTUM_P3300DW.webp",
    productName: "PANTUM P3300DW Wi-Fi Pro",
    price: "179.99",
    color: "White",
    badge: true,
    category: "printers",
    des: "Imprimante laser Wi-Fi professionnelle avec impression recto-verso.",
    brand: "Pantum"
  },

  // ================== BRAND PRINTERS ==================
  {
    _id: 7001,
    img: "espson1.webp",
    productName: "Epson EcoTank ET-2720",
    price: "199.99",
    color: "Black",
    badge: true,
    category: "printers",
    des: "Imprimante Epson EcoTank avec réservoirs d'encre rechargeables.",
    brand: "Epson"
  },
  {
    _id: 7002,
    img: "espson2.webp",
    productName: "Epson WorkForce Pro",
    price: "299.99",
    color: "Black",
    badge: false,
    category: "printers",
    des: "Imprimante professionnelle Epson WorkForce pour usage intensif.",
    brand: "Epson"
  },
  {
    _id: 7003,
    img: "hp1.webp",
    productName: "HP LaserJet Pro",
    price: "219.99",
    color: "White",
    badge: false,
    category: "printers",
    des: "Imprimante laser HP LaserJet Pro pour bureau professionnel.",
    brand: "HP"
  },
  {
    _id: 7004,
    img: "hp2.webp",
    productName: "HP DeskJet Plus",
    price: "89.99",
    color: "Blue",
    badge: false,
    category: "printers",
    des: "Imprimante HP DeskJet Plus multifonction pour usage domestique.",
    brand: "HP"
  },
  {
    _id: 7005,
    img: "hp3.webp",
    productName: "HP OfficeJet Pro",
    price: "179.99",
    color: "Black",
    badge: true,
    category: "printers",
    des: "Imprimante HP OfficeJet Pro avec impression couleur haute qualité.",
    brand: "HP"
  },
  {
    _id: 7006,
    img: "ricoh1.webp",
    productName: "Ricoh Aficio MP",
    price: "449.99",
    color: "Gray",
    badge: false,
    category: "printers",
    des: "Copieur multifonction Ricoh Aficio pour environnement professionnel.",
    brand: "Ricoh"
  },
  {
    _id: 7007,
    img: "ricoh2.webp",
    productName: "Ricoh SP Series",
    price: "329.99",
    color: "Black",
    badge: false,
    category: "printers",
    des: "Imprimante laser Ricoh SP Series haute vitesse pour bureau.",
    brand: "Ricoh"
  },
  {
    _id: 7008,
    img: "ricoh3.webp",
    productName: "Ricoh IM C Series",
    price: "599.99",
    color: "White",
    badge: true,
    category: "printers",
    des: "Imprimante couleur intelligente Ricoh IM C Series avec fonctions avancées.",
    brand: "Ricoh"
  },
  {
    _id: 7009,
    img: "ricoh4.webp",
    productName: "Ricoh Pro Series",
    price: "799.99",
    color: "Black",
    badge: true,
    category: "printers",
    des: "Imprimante professionnelle Ricoh Pro Series pour production graphique.",
    brand: "Ricoh"
  },
  {
    _id: 7010,
    img: "ricoh5.webp",
    productName: "Ricoh Compact",
    price: "159.99",
    color: "Gray",
    badge: false,
    category: "printers",
    des: "Imprimante compacte Ricoh pour petits espaces de bureau.",
    brand: "Ricoh"
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/orebishop');

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new comprehensive product catalog
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products to database`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();