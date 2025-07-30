import "./PaketDetay.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SikcaSorulan from "../../Kutuphanem/sikcaSorulan/SikcaSorulan";
import Loading from "../loading/Loading";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import MrGlide from "../../components/urunDetayGlide/MrGlide";
import NameAndMarka from "../../components/urunDetay/nameAndMarkaHavuz/NameAndMarka";
import { tabletNamee } from "./paketDetayData.json";
import { useLang } from "../../langContext";
import { magazaIsmi } from "../../data.json";

const PaketDetay = () => {
  const { lang } = useLang();
  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      try {
        const paketResponse = await axios.get(
          `${BASE_URL}/api/v1/post/get-by-id?id=${id}`
        );
        setProductDetail(paketResponse.data);
        setSelectedImage(paketResponse.data.coverImage?.filename);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleImageClick = (image) => {
    setSelectedImage(image.filename); // Yeni resmi güncelle
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="projeDetay">
      <div className="projectName">
        <img src={productDetail.coverImage?.filename} alt="" />
        <div className="container">
          <div className="bannerText">
            <div className="title">
              <h1>
                {lang == "tr" ? productDetail.title : productDetail.titleEng}
              </h1>
            </div>
          </div>
        </div>

        <div className="background"></div>
      </div>

      <div className="container">
        <div className="tabletNamee">
          <h3>{tabletNamee[lang]}</h3>
        </div>

        <div className="mainTop">
          <div className="mainSectionSide">
            <div className="product-gallery">
              <div className="single-img">
                <img src={selectedImage} alt="Selected Product" />
              </div>
              <div className="product-thump">
                <MrGlide
                  images={productDetail.images}
                  onImageClick={handleImageClick}
                />
              </div>
            </div>

            <div className="rightActionSide">
              <NameAndMarka
                marka={magazaIsmi[lang]}
                pdf={productDetail?.pdf}
                name={
                  lang == "tr" ? productDetail?.title : productDetail?.titleEng
                }
                desc={
                  lang == "tr"
                    ? productDetail?.titleContent
                    : productDetail?.titleContentEng
                }
              />
            </div>
          </div>
        </div>
      </div>

      <SikcaSorulan />
    </div>
  );
};

export default PaketDetay;
