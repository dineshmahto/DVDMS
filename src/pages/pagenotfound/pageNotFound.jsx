import React from "react";
import Lottie from "lottie-react";
import page404 from "../../components/lottie/page404.json";
const PageNotFound = () => {
  return (
    <div className="container">
      <div className="row ">
        <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: " translate(-50%, -50%)",
            }}
          >
            <Lottie animationData={page404} loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
