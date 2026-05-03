import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import ArticleDetail from './pages/ArticleDetail.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ProductsAdmin from './pages/admin/ProductsAdmin.jsx'
import ArticlesAdmin from './pages/admin/ArticlesAdmin.jsx'
import SiteConfigAdmin from './pages/admin/SiteConfigAdmin.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/artikel/:slug" element={<ArticleDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="articles" element={<ArticlesAdmin />} />
          <Route path="settings" element={<SiteConfigAdmin />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ScrollToTop />
    </>
  )
}
