interface radiocheckBoxProps {
  id1: string;
  id2: string;
  className?: string;
  onClick: () => void;
  onChange?: () => void;
  name: string;
  labelText1: string;
  labelText2: string;
}
const RadioCheckBox: React.FC<radiocheckBoxProps> = ({
  id1,
  id2,
  className,
  onChange,
  labelText1,
  labelText2,
  name,
}) => {
  return (
    <>
      <div className="form-check form-check-inline ms-2">
        <input
          className={`form-check-input ${className}`}
          type="radio"
          name={name}
          id={id1}
          value="Yes"
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor={id1}>
          {labelText1}
        </label>
      </div>
      <div className={`form-check form-check-inline`}>
        <input
          className={`form-check-input ${className}`}
          type="radio"
          name={name}
          id={id2}
          value="No"
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor={id2}>
          {labelText2}
        </label>
      </div>
    </>
  );
};

export default RadioCheckBox;
