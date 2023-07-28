import React from "react";
import NavJson from "../../../nav.json";
const TestSideNav = () => {
  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav fixed accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              {NavJson.map((el) => {
                if (!el.children) {
                  return (
                    <Link
                      className={`nav-link collapsed ${
                        activeMenuItem.menu1 === el?.name ? "active-me" : ""
                      }`}
                      to={{ pathname: `/${el?.url}` }}
                      data-bs-toggle="collapse"
                      data-bs-target={`#${el?.name}layout`}
                      aria-expanded="false"
                      aria-controls={`${el?.name}layout`}
                    >
                      <div className="sb-nav-link-icon">
                        <i className="fas fa-columns"></i>
                      </div>
                      {el?.displayName}
                    </Link>
                  );
                }
                return (
                  <>
                    <Link
                      // className="nav-link collapsed"
                      className={`nav-link ${
                        activeMenuItem.subMenu2 === el?.name ? "active-me" : ""
                      }`}
                      to={"/"}
                      data-bs-toggle="collapse"
                      data-bs-target={`#${el?.name}layout`}
                      aria-expanded="false"
                      aria-controls={`${el?.name}layout`}
                    >
                      {el?.displayName}
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="fas fa-angle-down"></i>
                      </div>
                    </Link>
                    <div
                      className="collapse"
                      id={el?.name}
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        {el?.children &&
                          el?.children?.length > 0 &&
                          el?.children?.map((ele) => {
                            return (
                              <Link
                                // className="nav-link"
                                className={`nav-link ${
                                  activeMenuItem.subMenu3 === ele?.name
                                    ? "active-me2"
                                    : ""
                                }`}
                                to={`/${ele?.url}`}
                                onClick={() =>
                                  handleMenuItemClick(
                                    el?.module,
                                    true,
                                    ele?.name,
                                    true,
                                    ele?.url,
                                    true
                                  )
                                }
                              >
                                {ele?.displayName}
                              </Link>
                            );
                          })}
                      </nav>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default TestSideNav;
