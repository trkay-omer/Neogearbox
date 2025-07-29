import { Link } from "react-router-dom";
import Baslik from "../baslik/Baslik";
import "./Counts.scss";
import { dataCounts } from "./dataCounts.json";
import CountCard from "./countCard/CountCard";
import { useLang } from "../../langContext";

const Counts = () => {
  const { lang } = useLang();
  return (
    <div className="counts">
      <div className="container">
        <div className="countsContent">
          {dataCounts.map((item, index) => (
            <CountCard
              key={index}
              count={item.count}
              nicelik={item.nicelik[lang]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Counts;
