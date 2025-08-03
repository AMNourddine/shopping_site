import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Journal = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title={t('nav.journal')} prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">Orebi</span>{" "}
          {t('pages.journal.description')}
        </h1>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
{t('cart.continueShopping')}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Journal;
