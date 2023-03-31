import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faChartPie,
  faHand,
  faPersonBiking,
  faSuitcaseMedical,
  faThumbsUp,
  faBriefcase,
  faCheck,
  faMoneyBill,
  faSquareCheck,
  faMagnifyingGlass,
  faCartShopping,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import DashBoardDrugCard from "../../components/card/DashBoardDrugCard";
import DashBoardActivityCard from "../../components/card/DashBoardActivityCard";
import DashBoardCard from "../../components/card/DashBoardCard";
const Dash = () => {
  const [fullScreen, setFullScreen] = useState([]);
  const [minimized, setMinimized] = useState([]);
  function dragElement(elmnt) {
    console.log("calee");
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id)) {
      console.log("entered heres");
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      console.log("dragMouseDown");
      // e = e || window.event;
      // e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
      console.log("rerere");
    }

    function elementDrag(e) {
      console.log("drag..");
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.positon = "absolute";
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row mb-4 mt-5">
          <div className="text-center" style={{ backgroundColor: "#d9edf7" }}>
            Summary of Drugs Information
          </div>
        </div>
        <div className="row justify-content-center  ">
          <div className="col-2">
            <DashBoardDrugCard
              bgColorCode="00c0ef"
              text="Summary of Drugs Information"
              count="12"
              iconName={faBagShopping}
              total="0"
            />
          </div>

          {/*  */}
          <div className="col-2">
            <DashBoardDrugCard
              bgColorCode="00a65a"
              text="Drug Qty. in Your Store"
              count="11"
              iconName={faSuitcaseMedical}
              total="0"
            />
          </div>

          <div className="col-2">
            <DashBoardDrugCard
              bgColorCode="f39c12"
              text="Today's Transfer Request"
              count="111"
              iconName={faPersonBiking}
              total="0"
            />
          </div>

          <div className="col-2">
            <DashBoardDrugCard
              bgColorCode="d9edf7"
              text="Drug Issued Today"
              count="2121"
              iconName={faHand}
              total="0"
            />
          </div>
          <div className="col-2">
            <DashBoardDrugCard
              bgColorCode="337ab7"
              text="Drug Returned Today"
              count="2121"
              iconName={faChartPie}
              total="0"
            />
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="text-center" style={{ backgroundColor: "#d9edf7" }}>
            Summary of Your Pending Activity/Task
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-2">
            <DashBoardActivityCard
              count="100"
              text="PO Approval"
              iconName={faThumbsUp}
              className="bg-primary"
            />
          </div>

          <div className="col-2">
            <DashBoardActivityCard
              count="50"
              text="Intent Approval"
              iconName={faThumbsUp}
              className="bg-success"
            />
          </div>

          <div className="col-2">
            <DashBoardActivityCard
              count="100"
              text="Transfer Approval"
              iconName={faThumbsUp}
              className="bg-warning"
            />
          </div>

          <div className="col-2">
            <DashBoardActivityCard
              count="10"
              text="Issue Against Drug"
              iconName={faBriefcase}
              className="bg-info"
            />
          </div>
          <div className="col-2">
            <DashBoardActivityCard
              count="0"
              text="Acceptance of Challan"
              iconName={faCheck}
              className="bg-danger"
            />
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-2">
            <DashBoardActivityCard
              count="100"
              text="PO Payment"
              iconName={faMoneyBill}
              className="bg-danger"
            />
          </div>

          <div className="col-2">
            <DashBoardActivityCard
              count="50"
              text="Recieve of Challan"
              iconName={faSquareCheck}
              className="bg-info"
            />
          </div>

          <div className="col-2">
            <DashBoardActivityCard
              count="100"
              text="Verification of Challan"
              iconName={faMagnifyingGlass}
              className="bg-warning"
            />
          </div>

          <div className="col-2">
            <DashBoardActivityCard
              count="10"
              text="Drug Rececive"
              iconName={faCartShopping}
              className="bg-danger"
            />
          </div>
          <div className="col-2">
            <DashBoardActivityCard
              count="0"
              text="Annual Demand"
              iconName={faCirclePlus}
              className="bg-info"
            />
          </div>
        </div>

        {/*  */}

        <div className="row mt-4 mb-4">
          <div className="text-center" style={{ backgroundColor: "#d9edf7" }}>
            Your Store Information
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <DashBoardCard
              title="Stock Details: State Warehouse"
              fullScreen={fullScreen}
              minimized={minimized}
              id="StockDetails"
              // onClick={(e) => {
              //   const elem = document.getElementById("StockDetails");
              //   elem.onmousedown = dragMouseDown(e, elem);
              // }}
              handleMinimize={(e) => {
                const elem = document.getElementById("card-body-StockDetails");
                console.log("width", elem.offsetHeight);
                const selectedIndex = minimized.indexOf("StockDetails");
                console.log("Selectedindex", selectedIndex);
                let newSelected = [];

                if (selectedIndex === -1) {
                  newSelected = newSelected.concat(minimized, "StockDetails");
                } else if (selectedIndex === 0) {
                  newSelected = newSelected.concat(minimized.slice(1));
                } else if (selectedIndex === minimized.length - 1) {
                  newSelected = newSelected.concat(minimized.slice(0, -1));
                } else if (selectedIndex > 0) {
                  newSelected = newSelected.concat(
                    minimized.slice(0, selectedIndex),
                    minimized.slice(selectedIndex + 1)
                  );
                }
                console.log("NewSelected", newSelected);
                setMinimized(newSelected);

                if (elem.offsetHeight == 0) {
                  elem.style.display = "block";
                  return true;
                } else {
                  elem.style.display = "none";
                  return false;
                }
              }}
              handleUnpin={(e) => {
                const elem = document.getElementById("StockDetails");
                if (elem.style.position === "absolute") {
                  elem.style.position = "initial";
                  elem.style.cursor = "pointer";
                  document.onmouseup = null;
                  document.onmousemove = null;
                } else {
                  elem.style.position = "absolute";
                  elem.style.top = "80px";
                  elem.style.left = "150px";
                  elem.style.cursor = "move";
                  elem.style.width = "450px";
                  dragElement(document.getElementById("StockDetails"));
                }
              }}
              handleFullScreen={(e) => {
                const elem = document.getElementById("StockDetails");

                if (!document.fullscreenElement) {
                  elem.requestFullscreen();
                } else if (document.exitFullscreen) {
                  document.exitFullscreen();
                }
                // if (elem.style.position === "absolute") {
                //   elem.style.position = "initial";
                //   elem.style.top = "initial";
                //   elem.style.left = "initial";
                //   elem.style.height = "initial";
                //   elem.style.width = "initail";
                //   elem.style.zIndex = "initial";
                //   document.body.style.overflow = "visible";
                // } else {
                //   elem.style.position = "absolute";
                //   elem.style.top = "280px";
                //   elem.style.left = "0px";
                //   elem.style.zIndex = "100";
                //   elem.style.height = "100vh";
                //   elem.style.width = "100vw";
                //   document.body.style.overflow = "hidden";
                // }
              }}
            >
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </DashBoardCard>
          </div>
          {/* <div className="col-4">
            <DashBoardCard title="CURRENT STOCK GRAPH" />
          </div>
          <div className="col-4">
            <DashBoardCard title="Pending Tasks" />
          </div> */}
        </div>

        <div className="row"></div>
        {/*  */}
        {/* <div className="row mt-3">
          <div className="col-4">
            <DashBoardCard title="Recent activities">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </DashBoardCard>
          </div>
          <div className="col-4">
            <DashBoardCard title="Requistions" />
          </div>
          <div className="col-4">
            <DashBoardCard title="Expiry Report" />
          </div>
        </div> */}
        {/*  */}
      </div>
    </>
  );
};

export default Dash;
