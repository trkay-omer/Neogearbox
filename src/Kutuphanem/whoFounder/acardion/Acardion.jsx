import "./Acardion.scss";
import { useLang } from "../../../langContext";
import { Link } from "react-router-dom";

function Acardion({ users }) {
  const { lang } = useLang();
  return (
    <div className="acardion-template">
      <ul className="acardion">
        {users?.map((user, index) => (
          <li key={index}>
            <img src={user.img} alt="" />

            <Link to={user.to} className="content">
              <span>
                <h2>{user.name[lang]}</h2>
                <p>{user.job[lang]}</p>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Acardion;
