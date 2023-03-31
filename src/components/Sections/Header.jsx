import { useEffect } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";
import SwiperComponent from "../swiper/swiperComponent";

// Assets
const data = [
  {
    icon: faCheck,
    header: "Drug Locator",
    description: "Desk Maintain Details of Quality Check",
  },
  {
    icon: faCheck,
    header: "Quality Control",
    description: "Desk Maintain Details of Quality Check",
  },
  {
    icon: faCheck,
    header: "Drug Transfer",
    description: "Hierarchical Transfer of Drugs",
  },
];
export default function Header() {
  useEffect(() => {}, []);
  return (
    <Wrapper id="home" className="container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <img
              className="img-responsive"
              src={`${process.env.PUBLIC_URL}/assets/images/logo_meghalaya.png`}
              height="100px"
              width="100%"
            />
          </div>
        </div>
      </div>

      {/* Swipper */}
      <div className="row" style={{ marginTop: "300px" }}>
        <div className="col-12 mb-2">
          <h1 className="font40 extraBold text-center">
            {" "}
            DVDMS Meghalaya Provides for you
          </h1>
        </div>
        <div className="col-12">
          <SwiperComponent data={data} />
        </div>
      </div>
      {/* End of Swipper */}

      {/* <div className="row">
        <div className="d-flex flex-row justify-content-center">
          <BtnWrapper>
            <FullButton title="Get Started" />
          </BtnWrapper>
        </div>
      </div> */}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 700px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;
const BtnWrapper = styled.div`
  margin-top: 10px;
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
const CardWrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
