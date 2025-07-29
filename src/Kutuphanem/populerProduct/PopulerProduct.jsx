import Baslik from "../baslik/Baslik";
import ProjelerGlide from "./ProjerlerGlide/ProjelerGlide";
import "./PopulerProduct.scss";
import { useLang } from "../../langContext.jsx";
import data from "./PopulerProductData.json";

const PopulerProduct = ({ products }) => {
  const { lang } = useLang();
  return (
    <div className="bestTeam">
      <div className="container">
        <div className="content">
          <div className="left">
            <Baslik title={data.title[lang]} desc={data.desc[lang]} />
          </div>
          <hr />
          <div className="TeamlistCards">
            <ProjelerGlide perView={3} products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopulerProduct;
