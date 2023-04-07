import { useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import tokenhandle from "../../common/tokenhandle/tokenhandle";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../store/loader/actions";
import * as CONSTANTS from "../../common/constant/constants";
import { postService } from "../../services/commonservice/commonservice";
import toastMessage from "../../common/toastmessage/toastmessage";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    const details = JSON.parse(tokenhandle.getProfileDetail());
    await postService(CONSTANTS.LOGOUT, {
      username: details?.userName,
    })
      .then((r) => {
        console.log("Response", r);
        if (r.status === 200) {
          dispatch(hideLoader());
          tokenhandle.clearToken();
          navigate("/");
        }
      })
      .catch((e) => {
        toastMessage("Logout", "Server can't respon", "error");
      });
  };
  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark2">
        {/* <!-- Navbar Brand--> */}
        <Link className="navbar-brand ps-3" to={"/"}>
          DVDMS
        </Link>
        {/* <!-- Sidebar Toggle--> */}
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          to="#!"
        >
          <i className="fas fa-bars"></i>
        </button>
        {/* <!-- Navbar Search--> */}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        {/* <!-- Navbar--> */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              to={"/"}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <Link className="dropdown-item" to={"/"}>
                  Settings
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={"/"}>
                  Activity Log
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to={"/"}
                  onClick={() => {
                    dispatch(showLoader());
                    logout();
                  }}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
