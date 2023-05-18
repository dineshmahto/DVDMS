import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";

import { Spinner } from "react-bootstrap";
import "../../assets/styles/styles.css";
import IdleTimer from "../../common/timeout/idleTimer";
import { useNavigate } from "react-router-dom";
import { useSelector, dispatch } from "react-redux";
const MasterLayout = () => {
  const navigate = useNavigate();
  const loader = useSelector((state) => state?.loader?.loading);
  const mode = useSelector((state) => state.darkMode);
  const { isdarkMode } = mode;

  const [isTimeout, setIsTimeout] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isdarkMode ? "#292c35" : "#fff";
    document.body.style.color = isdarkMode ? "white" : "black";
  }, [isdarkMode]);
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
                <div className="container-fluid">
                  <Suspense>
                    <Outlet />
                  </Suspense>
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
