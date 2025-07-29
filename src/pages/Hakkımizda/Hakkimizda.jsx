import "./Hakkimizda.scss";
import ProjectName from "../../Kutuphanem/projectName/ProjectName";
import HakkimizdaTextImg from "../../Kutuphanem/hakkimizdaTextImg/HakkimizdaTextImg";
import WhyOur from "../../Kutuphanem/whyOur/WhyOur";
import { useLang } from "../../langContext";
import { img, topTitle } from "./hakkimizdaData.json";
import {
  title1,
  title2,
  text1,
  text2,
  text3,
  text4,
} from "./hakkimizdaData.json";

const Hakkimizda = () => {
  const { lang } = useLang();
  return (
    <div className="hakkimizda">
      <ProjectName img={img} topTitle={topTitle[lang]} />
      <WhyOur loading={false} />
      <div className="slider">
        <div className="slider-track">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="slide">
              <img
                src={`/images/karePost/L${index + 1}.png`}
                alt={"detay peyzaj"}
              />
            </div>
          ))}
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="slide">
              <img
                src={`/images/karePost/L${index + 1}.png`}
                alt={"detay peyzaj"}
              />
            </div>
          ))}
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="slide">
              <img
                src={`/images/karePost/L${index + 1}.png`}
                alt={"detay peyzaj"}
              />
            </div>
          ))}
        </div>
      </div>
      <HakkimizdaTextImg
        title1={title1[lang]}
        title2={title2[lang]}
        text1={text1[lang]}
        text2={text2[lang]}
        text3={text3[lang]}
        text4={text4[lang]}
      />
    </div>
  );
};

export default Hakkimizda;
