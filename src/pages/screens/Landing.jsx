import React from "react";
// Sections
import TopNavbar from "../../components/Nav/TopNavbar";
import Header from "../../components/Sections/Header";
import About from "../../components/Sections/About";
import Contact from "../../components/Sections/Contact";
import Footer from "../../components/Sections/Footer";
import Advantages from "../../components/Sections/Advantages";
import "./flexboxgrid.min.css";
import "./land.css";
import BasicModal from "../../components/modal/basicmodal";
import LoginForm from "../../components/form/loginform/loginform";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeLoginModal } from "../../store/login/actions";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { Modal } from "react-bootstrap";

const Landing = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state?.login?.show);
  console.log("Show", show);
  return (
    <>
      <Modal
        show={show}
        backdrop={false ? `static` : true}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={() => dispatch(closeLoginModal())}
        centered={false}
        scrollable={true}
        fullscreen={false}
        className="rounded-0"
      >
        <LoginForm data-aos="zoom-in-down" />
      </Modal>

      <TopNavbar />
      <Header />

      <Advantages />
      <About />
      <Contact />
      <Footer />
    </>
  );
};
const bounceAnimation = keyframes`${fadeIn}`;
const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;
export default Landing;
