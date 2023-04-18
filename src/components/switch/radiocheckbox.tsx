interface radiocheckBoxProps {
  className?: string;
  onChange?: () => void;
  list: [];
}
const RadioCheckBox: React.FC<radiocheckBoxProps> = ({
  className,
  onChange,
  list,
}) => {
  console.log(list);
  return (
    <>
      {list &&
        list.length > 0 &&
        list.map((ele: any, index) => {
          return (
            <div className="form-check form-check-inline ms-2" key={ele.index}>
              <input
                className={`form-check-input ${className}`}
                type="radio"
                name={ele?.name}
                id={ele?.id}
                value={ele?.value}
                onChange={onChange}
              />
              <label className="form-check-label" htmlFor={ele?.id}>
                {ele?.labelText}
              </label>
            </div>
          );
        })}
    </>
  );
};

export default RadioCheckBox;
