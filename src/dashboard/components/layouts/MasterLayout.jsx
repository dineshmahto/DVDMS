import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import "../../styles/styles.css";

//import "bootstrap/dist/js/bootstrap.bundle";

const MasterLayout = () => {
  const loader = useSelector((state) => state?.loader?.loading);
  useEffect(() => {
    // Will be called after mounting the componnent.
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      // Uncomment Below to persist sidebar toggle between refreshes
      // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
      //     document.body.classList.toggle('sb-sidenav-toggled');
      // }
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
                  <Outlet />
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
