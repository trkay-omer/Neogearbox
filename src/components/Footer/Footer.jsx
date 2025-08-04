import "./Footer.scss";
import data from "../../data.json";
import { useLang } from "../../langContext.jsx";
import FooterData from "./FooterData.json";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import { Link } from "react-router-dom";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";

const Footer = () => {
  const { lang } = useLang();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footerItem">
          <div className="logo">
            <a href="/">
              <img src="/images/logo/logo.png" alt="Akıllı Logo" />
            </a>
          </div>
          <div className="metin">
            <p>{data.footerDesc[lang]}</p>
          </div>
        </div>

        <div className="footerItem">
          <h3>{FooterData.title1[lang]}</h3>
          <hr />
          <ul className="footerHizmet">
            {data.kategoriler[lang]?.map((item, index) => (
              <li key={index}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footerItem">
          <h3>{FooterData.title2[lang]}</h3>
          <hr />
          <ul>
            <li className="sag">
              <div className="yeap">
                <HomeRepairServiceIcon />

                <a href={data.telefon_linki}>
                  <span style={{ marginRight: "-0.5rem" }} className="ici">
                    {FooterData.sector[lang]}
                  </span>
                </a>
              </div>
            </li>

            {/*  <li className="sag">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={data.instagram_linki}
              >
                <InstagramIcon />
                <span>{data.instagram}</span>
              </a>
            </li> */}

            <li className="sag">
              <Link to="/contact">
                <DynamicFormIcon />
                <span>{data.form[lang]}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <hr style={{ width: "100%", border: "1px solid #dee0ea" }} />

      <div className="container">
        <p style={{ fontSize: "0.85rem" }}>
          Copyright 2025 © {data.magazaIsmi[lang]}. {FooterData.copyRight[lang]}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
