import { useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import tokenhandle from "../../common/tokenhandle/tokenhandle";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader } from "../../store/loader/actions";
import {
  loginResponse,
  logout,
  logoutResponse,
} from "../../store/login/actions";
import toastMessage from "../../common/toastmessage/toastmessage";
import CheckBox from "../../components/switch/switchcheckbox";
import { handledarkMode } from "../../store/darkmode/action";
import {
  NETWORK_STATUS_CODE,
  SERVER_STATUS_CODE,
} from "../../common/constant/constant";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.darkMode);
  const { isdarkMode } = mode;
  const logOutResponse = useSelector((state) => state?.login?.logoutResponse);
  console.log("logout Response", logOutResponse);
  useEffect(() => {
    if (logOutResponse && logOutResponse.status === 200) {
      if (logOutResponse?.data?.status === SERVER_STATUS_CODE?.SUCCESS) {
        tokenhandle.clearToken();
        toastMessage("LOGOUT", logOutResponse?.data?.message, "success");
        dispatch(logoutResponse(""));
        //dispatch(hideLoader());
        navigate("/");
      } else if (logOutResponse?.data?.status === SERVER_STATUS_CODE?.FAILED) {
        toastMessage("LOGOUT", logOutResponse?.data?.message, "error");
        dispatch(logOutResponse(""));
      }
    } else if (
      logOutResponse &&
      logOutResponse?.status === NETWORK_STATUS_CODE.INTERNAL_ERROR
    ) {
      dispatch(hideLoader());
      toastMessage("LOGOUT", logOutResponse?.data?.message, "error");
      dispatch(loginResponse(""));
    }
  }, [logOutResponse]);
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
        <CheckBox
          type="checkbox"
          onChange={() => {
            isdarkMode
              ? dispatch(handledarkMode(false))
              : dispatch(handledarkMode(true));
          }}
          labelText="DarkMode"
        />
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
                  onClick={() => {
                    const details = JSON.parse(tokenhandle.getProfileDetail());
                    dispatch(
                      logout({
                        username: details?.userName,
                      })
                    );
                    // dispatch(showLoader());
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
