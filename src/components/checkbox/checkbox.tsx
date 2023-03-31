import Form from "react-bootstrap/Form";
export type FormCheckType = "checkbox" | "radio" | "switch";
interface checkBoxProps {
  type: FormCheckType;
  id: string;
  className?: string;
  label: string;
  name?: string;
  disabled?: boolean | false;
}
const Checkbox: React.FC<checkBoxProps> = ({
  type,
  className,
  label,
  id,
  name,
  disabled,
}) => {
  return (
    <Form>
      <Form.Check
        type={type}
        id={`${type}-${id}`}
        label={`default ${label}`}
        className={`${className}`}
        name={name}
        disabled={disabled}
      />
    </Form>
  );
};

export default Checkbox;
