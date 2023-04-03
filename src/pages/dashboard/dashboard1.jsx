import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderAdminMenu from "../../components/menu/header_admin_menu";
import tokenhandle from "../../common/tokenhandle/tokenhandle";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

export default function DashBoard1() {
  const navigate = useNavigate();
  const loader = useSelector((state) => state?.loader?.loading);
  console.log("Loading State", loader);
  useEffect(() => {
    console.log(tokenhandle.getToken());
    if (tokenhandle.getToken() == null) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="container-fluid">
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
            <HeaderAdminMenu />
            <div className="container-fluid">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </>
  );
}
