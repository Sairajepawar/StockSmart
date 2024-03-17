import { Link } from "react-router-dom";
import { useAuth } from "./Auth";
const Header = () => {


  const [auth,setAuth]=useAuth()
  function handleLogout() {
    setAuth((prevAuth) => {
      return {
        ...prevAuth,
        user: "",
        token: "",
      };
    });
    localStorage.removeItem("auth");
    alert("Logged Out");
  }


  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          StockSmart
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item m-2">
              <Link to="/">Login</Link>
            </li>
            <li className="nav-item m-2">
              <Link to="/protected/home">Home</Link>
            </li>
            <li className="nav-item m-2">
              <Link to="/register">Register</Link>
            </li>
            <li className="nav-item m-2">

              <Link to="/register"  onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Header;
