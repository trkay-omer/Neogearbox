import React from "react";
import "./KullanımAlanları.scss";
import Baslik from "../../Kutuphanem/baslik/Baslik";

const KullanımAlanları = () => {
  return (
    <div className="kullanim">
      <div className="container">
        <div className="support-section">
          <div className="support-image">
            <img src="/images/form/form.jpeg" alt="Destek Görseli" />
          </div>
          <d iv className="support-form">
            <Baslik desc={"Sizlere Dönelim"} title={"Form Gönderin"} />
            <form>
              <input type="text" placeholder="Ad Soyad" required />
              <input type="email" placeholder="E-mail" required />
              <input type="text" placeholder="Konu" required />
              <textarea placeholder="Mesajınız" rows="5" required></textarea>
              <button type="submit">Gönder</button>
            </form>
          </d>
        </div>
      </div>
    </div>
  );
};

export default KullanımAlanları;
