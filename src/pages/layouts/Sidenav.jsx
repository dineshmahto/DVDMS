import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSideMenu } from "../../store/activemenu/actions";
import NavJson from "../../routes/nav.json";

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
      if (activeMenuItem.isSubMenu3Active) {
        //find the topmost active menu by class name "active-me" i.e menu1
        let activeSubMenu2Elements =
          document.getElementsByClassName("active-me")[1];

        //removing "collapsed" class from topmost active menu i.e menu1
        activeSubMenu2Elements?.classList?.remove("collapsed");

        //get value of data attribute from topmost active menu i.e menu1
        //this data attribute value is the id name of the collapse submenu items container element
        let showSubmenuElementID =
          activeSubMenu2Elements?.getAttribute("data-bs-target");

        //Now find the element of id which hold submenu items
        //and substring(1) is use for removing '#' from the id name string
        let subMenuContainerElement = document.getElementById(
          showSubmenuElementID?.substring(1)
        );

        //lastly add 'show' class to show submenu
        subMenuContainerElement?.classList?.add("show");
      } else {
        $(".sb-sidenav-menu")?.find(".show")?.removeClass("show");
        $(".sb-sidenav-menu-nested")?.find(".nav-link")?.addClass("collapsed");
      }
      if (activeMenuItem.isSubMenu2Active) {
        //find the topmost active menu by class name "active-me" i.e menu1
        let activeMenu1Elements =
          document.getElementsByClassName("active-me")[0];
        let activeSubMenu2Elements =
          document.getElementsByClassName("active-me")[1];

        //removing "collapsed" class from topmost active menu i.e menu1
        activeMenu1Elements?.classList?.remove("collapsed");

        //get value of data attribute from topmost active menu i.e menu1
        //this data attribute value is the id name of the collapse submenu items container element
        let showSubmenuElementID =
          activeMenu1Elements?.getAttribute("data-bs-target");

        //Now find the element of id which hold submenu items
        //and substring(1) is use for removing '#' from the id name string
        let subMenuContainerElement = document.getElementById(
          showSubmenuElementID?.substring(1)
        );

        //lastly add 'show' class to show submenu
        subMenuContainerElement?.classList?.add("show");
      } else {
        $(".sb-sidenav-menu")?.find(".show")?.removeClass("show");
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

  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav fixed accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              {NavJson &&
                NavJson?.length > 0 &&
                NavJson.map((el) => {
                  if (!el.children) {
                    if ([1, 21, 22].includes(el.id)) {
                      return (
                        <Link
                          key={el?.name}
                          className={`nav-link collapsed ${
                            activeMenuItem.menu1 === el?.name ? "active-me" : ""
                          }`}
                          to={{ pathname: `/${el?.url}` }}
                          onClick={() =>
                            handleMenuItemClick(
                              el?.name,
                              true,
                              "",
                              false,
                              "",
                              false
                            )
                          }
                        >
                          <div className="sb-nav-link-icon">
                            <i className={`fas ${el?.iconName}`}></i>
                          </div>
                          {el?.displayName}
                        </Link>
                      );
                    } else {
                      return null;
                    }
                  }
                  if ([14, 41].includes(el?.id)) {
                    return (
                      <>
                        <Link
                          key={el?.name}
                          // className="nav-link collapsed"
                          className={`nav-link ${
                            activeMenuItem.menu1 === el?.name ? "active-me" : ""
                          }`}
                          to={"/"}
                          data-bs-toggle="collapse"
                          data-bs-target={`#${el?.name}Layouts`}
                          aria-expanded="false"
                          aria-controls={`${el?.name}Layouts`}
                        >
                          <div className="sb-nav-link-icon">
                            <i className={`fas ${el?.iconName}`}></i>
                          </div>
                          {el?.displayName}
                          <div className="sb-sidenav-collapse-arrow">
                            <i className="fas fa-angle-down"></i>
                          </div>
                        </Link>
                        <div
                          className="collapse"
                          id={`${el?.name}Layouts`}
                          aria-labelledby="headingOne"
                          data-bs-parent="#sidenavAccordion"
                        >
                          <nav className="sb-sidenav-menu-nested nav">
                            {el?.children &&
                              el?.children?.length > 0 &&
                              el?.children?.map((ele) => {
                                if (!ele?.children) {
                                  if ([21, 22].includes(ele?.id)) {
                                    return (
                                      <Link
                                        key={ele?.name}
                                        // className="nav-link"
                                        className={`nav-link ${
                                          activeMenuItem.subMenu2 === ele?.name
                                            ? "active-me1"
                                            : ""
                                        }`}
                                        to={{ pathname: `${ele?.url}` }}
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
                                  }
                                }
                                if ([23].includes(ele?.id)) {
                                  return (
                                    <>
                                      <Link
                                        key={ele?.name}
                                        // className="nav-link collapsed"
                                        className={`nav-link ${
                                          activeMenuItem.subMenu2 === ele?.name
                                            ? "active-me"
                                            : ""
                                        }`}
                                        to={"/"}
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#${ele?.name}`}
                                        aria-expanded="false"
                                        aria-controls={ele?.name}
                                      >
                                        {ele?.displayName}
                                        <div className="sb-sidenav-collapse-arrow">
                                          <i className="fas fa-angle-down"></i>
                                        </div>
                                      </Link>
                                      <div
                                        className="collapse"
                                        id={ele?.name}
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#sidenavAccordionPages"
                                      >
                                        <nav className="sb-sidenav-menu-nested nav">
                                          {ele?.children &&
                                            ele?.children?.length > 0 &&
                                            ele?.children?.map((subItem) => {
                                              if (
                                                [55, 56, 57, 58, 66].includes(
                                                  subItem?.id
                                                )
                                              ) {
                                                return (
                                                  <Link
                                                    key={subItem?.name}
                                                    // className="nav-link"
                                                    className={`nav-link ${
                                                      activeMenuItem.subMenu3 ===
                                                      `/${subItem?.name}`
                                                        ? "active-me2"
                                                        : ""
                                                    }`}
                                                    to={{
                                                      pathname: `${subItem?.url}`,
                                                    }}
                                                    onClick={() =>
                                                      handleMenuItemClick(
                                                        el?.module,
                                                        true,
                                                        ele?.name,
                                                        true,
                                                        subItem?.url,
                                                        true
                                                      )
                                                    }
                                                  >
                                                    {subItem?.displayName}
                                                  </Link>
                                                );
                                              }
                                            })}
                                        </nav>
                                      </div>
                                    </>
                                  );
                                }
                              })}
                          </nav>
                        </div>
                      </>
                    );
                  }
                })}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidenav;
