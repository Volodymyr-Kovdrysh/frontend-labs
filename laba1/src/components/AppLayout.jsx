import { NavLink, Outlet } from "react-router";

const linkStyle = ({ isActive }) => ({
  fontWeight: isActive ? "bold" : "normal",
  textDecoration: isActive ? "underline" : "none",
});

function AppLayout() {
  return (
    <>
      <nav style={{ display: "flex", gap: 16, padding: 16 }}>
        <NavLink to="/" end style={linkStyle}>
          Головна
        </NavLink>
        <NavLink to="/traffic-light" style={linkStyle}>
          Світлофор
        </NavLink>
        <NavLink to="/stats" style={linkStyle}>
          Статистика
        </NavLink>
        <NavLink to="/status" style={linkStyle}>
          Статус
        </NavLink>
      </nav>
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;