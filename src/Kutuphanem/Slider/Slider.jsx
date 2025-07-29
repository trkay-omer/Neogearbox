import { useEffect } from "react";
import Glide from "@glidejs/glide";
import "./Sldier.scss";
import { dataSlider } from "./dataSlider.json";
import { useLang } from "../../langContext.jsx";

const Slider = ({ loading }) => {
  const { lang } = useLang();
  useEffect(() => {
    const glideSlider = new Glide(".glideSlider", {
      type: "carousel",
      startAt: 0,
      perView: 1,
      autoplay: 3000,
    });

    glideSlider.mount();

    return () => {
      glideSlider.destroy();
    };
  }, [loading]);

  return (
    <div className="glideSlider">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {dataSlider.map((slide, index) => (
            <li className="glide__slide" key={index}>
              <img src={slide.img} alt="Bake and Bond" />
              <div className="container">
                <div className="bannerText">
                  <div className="title">
                    <h1>{slide.title[lang]}</h1>
                    <h3>{slide.subTitle[lang]}</h3>
                  </div>
                </div>
              </div>
              <div className="background"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Slider;
