import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import './i18n';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { ProductProvider } from './contexts/ProductContext';
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";

// Admin Components
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import ProductList from "./pages/Admin/ProductList";
import ProductForm from "./pages/Admin/ProductForm";

const Layout = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const html = document.documentElement;
    if (i18n.language === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.classList.add('rtl');
      html.classList.remove('ltr');
      html.style.fontFamily = 'Noto Sans Arabic, Arial, sans-serif';
    } else {
      html.setAttribute('dir', 'ltr');
      html.classList.add('ltr');
      html.classList.remove('rtl');
      html.style.fontFamily = 'DM Sans, sans-serif';
    }
  }, [i18n.language]);

  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />}></Route>
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />}></Route>
        <Route path="products" element={<ProductList />}></Route>
        <Route path="products/new" element={<ProductForm />}></Route>
        <Route path="products/edit/:id" element={<ProductForm />}></Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <ProductProvider>
      <div className="font-bodyFont">
        <RouterProvider router={router} />
      </div>
    </ProductProvider>
  );
}

export default App;
