import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              {/* <div className="sb-sidenav-menu-heading">Core</div> */}
              <Link id="dashboard" className="nav-link active-me" to={{ pathname: "/dashboard" }}>
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </Link>
              {/* <div className="sb-sidenav-menu-heading">Interface</div> */}
              <Link id="demand"
                className="nav-link collapsed"
                to={{}}
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded="false"
                aria-controls="collapseLayouts"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-columns"></i>
                </div>
                Demand
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </Link>
              <div
                className="collapse"
                id="collapseLayouts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link id="notification"
                    className="nav-link"
                    to={{ pathname: "/demandnotification" }}
                  >
                    Notification
                  </Link>
                  <Link id="annualdemand" className="nav-link" to={{ pathname: "/annualdemand" }}>
                    Annual Demand
                  </Link>
                </nav>
              </div>
              <Link
                className="nav-link collapsed"
                to={{}}
                data-bs-toggle="collapse"
                data-bs-target="#collapsePages"
                aria-expanded="false"
                aria-controls="collapsePages"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                Pages
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </Link>
              <div
                className="collapse"
                id="collapsePages"
                aria-labelledby="headingTwo"
                data-bs-parent="#sidenavAccordion"
              >
                <nav
                  className="sb-sidenav-menu-nested nav accordion"
                  id="sidenavAccordionPages"
                >
                  <Link
                    className="nav-link collapsed"
                    to={"/"}
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesCollapseAuth"
                    aria-expanded="false"
                    aria-controls="pagesCollapseAuth"
                  >
                    Authentication
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </Link>
                  <div
                    className="collapse"
                    id="pagesCollapseAuth"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordionPages"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <Link className="nav-link" to={"/"}>
                        Login
                      </Link>
                      <Link className="nav-link" to={"/"}>
                        Register
                      </Link>
                      <Link className="nav-link" to={"/"}>
                        Forgot Password
                      </Link>
                    </nav>
                  </div>
                  <Link
                    className="nav-link collapsed"
                    to={""}
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesCollapseError"
                    aria-expanded="false"
                    aria-controls="pagesCollapseError"
                  >
                    Error
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </Link>
                  <div
                    className="collapse"
                    id="pagesCollapseError"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordionPages"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <Link className="nav-link" to={"/"}>
                        401 Page
                      </Link>
                      <Link className="nav-link" to={"/"}>
                        404 Page
                      </Link>
                      <Link className="nav-link" to={"/"}>
                        500 Page
                      </Link>
                    </nav>
                  </div>
                </nav>
              </div>
              <div className="sb-sidenav-menu-heading">Addons</div>
              <Link className="nav-link" to={"/"}>
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Charts
              </Link>
              <Link className="nav-link" to={"/"}>
                <div className="sb-nav-link-icon">
                  <i className="fas fa-table"></i>
                </div>
                Tables
              </Link>
            </div>
          </div>
          {/* <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Start Bootstrap
                </div> */}
        </nav>
      </div>
    </>
  );
};

export default Sidenav;
