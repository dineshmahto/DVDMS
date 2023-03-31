import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCheck,
  faDatabase,
  faFile,
  faSuitcaseMedical,
  faTruckMedical,
  faWheelchair,
} from "@fortawesome/free-solid-svg-icons";

const Advantages = () => {
  return (
    <Wrapper id="advantages">
      <div className="container p-5">
        <div className="row mb-2">
          <h1 className="font40 extraBold text-center">Advantages</h1>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-4" data-aos="fade-right">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/aushadi.png`}
              height="100%"
              width="100%"
            />
          </div>
          <div className="col-md-3 col-sm-4">
            <div className="d-flex flex-row" data-aos="fade-left">
              <div className="icon-container me-3">
                <FontAwesomeIcon
                  size="4x"
                  icon={faDatabase}
                  style={{ color: "#2acf35" }}
                />
              </div>
              <div>
                <h3>Indent Management</h3>
                <Description>
                  Brings Transparency & Smoothness in the process of Drug
                  Inventory Management and Distribution
                </Description>
              </div>
            </div>

            <div className="d-flex flex-row" data-aos="fade-left">
              <div className="icon-container me-3">
                <FontAwesomeIcon
                  size="4x"
                  icon={faWheelchair}
                  style={{ color: "#2acf35" }}
                />
              </div>
              <div>
                <h3>Drug Intent</h3>
                <Description>
                  Ability to generate indents automatically based on reorder,
                  minimum, maximum planning.
                </Description>
              </div>
            </div>
            <div className="d-flex flex-row" data-aos="fade-left">
              <div className="icon-container me-3">
                <FontAwesomeIcon
                  size="4x"
                  icon={faSuitcaseMedical}
                  style={{ color: "#2acf35" }}
                />
              </div>
              <div>
                <h3>Quality Drugs</h3>
                <Description>
                  Provision to maintain Expiry date/ Shelf life for an item
                  wherever applicable.
                </Description>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-4">
            <div className="d-flex flex-row" data-aos="fade-left">
              <div className="icon-container me-3">
                <FontAwesomeIcon
                  size="4x"
                  icon={faTruckMedical}
                  style={{ color: "#2acf35" }}
                />
              </div>
              <div>
                <h3>Supplier</h3>
                <Description>
                  Supplier Interface for viewing PO, entering Challan.
                </Description>
              </div>
            </div>
            <div className="d-flex flex-row" data-aos="fade-left">
              <div className="icon-container me-3">
                <FontAwesomeIcon
                  size="4x"
                  icon={faBell}
                  style={{ color: "#2acf35" }}
                />
              </div>
              <div>
                <h3>SMS/EMAIL Alert</h3>
                <Description>
                  Customizable SMS/Email Alert Management.
                </Description>
              </div>
            </div>

            <div className="d-flex flex-row" data-aos="fade-left">
              <div className="icon-container me-3">
                <FontAwesomeIcon
                  size="4x"
                  icon={faFile}
                  style={{ color: "#2acf35" }}
                />
              </div>
              <div>
                <h3>Report</h3>
                <Description>Stock Ledger, Drill-Down Reports</Description>
              </div>
            </div>
            <div className="d-flex flex-row" data-aos="fade-left">
              <div className="icon-container me-3">
                <FontAwesomeIcon
                  size="4x"
                  icon={faCheck}
                  style={{ color: "#2acf35" }}
                />
              </div>
              <div>
                <h3>Quality Check</h3>
                <Description>
                  Lab Interface for entering the QC Reports.
                </Description>
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
`;
const Description = styled.p`
  font-weight: 300 !important;
  font-size: 1.2rem !important;
  text-indent: 20px;
`;
export default Advantages;
