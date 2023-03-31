/**
 * onClick
 * text
 */

import { Link } from "react-router-dom";

const SubmitButton = (props) => (
  <button
    type="button"
    className={`btn btn-outline-primary m-1 ${props.className}`}
    onClick={props.onClick}
  >
    {props.text}
  </button>
);

const CancelButton = (props) => (
  <button
    type="button"
    className={`btn btn-outline-warning m-1 ${props.className}`}
    onClick={props.onClick}
  >
    {props.text}
  </button>
);

const EditButton = (props) => (
  <button
    type="button"
    className="btn btn-outline-info m-1"
    onClick={props.onClick}
  >
    {props.text}
  </button>
);

const DeleteButton = (props) => (
  <button
    type="button"
    className="btn btn-outline-danger m-1"
    onClick={props.onClick}
  >
    {props.text}
  </button>
);

/**
 * navLink
 * onClick ${props.className}`}
 * text
 */
const EditLinkButton = (props) => (
  <Link to={props.navLink} className="link-info m-1" onClick={props.onClick}>
    {props.text}
  </Link>
);

const DeleteLinkButton = (props) => (
  <Link className="link-danger m-1" onClick={props.onClick}>
    {props.text}
  </Link>
);

export default {
  SubmitButton,
  CancelButton,
  EditButton,
  DeleteButton,
  EditLinkButton,
  DeleteLinkButton,
};
