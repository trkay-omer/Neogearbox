import "./NameAndMarka.scss";
import data from "../../../data.json";
import { useLang } from "../../../langContext.jsx";
import { wpButtonText, pdfButtonText } from "./nameAndMarkaData.json";

const NameAndMarka = ({ marka, name, desc, pdf }) => {
  const { lang } = useLang();
  return (
    <div className="nameAndMarka">
      <span className="marka">{marka}</span>
      <h2 className="name">{name}</h2>

      <div className="textHAvuz">
        <p>{desc}</p>
      </div>

      <div className="buttons">
        <div className="sepeteEkle">
          <a
            href={data.whatsapp_linki}
            target="_blank"
            className="btnSepet green"
          >
            {wpButtonText[lang]}
          </a>

          {pdf?.filename && (
            <a
              href={pdf?.filename}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="btnSepet red"
            >
              {pdfButtonText[lang]}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NameAndMarka;
