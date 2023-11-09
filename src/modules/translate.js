import i18next from "i18next";
import deLang from "../translation/de.json";
import enLang from "../translation/en.json";
import frLang from "../translation/fr.json";
import esLang from "../translation/es.json";
import jaLang from "../translation/ja.json";
import ptLang from "../translation/pt.json";

export const initTranslate = () => {
  const priceData = {
    yearPrice: "$39.00",
    bestPrice: "$0.48",
    defaultPrice: "$6.99",
  };

  const resourcesI18n = {
    en: {
      translation: enLang,
    },
    de: {
      translation: deLang,
    },
    fr: {
      translation: frLang,
    },
    es: {
      translation: esLang,
    },
    ja: {
      translation: jaLang,
    },
    pt: {
      translation: ptLang,
    },
  };

  const arrayDataLanguages = Object.keys(resourcesI18n);

  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams);

  const lang =
    searchParams.has("lang") && !!arrayDataLanguages.find((lng) => lng === searchParams.get("lang"))
      ? searchParams.get("lang")
      : !!arrayDataLanguages.find((lng) => lng === window.navigator.language.slice(0, 2))
      ? window.navigator.language
      : "en";

  const mainWrapApp = document.querySelector(".mobile");
  mainWrapApp.classList.add(`mobile--${lang}`);

  i18next.init({
    lng: lang,
    resources: resourcesI18n,
  });

  document.title = i18next.t("Get Unlimited <br>Access").replace("<br>", "");

  const initTranslateContent = () => {
    if (document.querySelectorAll("*[data-i18n]").length) {
      const collectionTranslationElements = document.querySelectorAll("*[data-i18n]");
      collectionTranslationElements.forEach((elem) => {
        elem.dataset.price
          ? elem.insertAdjacentHTML(
              "afterbegin",
              i18next.t(elem.dataset.i18n, { price: priceData[`${elem.dataset.price}Price`] })
            )
          : elem.insertAdjacentHTML("afterbegin", i18next.t(elem.dataset.i18n));
      });
    }
  };

  initTranslateContent();
};
