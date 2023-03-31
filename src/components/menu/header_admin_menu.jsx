import { useEffect, useState } from "react";
import {
  faUser,
  faLock,
  faRightFromBracket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Basicbutton from "../button/basicbutton";
import tokenhandle from "../../common/tokenhandle/tokenhandle";
import logoutService from "../../services/logoutservice/logoutservice";
import { useNavigate } from "react-router-dom";

const HeaderAdminMenu = () => {
  const navigate = useNavigate();
  const [profileDetails, setProfileDetails] = useState();
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (tokenhandle.getProfileDetail() != null) {
      setProfileDetails(JSON.parse(tokenhandle.getProfileDetail()));
    }
  }, []);

  const callApi = async () => {
    const details = JSON.parse(tokenhandle.getProfileDetail());
    await logoutService("auth/logout", {
      username: details?.userName,
    })
      .then((r) => {
        console.log("Response", r);
        if (r.status === 200) {
          tokenhandle.clearToken();
          navigate("/");
        }
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  const logout = () => {
    callApi();
  };
  const handleOnMouseEnter = (e) => {
    console.log("Target Element", e.target);
    console.log("Next Element", e.target.nextSibling);
    console.log("top", e.target.top);
    e.target.classList.add("show");
    e.target.nextSibling.classList.add("show");
    setHover(true);
  };
  const handleMouseLeave = (e) => {
    const navLinkList = document.getElementsByClassName(
      "nav-link dropdown-toggle"
    );
    const dropDownMenuList = document.getElementsByClassName("dropdown-menu");

    Array.from(navLinkList).forEach((item) => {
      item.classList.remove("show");
    });
    Array.from(dropDownMenuList).forEach((item) => {
      item.classList.remove("show");
    });
    setHover(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top bg-light navbar-dark bg-dark">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="#">
                  Home
                </Link>
              </li>
              <li
                className="nav-item dropdown"
                //onMouseEnter={(e) => handleOnMouseEnter(e)}
                //onMouseLeave={(e) => handleMouseLeave(e)}
              >
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDarkDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </Link>
                <ul
                  className={`dropdown-menu dropdown-menu-dark `}
                  aria-labelledby="navbarDarkDropdownMenuLink"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"/admin/openNotificationDesk"}
                    >
                      Notification
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/admin/program-list"}>
                      Program Desk
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/admin/issueList"}>
                      Issue List
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
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

            <div className="d-flex">
              <ul
                className="navbar-nav "
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li className="nav-item dropdown">
                  <Link className="nav-link" href="#">
                    <FontAwesomeIcon icon={faSearch} />
                  </Link>
                </li>
                <li
                  className="nav-item dropdown"
                  //onMouseEnter={(e) => handleOnMouseEnter(e)}
                  //onMouseLeave={(e) => handleMouseLeave(e)}
                >
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDarkDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faUser} className="me-1" />
                    NHM
                  </Link>

                  <ul
                    className="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end"
                    aria-labelledby="navbarDarkDropdownMenuLink"
                  >
                    <li>
                      <div style={{ width: "300px" }}>
                        <div className="row">
                          <div className="col-1">
                            <FontAwesomeIcon
                              icon={faUser}
                              size="4x"
                              className="ms-2"
                            />
                          </div>

                          <div className="col-11">
                            <div className="ms-2 p-1 text-center">
                              {profileDetails?.userName.toUpperCase()}
                            </div>
                            <div className="row mt-1">
                              <div className="ms-2 p-1 text-center">
                                {profileDetails?.displayName}
                              </div>
                            </div>

                            {profileDetails &&
                              profileDetails.storeDetail.length > 0 &&
                              profileDetails.storeDetail.map((ele) => {
                                return (
                                  <div className="ms-2 p-1 text-center">
                                    STORE : {ele?.name}
                                  </div>
                                );
                              })}

                            {profileDetails &&
                              profileDetails.roleList.length > 0 &&
                              profileDetails.roleList.map((ele, index) => {
                                if (index === 0) {
                                  return (
                                    <div className="ms-2 p-1 text-center">
                                      ROLE : {ele?.name}
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 d-flex ">
                            <Basicbutton
                              className="primary flex-fill m-2"
                              buttonText="Profile"
                              type="button"
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-12 d-flex justify-content-between">
                            <Basicbutton
                              type="button"
                              buttonText="Change Password"
                              className="secondary ms-1"
                              icon={
                                <FontAwesomeIcon
                                  icon={faLock}
                                  className="me-1"
                                />
                              }
                            />
                            <Basicbutton
                              type="button"
                              buttonText="Logout"
                              className="secondary me-1"
                              onClick={logout}
                              icon={
                                <FontAwesomeIcon
                                  icon={faRightFromBracket}
                                  className="me-1"
                                />
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
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
        </div>
      </nav>
      <div style={{ height: "62px" }}>&nbsp;</div>
    </>
  );
};

export default HeaderAdminMenu;
