import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">
              <Link to="http://www.cdac.in" target="_blank">
                CDAC Silchar
              </Link>{" "}
              &copy; Copyright | All Rights Reserved
            </div>
            <div>
              For any assistance:
              <Link to="mailto:ranjan@cdac.in">
                support[at]dvdms-manipur[dot]in
              </Link>{" "}
              / +91-92060-42181
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
