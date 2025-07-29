import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import "./FooterTop.scss";
import data from "../../data.json";
import { useLang } from "../../langContext.jsx";
import footerTopData from "./footerTopData.json";

const FooterTop = () => {
  const { lang } = useLang();
  return (
    <div className="dikkat">
      <div className="container dikkatItems">
        <div className="dikkatItem">
          <PhoneIcon fontSize="large" className="iconDikkat" />

          <div className="infoDikkat">
            <h3>
              {footerTopData.titleLeft[lang]} {data.telefon}
            </h3>
            <p>{footerTopData.descLeft[lang]}</p>
            <div>
              <a href={data.telefon_linki}>
                <button>{footerTopData.buttonLeftText[lang]}</button>
              </a>
            </div>
          </div>
        </div>

        <div className="dikkatItem">
          <MapIcon fontSize="large" className="iconDikkat" />

          <div className="infoDikkat">
            <h3>{footerTopData.titleRight[lang]}</h3>
            <p>{data.adres[lang]}</p>
            <div>
              <a target="_blank" href={data.adres_linki}>
                <button>{footerTopData.butonRightText[lang]}</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
