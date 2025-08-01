import React from "react";
import "./SearchCard.scss";
import { Link } from "react-router-dom";

const SearchCard = ({ closeMenuFunc, product, lang }) => {
  console.log(product);
  return (
    <Link
      onClick={() => {
        closeMenuFunc();
      }}
      to={`/products/${product.id}`}
      className="searchCard"
    >
      <div className="sliderImg">
        <img src={product.coverImage} alt="img" />
      </div>

      <div className="cardSection">
        <div className="CardTop">
          <h4 className="title">
            {lang == "tr" ? product.title : product.titleEng}
          </h4>
          <p className="desc">
            {lang == "tr" ? product.titleContent : product.titleContentEng}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
