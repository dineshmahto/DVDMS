import React from "react";
import Modal from "react-bootstrap/Modal";
import BasicButton from "../button/basicbutton";

interface modalProps {
  title: string;
  close: () => void;
  onEscapeKeyDown?: () => void;
  onExit?: () => void;
  show: boolean | false;
  size?: any;
  isStatic?: boolean | false;
  scrollable: boolean | false;
  fullScreen?: string;
  isCenterAlign?: boolean;
  closeButton: boolean;
  children: React.ReactNode;
}
const BasicModal: React.FC<modalProps> = ({
  title,
  close,
  onEscapeKeyDown,
  onExit,
  show,
  size,
  isStatic,
  scrollable,
  fullScreen,
  isCenterAlign,
  closeButton,
  children,
}) => {
  return (
    <Modal
      show={show}
      backdrop={isStatic ? `static` : true}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      onHide={close}
      centered={isCenterAlign}
      scrollable={scrollable}
      fullscreen={fullScreen}
      onEscapeKeyDown={onEscapeKeyDown}
      onExit={onExit}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{position: "relative"}}>{children}</Modal.Body>
      {/* <Modal.Footer>
        <BasicButton
          type="button"
          buttonText="Close"
          className="btn btn-danger"
          
        />
      </Modal.Footer> */}
    </Modal>
  );
};

export default BasicModal;
