import { Link } from "react-router-dom";

const HeaderHomeMenu = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand">
          <img
            src={window.location.origin + "/assets/images/nhm.png"}
            className="home_icon"
            alt="logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
          </ul>
        </div> */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                Advantages
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                About DVDMS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderHomeMenu;
