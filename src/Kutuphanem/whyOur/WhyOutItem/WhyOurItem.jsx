import "./WhyOurItem.scss";
import { useLang } from "../../../langContext";

const WhyOurItem = ({ post }) => {
  const { lang } = useLang();
  return (
    <li className="glide__slide">
      <div className="postSlide">
        <img src={`/images/postImg/${post.img}`} alt={post.title[lang]} />
        <div className="bottomBar">
          <h3>{post.title[lang]}</h3>
        </div>
      </div>
    </li>
  );
};

export default WhyOurItem;
