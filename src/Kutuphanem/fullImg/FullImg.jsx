import { Link } from "react-router-dom";
import Baslik from "../baslik/Baslik";
import "./FullImg.scss";
import { dataFullImg } from "./dataFullImg.json";
import { useLang } from "../../langContext.jsx";

const FullImg = () => {
  const { lang } = useLang();
  return (
    <div className="fullImg">
      <div className="container">
        <div className="fullImgContent">
          <Baslik
            title={dataFullImg.title[lang]}
            desc={dataFullImg.desc[lang]}
          />
          <Link to={dataFullImg.link} className="btn-fullImg">
            {dataFullImg.buttonText[lang]}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullImg;
