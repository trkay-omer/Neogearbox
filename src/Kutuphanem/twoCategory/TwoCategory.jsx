import CardItem from "./cardItem/CardItem";
import "./TwoCategory.scss";
import { dataCategoryTwo } from "./twoData.json";
import { useLang } from "../../langContext.jsx";

const TwoCategory = () => {
  const { lang } = useLang();

  return (
    <div>
      <div className="container">
        <div className="product-cards">
          {dataCategoryTwo.map((card, index) => (
            <CardItem
              title={card.title[lang]}
              desc={card.desc[lang]}
              buttonText={card.buttonText[lang]}
              img={card.img}
              key={`${index}.cardItem`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwoCategory;
