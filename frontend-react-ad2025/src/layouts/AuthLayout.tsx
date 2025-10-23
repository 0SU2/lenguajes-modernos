import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const isRegister = location.pathname === '/register';
  return (
    <div className="min-h-screen grid place-items-center bg-base-200">
      <div className={`w-full ${isRegister ? "max-w-4xl min-w-[800px]" : "max-w-md"} `}>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}