import "./Iletisim.scss";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import data from "../../data.json";
import { useLang } from "../../langContext.jsx";
import iletisimData from "./iletisimData.json";
const Iletisim = () => {
  const { lang } = useLang();

  return (
    <div className="iletisim">
      <div className="container">
        <div className="content">
          <div className="map">
            <img src="/images/contact.jpeg" alt="" />
          </div>

          <div className="infoIletisim">
            <div className="itemIletisim">
              <h3>{iletisimData.titleAdres[lang]}</h3>
              <p>{data.adres[lang]}</p>
            </div>

            <div className="itemIletisim">
              <h3>{iletisimData.titleTelefon[lang]}</h3>
              <div className="itemList">
                <LocalPhoneIcon />
                <p>
                  <a href={data.telefon_linki}>{data.telefon}</a>
                </p>
              </div>
            </div>

            <div className="itemIletisim">
              <h3>{iletisimData.titleMedya[lang]}</h3>
              <div className="medyas">
                <a href={data.mail_linki} className="itemList">
                  <EmailIcon />
                  <p>{data.mail}</p>
                </a>

                {/* <a
                  id="sea"
                  target="_blank"
                  href={data.instagram_linki}
                  className="itemList"
                >
                  <InstagramIcon />
                  <p>{data.instagram}</p>
                </a> */}
              </div>
            </div>

            <div className="itemIletisim">
              <h3>{iletisimData.titleMesai[lang]}</h3>
              <div className="medyas">
                <div className="itemList">
                  <h4>{iletisimData.titleHaftaIcı[lang]}</h4>
                  <p>{data.haftaIcı[lang]}</p>
                </div>
                <div className="itemList">
                  <h4>{iletisimData.titleHaftasonu[lang]}</h4>
                  <p>{data.haftaSonu[lang]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iletisim;
