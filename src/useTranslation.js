import en from "./locales/en.json";
import tr from "./locales/tr.json";
import { useLang } from "./langContext.jsx";

const translations = { en, tr };

export const useTranslation = () => {
  const { lang } = useLang();

  const t = (key) => {
    return key
      .split(".")
      .reduce((obj, k) => (obj && obj[k] ? obj[k] : key), translations[lang]);
  };

  return { t };
};
