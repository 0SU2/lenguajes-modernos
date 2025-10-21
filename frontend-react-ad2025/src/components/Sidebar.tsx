import { NavLink } from "react-router-dom";

export default function SideBar() {
  const link = ({ isActive }: { isActive: boolean }) => `hover:bg-base-200 rounded-lg ${isActive ? 'bg-base-200 font-semibold' : ''}`
  return (
    <div className="p-4 flex-1 flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Panel</h2>
      </div>
      <ul className="menu gap-1">
        <li>
          <NavLink to="/dashboard" className={link}>Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/empleados" className={link}>Empleados</NavLink>
        </li>
      </ul>
    </div>
  )
}