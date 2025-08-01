import "./Sektorler.scss";
import SectorCard from "./sectorCard/SectorCard.jsx";
import { sectorsData } from "./sektorData.json";
import { useLang } from "../../langContext.jsx";

const Sektorler = () => {
  const { lang } = useLang();

  return (
    <div className="sektorler">
      <div className="container">
        <div className="sektorler__cards">
          {sectorsData.map((sector) => (
            <SectorCard
              key={sector.id}
              image={sector.image}
              title={sector.title[lang]}
              usageAreas={sector.usageAreas[lang]}
              description={sector.description[lang]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sektorler;
