import "./Loading.scss";
import { useLang } from "../../langContext";
import { loadingTitle } from "./loadingData.json";

const Loading = () => {
  const { lang } = useLang();
  return (
    <div className="loading-container">
      <h2>{loadingTitle[lang]}</h2>
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
