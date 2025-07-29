import Baslik from "../baslik/Baslik";
import Acardion from "./acardion/Acardion";
import "./WhoFounder.scss";
import { founderData, title, desc } from "./dataWho.json";
import Counts from "../countSayi/Counts";
import { useLang } from "../../langContext.jsx";

const WhoFounder = () => {
  const { lang } = useLang();
  return (
    <div className="whoUsing">
      <div className="container">
        <div className="content">
          <Acardion users={founderData} />
          <div className="left">
            <Baslik title={title[lang]} />
            <p>{desc[lang]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoFounder;
