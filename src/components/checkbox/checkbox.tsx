import Form from "react-bootstrap/Form";
export type FormCheckType = "checkbox" | "radio" | "switch";
interface checkBoxProps {
  type: FormCheckType;
  id: string;
  className?: string;
  label: string;
  name?: string;
  disabled?: boolean | false;
  onChange: () => void;
}
const Checkbox: React.FC<checkBoxProps> = ({
  type,
  className,
  label,
  id,
  name,
  disabled,
  onChange,
}) => {
  return (
    <Form>
      <Form.Check
        type={type}
        id={`${type}-${id}`}
        label={`${label}`}
        className={`${className}`}
        name={name}
        disabled={disabled}
        onChange={onChange}
      />
    </Form>
  );
};

export default Checkbox;
