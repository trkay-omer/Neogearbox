import PhoneIcon from "@mui/icons-material/Phone";
import "./FooterTop.scss";
import data from "../../data.json";
import { useLang } from "../../langContext.jsx";
import footerTopData from "./footerTopData.json";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { Link } from "react-router-dom";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";

const FooterTop = () => {
  const { lang } = useLang();
  return (
    <div className="dikkat">
      <div className="container dikkatItems">
        <div className="dikkatItem">
          <HomeRepairServiceIcon fontSize="large" className="iconDikkat" />

          <div className="infoDikkat">
            <h3>{footerTopData.titleLeft[lang]}</h3>
            <p>{footerTopData.descLeft[lang]}</p>
            <div>
              <Link to={"/sectors"}>
                <button>{footerTopData.buttonLeftText[lang]}</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="dikkatItem">
          <ForwardToInboxIcon fontSize="large" className="iconDikkat" />

          <div className="infoDikkat">
            <h3>{footerTopData.titleRight[lang]}</h3>
            <p>{data.form[lang]}</p>
            <div>
              <Link to={"/contact"}>
                <button>{footerTopData.butonRightText[lang]}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
