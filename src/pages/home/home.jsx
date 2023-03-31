import {
  faLocationDot,
  faTruckMedical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import LoginForm from "../../components/form/loginform/loginform";
import HeaderHomeMenu from "../../components/menu/header_home_menu";
import "./home.css";

class Home extends Component {
  render() {
    return (
      <>
        <HeaderHomeMenu />
        <div style={{ height: "72px" }}>&nbsp;</div>
        {/********************************** Banner ***********************************/}
        <section
          className="banner"
          style={{
            background: `url('${process.env.PUBLIC_URL}/assets/images/bg5.jpg')`,
          }}
        >
          <div className="d-flex justify-content-center mb-5">
            <img
              src={
                window.location.origin + "/assets/images/banner_login_ar.png"
              }
              style={{ maxWidth: "100%" }}
              alt=""
            />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>DVDMS NAGALAND</h1>
                <h5>Provides for you</h5>
                <div className="row">
                  <div className="col-1 icon_size">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <div className="col-11">
                    <h4>Drug Locator</h4>
                    <h6>Locate your drug in warehouse</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <LoginForm />
              </div>
            </div>
          </div>
        </section>

        {/* Advantage */}
        <section
          className="advantage"
          style={{
            background: `url('${process.env.PUBLIC_URL}/assets/images/aushadi.png')`,
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-sm-4 mb-3">
                <div className="card rotated_div">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-4">
                        <FontAwesomeIcon
                          icon={faTruckMedical}
                          className="icon"
                        />
                      </div>
                      <div className="col-8">
                        <h5>Supplier</h5>
                        <span>
                          supplier Interface for viewing PO, entering challan
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Home;
