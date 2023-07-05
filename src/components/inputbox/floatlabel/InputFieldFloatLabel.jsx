import "./inputfieldfloatlabel.css";

const BasicField = (props) => {
  return (
    <div className="floatlabel">
      <input
        type={props.type}
        id={props.id}
        className="form-control mb-1"
        required
        onClick={props.onclick}
        onChange={props.onchange}
        autoComplete="new-password"
      />
    </div>
  );
};

const WithError = (props) => {
  return (
    <div className="floatlabel">
      <input
        type={props.type}
        id={props.id}
        className="form-control"
        required
        onClick={props.onclick}
        onChange={props.onchange}
        autoComplete="new-password"
      />
      <label className="form-label" htmlFor={props.id}>
        {props.placeholder}
      </label>
      <small>{props.errorMsg}</small>
    </div>
  );
};

const fields = { BasicField, WithError };

export default fields;
