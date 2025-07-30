import { Link } from "react-router-dom";
import "./ListCard.scss";
import { useLang } from "../../../langContext";

const ListCard = ({ proje }) => {
  const { lang } = useLang();
  return (
    <Link to={`/urunler/${proje.id}`} className="projeCard">
      <div className="img">
        <img src={proje.coverImage} alt="" />
      </div>
      <div className="detayCard">
        <div className="desc">
          <div className="title">
            <h3>{lang == "tr" ? proje.title : proje.titleEng}</h3>
          </div>
          <div className="text">
            <p>{lang == "tr" ? proje.titleContent : proje.titleContentEng}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListCard;
