import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { bounce } from "react-animations";
import AOS from "aos";
import "aos/dist/aos.css";
const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Wrapper id="about">
      <div className="whiteBg">
        <div
          className="container"
          style={{ paddingTop: "50px", paddingBottom: "20px" }}
        >
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12">
              <div className="d-flex justify-content-center">
                <HeaderInfo>
                  <h1 className="font40 extraBold" data-aos="fade-up">
                    About (DVDMS)
                  </h1>

                  <AboutDescription data-aos="fade-left">
                    Drug and Vaccine Distribution Management System (DVDMS) is a
                    web based supply chain management application which deals
                    with Purchase, Inventory Management & Distribution of
                    various drugs, sutures and surgical items to various
                    District Drughouses (DWH) of State, District Hospitals their
                    sub stores like City Health Center and Primary Health Center
                    to distribute drugs to patient, the final consumer of the
                    supply chain.
                  </AboutDescription>
                </HeaderInfo>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding-top: 20px;
`;
const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
const AboutDescription = styled.p`
  font-size: 1.2rem;
  font-style: normal !important;
  line-height: 2 important;
  @media (max-width: 480px) {
    font-size: 0.9rem;
    font-style: normal !important;
    line-height: 2 important;
  }
`;
const bounceAnimation = keyframes`${bounce}`;
const BouncyDiv = styled.div`
  animation: 10s ${bounceAnimation};
`;
export default About;
