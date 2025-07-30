import "./List.scss";
import ListCard from "../listCard/ListCard";
import FadeInSection from "../../../components/FadeInSection/FadeInSection";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { noProduct } from "./listData.json";

const List = ({
  toggleSidebar,
  currentItems,
  projeler,
  listTitle,
  categoryName,
  lang,
}) => {
  return (
    <div className="projeList">
      <div className="title">
        <div onClick={toggleSidebar} className="titleContent">
          <h3 className="anaa" style={{ fontSize: "1.1rem" }}>
            {categoryName}
          </h3>

          <h3 className="katt" style={{ display: "none", fontSize: "1.1rem" }}>
            {listTitle}
          </h3>
          <div className="filterIconContent">
            <DashboardIcon
              style={{ fontSize: "1.3rem" }}
              className="iconFilter"
            />
          </div>
        </div>
        <hr />
      </div>

      <div className="list">
        {projeler.length > 0 ? (
          currentItems?.map((proje, index) => (
            <FadeInSection key={index}>
              <ListCard key={index} proje={proje} />
            </FadeInSection>
          ))
        ) : (
          <p className="noDaire">{noProduct[lang]}</p>
        )}
      </div>
    </div>
  );
};

export default List;
