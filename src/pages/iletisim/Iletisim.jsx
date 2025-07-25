import "./Iletisim.scss";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import data from "../../data.json";

const Iletisim = () => {
  return (
    <div className="iletisim">
      <div className="container">
        <div className="content">
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.727291076892!2d26.403508375703286!3d40.14835797193013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b1a92701400185%3A0xc31f7bd21fd65cfb!2se-360%20Dijital!5e0!3m2!1str!2str!4v1753443077078!5m2!1str!2str"
              className="iframe"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="infoIletisim">
            <div className="itemIletisim">
              <h3>Adres Bilgilerimiz</h3>
              <p>{data.adres}</p>
            </div>

            <div className="itemIletisim">
              <h3>Telefon Numaralarımız</h3>
              <div className="itemList">
                <LocalPhoneIcon />
                <p>
                  <a href={data.telefon_linki}>{data.telefon}</a>
                </p>
              </div>
            </div>

            <div className="itemIletisim">
              <h3>Medya Hesaplarımız</h3>
              <div className="medyas">
                <a href={data.mail_linki} className="itemList">
                  <EmailIcon />
                  <p>{data.mail}</p>
                </a>
                <a
                  id="sea"
                  target="_blank"
                  href={data.instagram_linki}
                  className="itemList"
                >
                  <InstagramIcon />
                  <p>{data.instagram}</p>
                </a>
              </div>
            </div>

            <div className="itemIletisim">
              <h3>Mesai Saatlerimiz</h3>
              <div className="medyas">
                <div className="itemList">
                  <h4>Haftaiçi:</h4>
                  <p>{data.haftaIcı}</p>
                </div>
                <div className="itemList">
                  <h4>Hafta Sonu:</h4>
                  <p>{data.haftaSonu}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iletisim;
