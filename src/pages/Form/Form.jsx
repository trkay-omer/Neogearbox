import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Form.scss";
import Baslik from "../../Kutuphanem/baslik/Baslik";
import { useLang } from "../../langContext";
import formData from "./FormData.json";

const FormComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { lang } = useLang();

  // Dynamic validation schema based on language
  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, formData.formFields.name.validation.min[lang])
      .max(50, formData.formFields.name.validation.max[lang])
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
        formData.formFields.name.validation.pattern[lang]
      )
      .test(
        "no-dangerous-chars",
        formData.formFields.name.validation.dangerous[lang],
        (value) => {
          if (!value) return true;
          const dangerousChars = /[<>"'`&]/;
          return !dangerousChars.test(value);
        }
      )
      .required(formData.formFields.name.validation.required[lang]),

    email: Yup.string()
      .email(formData.formFields.email.validation.invalid[lang])
      .test(
        "no-dangerous-chars",
        formData.formFields.email.validation.dangerous[lang],
        (value) => {
          if (!value) return true;
          const dangerousChars = /[<>"'`&]/;
          return !dangerousChars.test(value);
        }
      )
      .required(formData.formFields.email.validation.required[lang]),

    subject: Yup.string()
      .min(3, formData.formFields.subject.validation.min[lang])
      .max(100, formData.formFields.subject.validation.max[lang])
      .matches(
        /^[a-zA-ZğüşıöçĞÜŞİÖÇ0-9\s\-\.]+$/,
        formData.formFields.subject.validation.pattern[lang]
      )
      .test(
        "no-dangerous-chars",
        formData.formFields.subject.validation.dangerous[lang],
        (value) => {
          if (!value) return true;
          const dangerousChars = /[<>"'`&]/;
          return !dangerousChars.test(value);
        }
      )
      .test(
        "no-script-tags",
        formData.formFields.subject.validation.script[lang],
        (value) => {
          if (!value) return true;
          const scriptPattern = /<script|javascript:|on\w+=/gi;
          return !scriptPattern.test(value);
        }
      )
      .required(formData.formFields.subject.validation.required[lang]),

    message: Yup.string()
      .min(10, formData.formFields.message.validation.min[lang])
      .max(1000, formData.formFields.message.validation.max[lang])
      .test(
        "no-dangerous-chars",
        formData.formFields.message.validation.dangerous[lang],
        (value) => {
          if (!value) return true;
          const dangerousChars = /[<>"'`&]/;
          return !dangerousChars.test(value);
        }
      )
      .test(
        "no-script-tags",
        formData.formFields.message.validation.script[lang],
        (value) => {
          if (!value) return true;
          const scriptPattern = /<script|javascript:|on\w+=/gi;
          return !scriptPattern.test(value);
        }
      )
      .required(formData.formFields.message.validation.required[lang]),
  });

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Tehlikeli karakterleri temizle - daha kapsamlı güvenlik
      const sanitizedValues = {
        name: values.name
          .trim()
          .replace(/[<>"'`&]/g, "") // < > " ' ` & karakterlerini temizle
          .replace(/javascript:/gi, "") // javascript: protokolünü temizle
          .replace(/on\w+=/gi, ""), // onclick, onload gibi event handler'ları temizle
        email: values.email.trim(),
        subject: values.subject
          .trim()
          .replace(/[<>"'`&]/g, "")
          .replace(/javascript:/gi, "")
          .replace(/on\w+=/gi, ""),
        message: values.message
          .trim()
          .replace(/[<>"'`&]/g, "")
          .replace(/javascript:/gi, "")
          .replace(/on\w+=/gi, ""),
      };

      const response = await fetch("https://formspree.io/f/movlloqk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedValues),
      });

      if (response.ok) {
        // Form başarıyla gönderildi
        resetForm();
        setShowPopup(true);

        // 3 saniye sonra popup'ı kapat
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      } else {
        alert(formData.errorMessages.formError[lang]);
      }
    } catch (error) {
      console.error("Form gönderme hatası:", error);
      alert(formData.errorMessages.formError[lang]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="kullanim">
      <div className="container">
        <div className="support-section">
          <div className="support-image">
            <img src={formData.formImage} alt={formData.imageAlt[lang]} />
          </div>
          <div className="support-form">
            <Baslik
              desc={formData.description[lang]}
              title={formData.title[lang]}
            />

            <Formik
              initialValues={initialValues}
              validationSchema={FormSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <div className="form-field">
                    <Field
                      type="text"
                      name="name"
                      placeholder={formData.formFields.name.placeholder[lang]}
                      className={errors.name && touched.name ? "error" : ""}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="form-field">
                    <Field
                      type="email"
                      name="email"
                      placeholder={formData.formFields.email.placeholder[lang]}
                      className={errors.email && touched.email ? "error" : ""}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="form-field">
                    <Field
                      type="text"
                      name="subject"
                      placeholder={
                        formData.formFields.subject.placeholder[lang]
                      }
                      className={
                        errors.subject && touched.subject ? "error" : ""
                      }
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="form-field">
                    <Field
                      as="textarea"
                      name="message"
                      placeholder={
                        formData.formFields.message.placeholder[lang]
                      }
                      rows="5"
                      className={
                        errors.message && touched.message ? "error" : ""
                      }
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? formData.submitButton.loading[lang]
                      : formData.submitButton.text[lang]}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <h3>{formData.popup.title[lang]}</h3>
              <p>{formData.popup.message[lang]}</p>
              <button onClick={() => setShowPopup(false)}>
                {formData.popup.button[lang]}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
