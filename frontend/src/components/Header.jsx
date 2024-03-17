
// import { Li, Link } from "react-router-dom";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <nav classname="navbar navbar-expand-lg bg-body-tertiary">
  <div classname="container-fluid">
    <a classname="navbar-brand" href="/">
      StockSmart
    </a>
    <button classname="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span classname="navbar-toggler-icon">
      </span></button>
    <div classname="collapse navbar-collapse" id="navbarSupportedContent">
      <ul classname="navbar-nav me-auto mb-2 mb-lg-0">
        <li classname="nav-item m-2">
          <link to="/" />Login
        </li>
        <li classname="nav-item m-2">
          <link to="/protected/home" />Home
        </li>
        <li classname="nav-item m-2">
          <link to="/register" />Register
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Header;
