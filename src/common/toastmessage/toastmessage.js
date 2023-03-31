import { toast } from "react-toastify";

const toastMessage = (title, description, type = "default", delay = 5000) => {
  switch (type) {
    case "error":
      toast.error(
        <div>
          <b>{title}</b>
          <br /> {description}
        </div>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: delay,
        }
      );
      break;
    case "success":
      toast.success(
        <div>
          <b>{title}</b>
          <br /> {description}
        </div>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: delay,
        }
      );
      break;
    default:
      toast(
        <div>
          <b>{title}</b>
          <br /> {description}
        </div>,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: delay,
        }
      );
  }
};

export default toastMessage;
