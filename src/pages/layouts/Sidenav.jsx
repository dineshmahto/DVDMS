import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSideMenu } from "../../store/activemenu/actions";
import { showLoader } from "../../store/loader/actions";

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
        activeSubMenu2Elements.classList.remove("collapsed");

        //get value of data attribute from topmost active menu i.e menu1
        //this data attribute value is the id name of the collapse submenu items container element
        let showSubmenuElementID =
          activeSubMenu2Elements.getAttribute("data-bs-target");

        //Now find the element of id which hold submenu items
        //and substring(1) is use for removing '#' from the id name string
        let subMenuContainerElement = document.getElementById(
          showSubmenuElementID.substring(1)
        );

        //lastly add 'show' class to show submenu
        subMenuContainerElement.classList.add("show");
      } else {
        $(".sb-sidenav-menu").find(".show").removeClass("show");
        $(".sb-sidenav-menu-nested").find(".nav-link").addClass("collapsed");
      }
      if (activeMenuItem.isSubMenu2Active) {
        //find the topmost active menu by class name "active-me" i.e menu1
        let activeMenu1Elements =
          document.getElementsByClassName("active-me")[0];
        let activeSubMenu2Elements =
          document.getElementsByClassName("active-me")[1];

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
      } else {
        $(".sb-sidenav-menu").find(".show").removeClass("show");
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
                      activeMenuItem.subMenu2 === "openNotificationDesk"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openNotificationDesk" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "demand",
                        true,
                        "openNotificationDesk",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Notification
                  </Link>
                </nav>
              </div>
              {/* End of Demand SubListing */}

              {/* Order Management started */}
              <Link
                className={`nav-link collapsed ${
                  activeMenuItem.menu1 === "ordermgmt" ? "active-me" : ""
                }`}
                to={{}}
                data-bs-toggle="collapse"
                data-bs-target="#ordermgmt"
                aria-expanded="false"
                aria-controls="ordermgmt"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-list-radio"></i>
                </div>
                Order Mgmt
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </Link>
              <div
                className="collapse"
                id="ordermgmt"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "openPurchaseOrderList"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openPurchaseOrderList" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "ordermgmt",
                        true,
                        "openPurchaseOrderList",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Purchase Order List.
                  </Link>
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "openRateContractListing"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openRateContractListing" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "ordermgmt",
                        true,
                        "openRateContractListing",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Rate Contract
                  </Link>
                  <Link
                    // className="nav-link collapsed"
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "approvals" ? "active-me" : ""
                    }`}
                    to={"/"}
                    data-bs-toggle="collapse"
                    data-bs-target="#approvals"
                    aria-expanded="false"
                    aria-controls="approvals"
                  >
                    Approvals
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </Link>
                  <div
                    className="collapse"
                    id="approvals"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordionPages"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <Link
                        // className="nav-link"
                        className={`nav-link ${
                          activeMenuItem.subMenu3 === "openDemandApproval"
                            ? "active-me2"
                            : ""
                        }`}
                        to={"/openDemandApproval"}
                        onClick={() =>
                          handleMenuItemClick(
                            "ordermgmt",
                            true,
                            "approvals",
                            true,
                            "openDemandApproval",
                            true
                          )
                        }
                      >
                        Annual Demand
                      </Link>
                      <Link
                        className={`nav-link ${
                          activeMenuItem.subMenu3 ===
                          "openPurchaseOrderForApprovalList"
                            ? "active-me2"
                            : ""
                        }`}
                        to={"/openPurchaseOrderForApprovalList"}
                        onClick={() =>
                          handleMenuItemClick(
                            "ordermgmt",
                            true,
                            "approvals",
                            true,
                            "openPurchaseOrderForApprovalList",
                            true
                          )
                        }
                      >
                        Purchase Order
                      </Link>
                      <Link
                        className={`nav-link ${
                          activeMenuItem.subMenu3 === "openApprovalDesk"
                            ? "active-me2"
                            : ""
                        }`}
                        to={"/openApprovalDesk"}
                        onClick={() =>
                          handleMenuItemClick(
                            "ordermgmt",
                            true,
                            "approvals",
                            true,
                            "openApprovalDesk",
                            true
                          )
                        }
                      >
                        Intent Approval
                      </Link>

                      <Link
                        className={`nav-link ${
                          activeMenuItem.subMenu2 === "openTransferApprovalDesk"
                            ? "active-me1"
                            : ""
                        }`}
                        to={{ pathname: "/openTransferApprovalDesk" }}
                        onClick={() =>
                          handleMenuItemClick(
                            "ordermgmt",
                            true,
                            "approvals",
                            true,
                            "openTransferApprovalDesk",
                            true
                          )
                        }
                      >
                        Transfer Approval
                      </Link>
                      <Link
                        className={`nav-link ${
                          activeMenuItem.subMenu2 === "openTransferManagerforHQ"
                            ? "active-me1"
                            : ""
                        }`}
                        to={{ pathname: "/openTransferManagerforHQ" }}
                        onClick={() =>
                          handleMenuItemClick(
                            "ordermgmt",
                            true,
                            "approvals",
                            true,
                            "openTransferManagerforHQ",
                            true
                          )
                        }
                      >
                        Transfer Approval(HQ)
                      </Link>
                    </nav>
                  </div>
                </nav>
              </div>
              {/* Order management ended */}

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
                      activeMenuItem.subMenu2 === "updateStockRackDesk"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/updateStockRackDesk" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "stock",
                        true,
                        "updateStockRackDesk",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Update Stock Rack
                  </Link>
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "openCondeminationRegister"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openCondeminationRegister" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "stock",
                        true,
                        "openCondeminationRegister",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Condemnation Register
                  </Link>

                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "openStockVerificationDeck"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openStockVerificationDeck" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "stock",
                        true,
                        "openStockVerificationDeck",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Stock Verification
                  </Link>
                </nav>
              </div>
              {/* End of Stock */}

              {/* Requisition */}

              <Link
                className={`nav-link collapsed ${
                  activeMenuItem.menu1 === "requisition" ? "active-me" : ""
                }`}
                to={{}}
                data-bs-toggle="collapse"
                data-bs-target="#requisition"
                aria-expanded="false"
                aria-controls="requisition"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-box-open"></i>
                </div>
                Requisition
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </Link>
              <div
                className="collapse"
                id="requisition"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "openIndentDesk"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openIndentDesk" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "requisition",
                        true,
                        "openIndentDesk",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Intent Drugs
                  </Link>
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "openReturnDesk"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/transferList" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "requisition",
                        true,
                        "transferList",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Transfer List
                  </Link>
                </nav>
              </div>

              {/* End of Requsition */}

              {/* Receiving */}

              <Link
                className={`nav-link collapsed ${
                  activeMenuItem.menu1 === "receiving" ? "active-me" : ""
                }`}
                to={{}}
                data-bs-toggle="collapse"
                data-bs-target="#receiving"
                aria-expanded="false"
                aria-controls="receiving"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-inbox-in"></i>
                </div>
                Receiving
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </Link>
              <div
                className="collapse"
                id="receiving"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "openChallanDesk"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openChallanDesk" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "receiving",
                        true,
                        "openChallanDesk",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Challan List
                  </Link>
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "openIndentReceiveDesk"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openIndentReceiveDesk" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "receiving",
                        true,
                        "openIndentReceiveDesk",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Receive of Drugs
                  </Link>
                </nav>
              </div>

              {/* End of Receiving */}

              {/* Issue */}

              <Link
                className={`nav-link collapsed ${
                  activeMenuItem.menu1 === "issue" ? "active-me" : ""
                }`}
                to={{}}
                data-bs-toggle="collapse"
                data-bs-target="#issue"
                aria-expanded="false"
                aria-controls="issue"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-box-open"></i>
                </div>
                Issue
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </Link>
              <div
                className="collapse"
                id="issue"
                aria-labelledby="headingOne"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav">
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "openIssueDesk"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openIssueDesk" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "issue",
                        true,
                        "openIssueDesk",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Issue Desk
                  </Link>
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "openReturnDesk"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openReturnDesk" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "issue",
                        true,
                        "openReturnDesk",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Return Desk
                  </Link>
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 ===
                      "openStockForMisConsumptionDesk"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openStockForMisConsumptionDesk" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "issue",
                        true,
                        "openStockForMisConsumptionDesk",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Miscellaneous Consumption
                  </Link>
                </nav>
              </div>

              {/* End of Issue */}
              {/* Admin */}
              <Link
                className={`nav-link collapsed ${
                  activeMenuItem.menu1 === "admin" ? "active-me" : ""
                }`}
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
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "listuser" ? "active-me1" : ""
                    }`}
                    to={{ pathname: "/listuser" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "admin",
                        true,
                        "listuser",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    User Desk
                  </Link>

                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "listDrug" ? "active-me1" : ""
                    }`}
                    to={{ pathname: "/listDrug" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "admin",
                        true,
                        "listDrug",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Drug Desk
                  </Link>

                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "listStore"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/listStore" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "admin",
                        true,
                        "listStore",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Store Desk
                  </Link>
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "programpage"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/programpage" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "admin",
                        true,
                        "programpage",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Program Desk
                  </Link>
                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "listrole" ? "active-me1" : ""
                    }`}
                    to={{ pathname: "/listrole" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "admin",
                        true,
                        "listrole",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Role Desk
                  </Link>

                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "openProgramFundingInterface"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openProgramFundingInterface" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "admin",
                        true,
                        "openProgramFundingInterface",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Program Funding Mapping
                  </Link>

                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "storetypedrugmapping"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/storetypedrugmapping" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "admin",
                        true,
                        "storetypedrugmapping",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    EDL Mapping
                  </Link>

                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "openBudgetListingInterface"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openBudgetListingInterface" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "admin",
                        true,
                        "openBudgetListingInterface",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Budget Interface
                  </Link>

                  <Link
                    className={`nav-link ${
                      activeMenuItem.subMenu2 === "openFundingList"
                        ? "active-me1"
                        : ""
                    }`}
                    to={{ pathname: "/openFundingList" }}
                    onClick={() =>
                      handleMenuItemClick(
                        "admin",
                        true,
                        "openFundingList",
                        true,
                        "",
                        false
                      )
                    }
                  >
                    Funding Source
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
