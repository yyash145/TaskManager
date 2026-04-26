import { Outlet, Link, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/jwt";
import "../index";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/auth"); // ✅ don't hard reload
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-left">
          <h2 className="logo">Task Manager</h2>
          <Link to="/task" className="nav-link">
            Create Task
          </Link>
          <Link to="/tasks" className="nav-link">
            All Tasks
          </Link>
        </div>

        <div className="nav-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        Oristo Assessment by Yash Maheshwari
      </footer>
    </div>
  );
};

export default Layout;