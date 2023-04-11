import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import "../../assets/styles/styles.css";
import IdleTimer from "../../common/timeout/idleTimer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
const MasterLayout = () => {
  const navigate = useNavigate();
  const loader = useSelector((state) => state?.loader?.loading);
  const [isTimeout, setIsTimeout] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // Will be called after mounting the componnent.
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sb-sidenav-toggled");
        localStorage.setItem(
          "sb|sidebar-toggle",
          document.body.classList.contains("sb-sidenav-toggled")
        );
      });
    }
  }, []);

  return (
    <>
      {/* {isTimeout ? navigate("/") : ""} */}
      {loader ? (
        <div
          className="row justify-content-center"
          style={{ height: "100vh", position: "relative" }}
        >
          <div style={{ position: "absolute", top: "50%", right: "-50%" }}>
            <Spinner />
            <p>wait ....</p>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <div id="layoutSidenav">
            <Sidenav />
            <div id="layoutSidenav_content">
              <main>
                <div className="container-fluid px-4">
                  <Suspense>
                    <Outlet />
                  </Suspense>

                  <div
                    className="chat"
                    style={{
                      position: "fixed",
                      bottom: "10px",
                      right: "10px",
                      width: "50px",
                      height: "50px",
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "30px",
                      zIndex: 100,
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        top: "6px",
                        left: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faComments}
                        size="2x"
                        onClick={() => setOpen(!open)}
                      />
                    </div>
                    {/* <div
                      className={`baseClass ${open ? `d-block` : "d-none"}`}
                      style={{
                        width: "100px",
                        height: "150px",
                      }}
                    >
                      <div className="card">
                        <div className="card-body">TExt</div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MasterLayout;
