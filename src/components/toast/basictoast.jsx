import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const BasicToast = (props) => {
  const [show, setShow] = useState(props.show);
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        bg="danger"
        onClose={() => setShow(!props.show)}
        show={show}
        delay={props.delay}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{props.title}</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body bg="light">{props.description}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default BasicToast;
