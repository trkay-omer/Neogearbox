import { useEffect, useRef, useState } from "react";
import "./AdminProjeDuzenle.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../config/api";
import Loading from "../loading/Loading";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

const AdminProjeDuzenle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const inputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    titleEng: "",
    categoryId: "",
    type: "kw",
    titleContent: "",
    titleContentEng: "",
    portion: "",
  });
  const [isLoading, setIsloading] = useState(true);

  const [images, setImages] = useState([]);
  const [imgKapak, setImgKapak] = useState(null);
  const [pdf, setPdf] = useState(null);

  const [initialImages, setInitialImages] = useState([]); // İlk gelen resimler
  const [initialKapakImages, setInitialKapakImages] = useState(null); // İlk gelen kapak
  const [initialPdf, setInitialPdf] = useState(null);

  const [categories, setCategories] = useState([]);

  const [addedImages, setAddedImages] = useState([]); // Yeni eklenen resimler // buraya img dosyası gelecek
  const [removedImages, setRemovedImages] = useState([]); // Silinen resimler

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCategories = await axios.get(
          `${BASE_URL}/api/v1/category`
        );

        const response = await axios.get(
          `${BASE_URL}/api/v1/post/get-by-id?id=${id}`
        );
        if (response.status === 200) {
          setCategories(responseCategories.data);
          console.log(response.data);
          setFormData((prevState) => ({
            ...prevState,

            title: response.data.title || "",
            titleEng: response.data.titleEng || "",
            categoryId: response.data.postDetails.category.id || "",
            type: "kw",
            titleContent: response.data.titleContent || "",
            titleContentEng: response.data.titleContentEng || "",
          }));
          setImgKapak(response.data.coverImage);
          setImages(response.data.images);
          setPdf(response.data.pdf);
          setInitialKapakImages(response.data.coverImage);
          setInitialImages(response.data.images);
          setInitialPdf(response.data.pdf);
          // Buraya pdf

          setTimeout(() => {
            setIsloading(false);
          }, 500);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const added = images.filter(
      (image) =>
        !initialImages.some((initialImage) => initialImage.id === image.id)
    );
    const removed = initialImages.filter(
      (image) => !images.some((images) => images.id === image.id)
    );

    setAddedImages(added);
    setRemovedImages(removed);
  }, [images, initialImages]);

  const handleClick = (e) => {
    if (
      !e.target.closest(".image-container") &&
      !e.target.closest(".remove-button")
    ) {
      inputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0); // Sayfa her değiştiğinde en üst konuma kaydırma
    setIsloading(true);

    try {
      await axios.put(`${BASE_URL}/api/v1/post?id=${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header'ı ekleyin
        },
      });

      if (imgKapak !== initialKapakImages) {
        if (imgKapak === null) {
          const responseKapakDelete = await axios.delete(
            `${BASE_URL}/api/v1/image/cover-delete?postId=${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Authorization header'ı ekleyin
              },
            }
          );
        } else {
          const kapakData = new FormData();
          kapakData.append("image", imgKapak);
          kapakData.append("id", id);

          const kapakImagesResponse = await axios.post(
            `${BASE_URL}/api/v1/image/cover`,
            kapakData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
      }

      if (pdf !== initialPdf) {
        const pdfData = new FormData();
        pdfData.append("image", pdf);
        pdfData.append("id", id);

        const pdfResponse = await axios.post(
          `${BASE_URL}/api/v1/image/pdf`,
          pdfData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (images !== initialImages) {
        if (addedImages.length > 0) {
          const formDataAdded = new FormData();
          addedImages.forEach((image) => {
            formDataAdded.append("images", image);
          });
          formDataAdded.append("id", id);
          await axios.post(`${BASE_URL}/api/v1/image`, formDataAdded, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        }

        if (removedImages.length > 0) {
          const formDataDeleted = new FormData();
          removedImages.forEach((image) => {
            formDataDeleted.append("imagesId", image.id);
          });
          formDataDeleted.append("postId", id);

          await axios.delete(
            `${BASE_URL}/api/v1/image/delete-by-id`,

            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
              data: formDataDeleted,
            }
          );
        }
      }

      setTimeout(() => {
        navigate("/admin/urunler");
        setIsloading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setImgKapak(file);
  };

  const handleKapakRemoveImage = async () => {
    setImgKapak(null);
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Ürün Düzenle</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="projeDuzenle">
          <form className="formCreate" onSubmit={handleSubmit}>
            <div className="leftCreate">
              <div className="avatar">
                <input
                  type="file"
                  accept="image/*"
                  className="upload-input"
                  id="kapakFoto"
                  onChange={handleKapakImageChange}
                  style={{ display: "none" }}
                />

                <label htmlFor="kapakFoto" className="kapsayiciButton">
                  {imgKapak ? (
                    <img
                      className="kapakImgg"
                      src={imgKapak.filename || URL.createObjectURL(imgKapak)}
                      alt="kapakResmi"
                    />
                  ) : (
                    <div className="Text">
                      <ImageSearchIcon />
                      Kategori Resmi Ekle
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="rightCreate">
              <div className="avatarResimler">
                <input
                  type="file"
                  accept="image/*"
                  className="upload-input"
                  multiple
                  id="file-input"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  ref={inputRef}
                />

                <div onClick={handleClick} className="kapsayiciButton">
                  {images.length > 0 ? (
                    <div className="images-preview-container">
                      {images.map((image, index) => {
                        return (
                          <div key={index} className="image-container">
                            <img
                              src={image.filename || URL.createObjectURL(image)}
                              alt={`Uploaded Preview ${index}`}
                            />
                            <button
                              type="button"
                              className="remove-button"
                              onClick={(event) => {
                                event.stopPropagation(); // silerken input açılmasın
                                handleRemoveImage(index);
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="Text">
                      <ImageSearchIcon />
                      Ürün Resimleri Ekle
                    </div>
                  )}
                </div>
              </div>

              <div className="bottomText">
                <div>
                  <label>
                    Ürün İsmi (TR):
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Ürün İsmi (ENG):
                    <input
                      type="text"
                      name="titleEng"
                      value={formData.titleEng}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label>
                    PDF:
                    <input
                      type="file"
                      name="pdf"
                      accept=".pdf"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setPdf(file);
                      }}
                    />
                  </label>

                  {typeof pdf === "object" && pdf !== null && pdf.name ? (
                    <p style={{ alignSelf: "flex-end", marginTop: "20px" }}>
                      Yeni seçilen dosya: {pdf.name}
                    </p>
                  ) : pdf && pdf.filename ? (
                    <a
                      href={pdf.filename}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ alignSelf: "flex-end", marginTop: "20px" }}
                    >
                      Mevcut PDF'yi Görüntüle
                    </a>
                  ) : null}
                </div>

                <div>
                  <label>
                    Kategori:
                    <select
                      onChange={handleChange}
                      name="categoryId"
                      value={formData.categoryId}
                    >
                      <option value="">Seri Seçiniz</option>
                      {categories.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <input type="hidden" name="type" value="bake" />
                  </label>
                </div>

                <div>
                  <label>
                    Kısa Açıklama (TR):
                    <textarea
                      name="titleContent"
                      value={formData.titleContent}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Kısa Açıklama (ENG):
                    <textarea
                      name="titleContentEng"
                      value={formData.titleContentEng}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="buttonContainer">
                  <button type="submit">Ürün Düzenle</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProjeDuzenle;
