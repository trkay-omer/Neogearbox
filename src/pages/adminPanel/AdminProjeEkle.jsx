import { useEffect, useRef, useState } from "react";
import "./AdminProjeEkle.scss";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

const AdminProjeEkle = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [images, setImages] = useState([]);
  const [imgKapak, setImgKapak] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    titleEng: "",
    categoryId: "",
    type: "kw",
    titleContent: "",
    titleContentEng: "",
  });
  const [isLoading, setIsloading] = useState(false);
  const [categoryies, setCategoryies] = useState([]);
  const inputRef = useRef(null);

  const handleClick = (e) => {
    if (
      !e.target.closest(".image-container") &&
      !e.target.closest(".remove-button")
    ) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    setIsloading(true);
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/category`);
        setCategoryies(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0); // Sayfa her değiştiğinde en üst konuma kaydırma
    setIsloading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/post`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header'ı ekleyin
        },
      });

      if (response.status === 201) {
        const uploadFormData = new FormData();
        const kapakData = new FormData();
        const pdfData = new FormData();

        if (images.length > 0) {
          images.forEach((image) => {
            uploadFormData.append("images", image);
          });
          uploadFormData.append("id", response.data.id);

          await axios.post(`${BASE_URL}/api/v1/image`, uploadFormData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        }

        if (imgKapak) {
          kapakData.append("image", imgKapak);
          kapakData.append("id", response.data.id);

          await axios.post(`${BASE_URL}/api/v1/image/cover`, kapakData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        }

        if (pdf) {
          pdfData.append("image", pdf);
          pdfData.append("id", response.data.id);

          await axios.post(`${BASE_URL}/api/v1/image/pdf`, pdfData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        }

        // ID ekle (örneğin gönderiden dönen ID kullanılabilir)
      }

      setTimeout(() => {
        navigate("/admin/urunler");
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
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

  const handleKapakRemoveImage = () => {
    setImgKapak(null);
  };

  return (
    <div className="projeList">
      <div className="title">
        <h4>Ürün Ekle</h4>
        <hr />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="createProject">
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
                      src={URL.createObjectURL(imgKapak)}
                      alt="kapakResmi"
                    />
                  ) : (
                    <div className="Text">
                      <ImageSearchIcon />
                      Kapak Resmi Ekle
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
                              src={URL.createObjectURL(image)}
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
                    Ürün İsmi (EN):
                    <input
                      type="text"
                      name="titleEng"
                      value={formData.titleEng}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div>
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
                      {categoryies.map((item, index) => (
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
                    Kısa Açıklama (EN):
                    <textarea
                      name="titleContentEng"
                      value={formData.titleContentEng}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="buttonContainer">
                  <button type="submit">Ürün Ekle</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProjeEkle;
