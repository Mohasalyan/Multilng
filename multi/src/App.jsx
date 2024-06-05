

import  { useEffect } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import cookies from "js-cookie";

i18n.use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: {
      order: ['cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ["cookie"],
    },
    backend: {
      loadPath: '/locale/{{lng}}/trans.json',
    }
  });

function App() {
  const { t } = useTranslation();
  const currentLanguage = cookies.get("i18next") || "en";

  useEffect(() => {
    window.document.dir = i18n.dir(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    const languageChangeHandler = (lng) => {
      cookies.set("i18next", lng);
      window.document.dir = i18n.dir(lng);
    };

    i18n.on('languageChanged', languageChangeHandler);

    return () => {
      i18n.off('languageChanged', languageChangeHandler);
    };
  }, []);

  return (
    <>
      <h2>{t('Welcome to React')}</h2>
      <button
        onClick={() => {
          i18n.changeLanguage("ar");
        }}
      >
        AR
      </button>
      <button
        onClick={() => {
          i18n.changeLanguage("en");
        }}
      >
        EN
      </button>
    </>
  );
}

export default App;
