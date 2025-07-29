import { Link } from "react-router-dom";
import "./AnaProduct.scss";
import { dataAnaProduct } from "./dataAnaProduct.json";
import { useLang } from "../../langContext.jsx";

const AnaProduct = () => {
  const { lang } = useLang();
  return (
    <div className="anaProduct">
      <div className="container">
        <div className="populerProject">
          <div className="mobileTitle">
            <h3 style={{ fontSize: "1.5rem" }}>
              {dataAnaProduct.titleFull[lang]}
            </h3>
          </div>
          <div className="subDetay">
            <div className="imgContainer">
              <img className="first" src={dataAnaProduct.yImg} alt="" />
              <img className="seccond" src={dataAnaProduct.xImg} alt="" />
            </div>
            <div className="textContainer">
              <h3 className="projectNameAnaProduct">
                {dataAnaProduct.topSmallTitle[lang]}
              </h3>
              <h1>
                {dataAnaProduct.titleDev[lang]}{" "}
                <i>&apos;{dataAnaProduct.titleItalic[lang]}&apos;</i>{" "}
                {dataAnaProduct.titleDev2[lang]}
              </h1>

              <p className="desc">{dataAnaProduct.desc[lang]}</p>
              <div className="button">
                <Link to={dataAnaProduct.link}>
                  {dataAnaProduct.buttonText[lang]}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaProduct;
