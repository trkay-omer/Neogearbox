import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Anasayfa from "./pages/anasayfa/Anasayfa.jsx";
import Footer from "./components/Footer/Footer.jsx";
import FooterTop from "./components/FooterTop/FooterTop.jsx";
import Projeler from "./pages/projeler/Projeler.jsx";
import Iletisim from "./pages/iletisim/Iletisim.jsx";
import Hakkimizda from "./pages/Hakkımizda/Hakkimizda.jsx";
import AdminDashboard from "./pages/adminPanel/AdminDashboard.jsx";
import AdminProjeEkle from "./pages/adminPanel/AdminProjeEkle.jsx";
import AdminProjeler from "./pages/adminPanel/AdminProjeler.jsx";
import AdminProjeDuzenle from "./pages/adminPanel/AdminProjeDuzenle.jsx";
import AdminLogin from "./pages/adminPanel/AdminLogin.jsx";
import Categories from "./pages/Categories/Categories.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import Unauthorized from "./pages/yetkisizGiris/Unauthorized.jsx";
import ScrollToTop from "./components/scrollTop/ScrollToTop.jsx";
import AdminCategoryCreate from "./pages/adminPanel/AdminCategoryCreate.jsx";
import AdminCategoryEdit from "./pages/adminPanel/AdminCategoryEdit.jsx";
import PaketDetay from "./pages/PaketDetay/PaketDetay.jsx";
import { LangProvider } from "./langContext.jsx";
import Form from "./pages/Form/Form.jsx";
import Sektorler from "./pages/sektor/Sektorler.jsx";

function App() {
  return (
    <AuthProvider>
      <LangProvider>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Anasayfa />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:linkName" element={<Projeler />} />
          <Route path="/products/:id" element={<PaketDetay />} />
          <Route path="/contact" element={<Iletisim />} />
          <Route path="/corporate" element={<Hakkimizda />} />
          <Route path="/form" element={<Form />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/sectors" element={<Sektorler />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="ekle" element={<AdminProjeEkle />} />
            <Route path="urunler" element={<AdminProjeler />} />
            <Route path="urunler/:id" element={<AdminProjeDuzenle />} />
            <Route path="kategoriekle" element={<AdminCategoryCreate />} />
            <Route path="kategoriduzenle" element={<AdminCategoryEdit />} />
            <Route path="urunler" element={<AdminProjeler />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
        <FooterTop />
        <Footer />
      </LangProvider>
    </AuthProvider>
  );
}

export default App;
