import { createContext, useContext, useState } from "react";
const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState("tr");

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
