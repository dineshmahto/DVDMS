import { toast } from "react-toastify";

const toastMessage = (
  title,
  description,
  type = "default",
  position = "bottom-right",
  delay = 5000
) => {
  switch (type) {
    case "error":
      toast.error(
        <div>
          <b>{title}</b>
          <br /> {description}
        </div>,
        {
          position: position,
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
          position: position,
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
          position: position,
          autoClose: delay,
        }
      );
  }
};

export default toastMessage;
