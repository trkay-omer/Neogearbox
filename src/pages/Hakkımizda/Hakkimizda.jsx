import "./Hakkimizda.scss";
import ProjectName from "../../Kutuphanem/projectName/ProjectName";
import HakkimizdaTextImg from "../../Kutuphanem/hakkimizdaTextImg/HakkimizdaTextImg";
import WhyOur from "../../Kutuphanem/whyOur/WhyOur";

const Hakkimizda = () => {
  return (
    <div className="hakkimizda">
      <ProjectName />
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
      <HakkimizdaTextImg />
    </div>
  );
};

export default Hakkimizda;
