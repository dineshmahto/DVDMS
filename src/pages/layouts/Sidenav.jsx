import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSideMenu } from "../../store/activemenu/actions";

const Sidenav = () => {
  const dispatch = useDispatch();

  /**
   * Set side menu active
   **/
  //Check menu active parameters from the local storage if in case user refresh the page
  const localActiveMenuItem = JSON.parse(
    localStorage.getItem("ACTIVE_SIDE_MENU_ITEM")
  );
  let storeMenuActiveItem = useSelector(
    (state) => state?.activemenu?.activeSideMenuItem
  );

  //console.log("Local Active Menu: "+ localActiveMenuItem.menu1);

  //set active menu parameter here
  //if user page refresh set menu active parameter from the local storage
  const [activeMenuItem, setActiveMenuItem] = useState({
    menu1: localActiveMenuItem ? localActiveMenuItem.menu1 : "dashboard",
    isMenu1Active: localActiveMenuItem
      ? localActiveMenuItem.isMenu1Active
      : true,
    subMenu2: localActiveMenuItem ? localActiveMenuItem.subMenu2 : "",
    isSubMenu2Active: localActiveMenuItem
      ? localActiveMenuItem.isSubMenu2Active
      : false,
    subMenu3: localActiveMenuItem ? localActiveMenuItem.subMenu3 : "",
    isSubMenu3Active: localActiveMenuItem
      ? localActiveMenuItem.isSubMenu3Active
      : false,
  });

  useEffect(() => {
    //set first time active menu parameter to local storage
    dispatch(setActiveSideMenu(activeMenuItem));

    //This part is to handle the open submenu collapse if the user refresh the page
    if (localActiveMenuItem) {
      //if submenu2 or submenu3 is true i.e menu1 is also active
      //submenu2 and submenu3 value is taking from the current state
      if (activeMenuItem.isSubMenu2Active || activeMenuItem.isSubMenu3Active) {
        //find the topmost active menu by class name "active-me" i.e menu1
        let activeMenu1Elements =
          document.getElementsByClassName("active-me")[0];

        //removing "collapsed" class from topmost active menu i.e menu1
        activeMenu1Elements.classList.remove("collapsed");

        //get value of data attribute from topmost active menu i.e menu1
        //this data attribute value is the id name of the collapse submenu items container element
        let showSubmenuElementID =
          activeMenu1Elements.getAttribute("data-bs-target");

        //Now find the element of id which hold submenu items
        //and substring(1) is use for removing '#' from the id name string
        let subMenuContainerElement = document.getElementById(
          showSubmenuElementID.substring(1)
        );

        //lastly add 'show' class to show submenu
        subMenuContainerElement.classList.add("show");
      }
    }
  }, [activeMenuItem]);

  const handleMenuItemClick = (
    menu1,
    isMenu1Active,
    subMenu2,
    isSubMenu2Active,
    subMenu3,
    isSubMenu3Active
  ) => {
    setActiveMenuItem((activeMenuItem) => ({
      ...activeMenuItem,
      menu1: menu1,
      isMenu1Active: isMenu1Active,
      subMenu2: subMenu2,
      isSubMenu2Active: isSubMenu2Active,
      subMenu3: subMenu3,
      isSubMenu3Active: isSubMenu3Active,
    }));
  };

  // const activeSideMenuItem = useSelector(state => state?.activemenu?.activeSideMenuItem?.menu1);
  // console.log("Store Menu Item: "+useSelector(state => state?.activemenu?.activeSideMenuItem));

  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav fixed accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              {/* <div className="sb-sidenav-menu-heading">Core</div> */}
              <Link
                className={`nav-link ${
                  activeMenuItem.menu1 === "dashboard" ? "active-me" : ""
                }`}
                to={{ pathname: "/dashboard" }}
                onClick={() =>
                  handleMenuItemClick("dashboard", true, "", false, "", false)
                }
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </Link>
              {/* <div className="sb-sidenav-menu-heading">Interface</div> */}
              {/* Demand */}
              <Link
                className={`nav-link collapsed ${
                  activeMenuItem.menu1 === "demand" ? "active-me" : ""
                }`}
                to={{}}
                data-bs-toggle="collapse"
                data-bs-target="#demandLayouts"
                aria-expanded="false"
                aria-controls="demandLayouts"
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
                id="demandLayouts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "notification"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/demandnotification" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "demand",
                        true,
                        "notification",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Notification
                  </Link>
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "annualdemand"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/annualdemand" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "demand",
                        true,
                        "annualdemand",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Annual Demand
                  </Link>
                </nav>
              </div>
              {/* End of Demand SubListing */}
              {/* Stock */}
              <Link
                className={`nav-link collapsed ${
                  activeMenuItem.menu1 === "stock" ? "active-me" : ""
                }`}
                to={{}}
                data-bs-toggle="collapse"
                data-bs-target="#stockLayouts"
                aria-expanded="false"
                aria-controls="stockLayouts"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-warehouse"></i>
                </div>
                Stock
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </Link>
              <div
                className="collapse"
                id="stockLayouts"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "stocklist"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/stocklisting" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "stock",
                        true,
                        "stocklist",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Stock List
                  </Link>
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "stockentry"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openstockentry" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "stock",
                        true,
                        "stockentry",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Stock Entry
                  </Link>
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "condemnation-register"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openCondeminationRegister" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "stock",
                        true,
                        "condemnation-register",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Condemnation Register
                  </Link>
                </nav>
              </div>

              {/* End of Stock */}

              {/* Admin */}
              <Link
                className="nav-link collapsed"
                to={{}}
                data-bs-toggle="collapse"
                data-bs-target="#collapseAdmin"
                aria-expanded="false"
                aria-controls="collapseAdmin"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-lock"></i>
                </div>
                Admin
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </Link>
              <div
                className="collapse"
                id="collapseAdmin"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link className="nav-link" to={{ pathname: "/listuser" }}>
                    User Desk
                  </Link>
                  <Link className="nav-link" to={{ pathname: "/listrole" }}>
                    Role Desk
                  </Link>
                </nav>
              </div>

              {/* End of Stock */}

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
