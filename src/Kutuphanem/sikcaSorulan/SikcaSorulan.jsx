import { useState } from "react";
import Baslik from "../baslik/Baslik";
import "./SikcaSorulan.scss";
import { faqs, title, subTitle } from "./dataSikcaSorulan.json";
import { useLang } from "../../langContext";

const SikcaSorulan = () => {
  const { lang } = useLang();
  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container">
      <div className="sikcaSorulan">
        <Baslik title={title[lang]} desc={subTitle[lang]} />
        <div className="acardions">
          {faqs?.map((faq, index) => (
            <div
              className={`acardion ${openIndex === index ? "active" : ""}`}
              key={index}
            >
              <div
                className="acardionSummary"
                onClick={() => toggleAccordion(index)}
              >
                <p>{faq.question[lang]}</p>
                <span className="expandIcon">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              <div
                className="acardionDetails"
                style={{ display: openIndex === index ? "block" : "none" }}
              >
                <p>{faq.answer[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SikcaSorulan;
