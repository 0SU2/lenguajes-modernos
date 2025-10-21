import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./router/ProtectedRoute";
import PublicRoute from "./router/PublicRoute";

export default function App() {
  return (
    <Routes>
      {/* Rutas publicas */}
      <Route element={<PublicRoute/>}>
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Route>
      </Route>

      {/* Rutas privadas */}

      {/* Rutas Raiz */}
      <Route path="/" element={<Navigate to="/login" replace/>}/>

      {/* Ruta no encontrada */}
      <Route path="*" element={<div className="p-6 text-white">Pagina no encontrada :&lt;</div>}/>
    </Routes>
  )
}