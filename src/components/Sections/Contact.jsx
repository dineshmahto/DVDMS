import React, { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { showLoginModal } from "../../store/login/actions";
import AOS from "aos";
import "aos/dist/aos.css";
const Contact = () => {
  const dispatch = useDispatch();
  const scrolltoSection = (e) => {
    e.preventDefault();
    const targetSec = e.target.getAttribute("data-id");
    window.scrollTo({
      top: document.querySelector(`#${targetSec}`).offsetTop,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    AOS.init({
      delay: 10,
    });
  }, []);
  return (
    <Wrapper id="contact">
      <section style={{ backgroundColor: "#f2f2f2" }} className="p-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-4" data-aos="fade-down">
              <div>
                <div className="" style={{ cursor: "pointer" }}>
                  <h5>PAGES</h5>
                  <ul className="list p-0">
                    <li
                      className="list-item p-1"
                      data-id="home"
                      onClick={(e) => scrolltoSection(e)}
                    >
                      Home
                    </li>
                    <li
                      className="list-item p-1"
                      data-id="advantages"
                      onClick={(e) => scrolltoSection(e)}
                    >
                      Advantages
                    </li>
                    <li
                      className="list-item p-1"
                      data-id="contact"
                      onClick={(e) => scrolltoSection(e)}
                    >
                      Contact Us
                    </li>
                    <li
                      className="list-item p-1"
                      data-id="about"
                      onClick={(e) => scrolltoSection(e)}
                    >
                      About DVDMS
                    </li>
                    <li
                      className="list-item p-1"
                      onClick={() => dispatch(showLoginModal())}
                    >
                      Login
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4" data-aos="fade-down">
              <div>
                <div className="">
                  <h5>TECHNICAL SUPPORT</h5>
                  <p className="lh-lg">
                    Production Building, NIT Silchar Campus, NIT Road, Silchar,
                    Assam 788010
                  </p>
                  <ul className="list p-0">
                    <li className="list-item p-1">
                      <FontAwesomeIcon
                        size="2x"
                        className="me-2"
                        icon={faCalendar}
                      />
                      Monday - Friday, 10am to 6pm
                    </li>
                    <li className="list-item p-1">
                      <FontAwesomeIcon
                        size="2x"
                        className="me-2"
                        icon={faPhone}
                      />{" "}
                      +91 8133 029 380
                    </li>
                    <li className="list-item p-1">
                      <FontAwesomeIcon
                        size="2x"
                        className="me-2"
                        icon={faEnvelope}
                      />{" "}
                      ranjan@cdac.in
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4" data-aos="fade-down">
              <div>
                <div className="">
                  <h5>OUR LOCATION</h5>
                  <p>
                    Health Complex, Red Hills, Laitumkhrah, Shillong -
                    793003,Meghalaya
                  </p>
                  <ul className="list p-0">
                    <li className="list-item p-1">
                      <FontAwesomeIcon
                        size="2x"
                        className="me-1"
                        icon={faLocationDot}
                      />
                      GET DIRECTION
                    </li>
                    <li className="list-item p-1">
                      <FontAwesomeIcon
                        size="2x"
                        className="me-1"
                        icon={faPhone}
                      />{" "}
                      +91-7005988040/7005988041
                    </li>
                    <li className="list-item p-1">
                      <FontAwesomeIcon
                        size="2x"
                        className="me-1"
                        icon={faEnvelope}
                      />{" "}
                      dvdmsmeghalaya[at]gmail[dot]com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
`;

export default Contact;
