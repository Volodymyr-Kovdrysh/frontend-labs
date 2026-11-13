
import { NavLink, Outlet } from "react-router";

function AppLayout() {
  const linkStyle = ({ isActive }) => ({
    padding: "10px 15px",
    color: isActive ? "white" : "#555",
    backgroundColor: isActive ? "#333" : "#eee",
    borderRadius: 8,
    textDecoration: "none",
  });

  return (
    <div>
      <header style={{ padding: 20 }}>
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <NavLink to="/" end style={linkStyle}>
            Головна
          </NavLink>

          <NavLink to="/traffic-light" style={linkStyle}>
            Світлофор
          </NavLink>

          <NavLink to="/stats" style={linkStyle}>
            Статистика
          </NavLink>
        </nav>
      </header>

      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
