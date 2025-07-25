import CardItem from "./cardItem/CardItem";
import "./TwoCategory.scss";
import { dataCategoryTwo } from "./twoData.json";

const TwoCategory = () => {
  //   const dataSliderOrnek = [
  //     { title: "title", desc: "desc", buttonText: "buttonText", img: "img" },
  //     { title: "title", desc: "desc", buttonText: "buttonText", img: "img" },
  //   ];

  return (
    <div>
      <div className="container">
        <div className="product-cards">
          {dataCategoryTwo.map((card, index) => (
            <CardItem
              title={card.title}
              desc={card.desc}
              buttonText={card.buttonText}
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
