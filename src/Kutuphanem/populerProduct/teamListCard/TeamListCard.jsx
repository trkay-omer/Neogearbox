import { Link } from "react-router-dom";
import "./TeamListCard.scss";
import { useLang } from "../../../langContext";

function TeamlisCard({ product }) {
  const { lang } = useLang();
  return (
    <li className="glide__slide">
      <Link to={`/urunler/${product.id}`} className="card">
        <div className="sliderImg">
          <img src={product.coverImage} alt="" />
        </div>

        <div className="cardSection">
          <div className="CardTop">
            <h4 className="title">
              {lang == "tr" ? product?.title : product.titleEng}
            </h4>
            <p className="desc">
              {" "}
              {lang == "tr" ? product?.titleContent : product.titleContentEng}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default TeamlisCard;
