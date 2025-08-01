import Baslik from "../../Kutuphanem/baslik/Baslik";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./Categories.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { useLang } from "../../langContext";
import Loading from "../loading/Loading";
import { title, subTitle } from "./categoriesData.json";

const Categories = () => {
  const { lang } = useLang();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryies, setCategoryies] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/category`);
        setCategoryies(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="categoriesPage">
      <div className="container">
        <Baslik title={title[lang]} desc={subTitle[lang]} />
        <div className="categoryCardsContent">
          {categoryies.map((item, index) => (
            <CategoryCard
              key={index}
              linkName={item.linkName}
              categoryName={lang == "tr" ? item.name : item.nameEng || ""}
              img={item.coverImage?.filename || null}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
