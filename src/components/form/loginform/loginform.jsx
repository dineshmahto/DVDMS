import {
  faArrowsRotate,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import BasicButton from "../../button/basicbutton";
import SwitchCheckBox from "../../switch/switchcheckbox";
import InputFieldFloatLebel from "../../inputbox/floatlabel/InputFieldFloatLabel";
import toastMessage from "../../../common/toastmessage/toastmessage";
import loginservice from "../../../services/loginservice/loginservice";
import { useNavigate } from "react-router-dom";
import Canvas from "../../canvas/Canvas";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { closeLoginModal } from "../../../store/login/actions";
import * as CONSTANTS from "../../../common/constant/constants";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUSerData] = useState({
    username: "",
    password: "",
    captcha: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isValid, setValid] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState([]);

  const validate = () => {
    if (
      (userData.username.length > 0) &
      (userData.password.length > 0) &
      (userData.captcha.length > 0)
    )
      return true;
    else return false;
  };

  useEffect(() => {
    const isValid = validate();
    setValid(isValid);
  }, [userData.username, userData.password, userData.captcha]);

  const loginAction = async (e) => {
    e.preventDefault();
    if (isValid) {
      if (userData.captcha != captchaValue.join("")) {
        toastMessage("Cpatcha Error", "Please enter valid Captcha", "error");
        createCaptcha();
        setUSerData({ ...userData, captcha: "" });
        setValid(false);
      } else {
        setLoading(true);
        let loginResp = await loginservice(CONSTANTS.LOGIN, userData);
        if (loginResp.status === 200) {
          setLoading(false);
          console.log("loginResp", loginResp.status);
          dispatch(closeLoginModal());
          navigate("/dashboard");
        } else if (loginResp.response.status === 400) {
          setLoading(false);
          toastMessage("Login Error", "Please enter valid ID", "error");
        }
      }
    } else {
      toastMessage("Please ", "Work in progress...", "");
    }
  };

  const createCaptcha = () => {
    console.log("Recalled");
    var charsArray =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      var index = Math.floor(Math.random() * charsArray.length + 1);
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    setUSerData({ ...userData, captcha: "" });
    setCaptchaValue(captcha);
  };
  const draw = (context) => {
    context.font = "25px Georgia";
    context.strokeText(captchaValue.join(""), 0, 30);
  };

  useEffect(() => {
    createCaptcha();
  }, []);

  return (
    <>
     <div className="container login-form-container">
        <div class="login-header-container">
          <h1 class="login-header">Login</h1>
        </div>
        <div className="p-2 border-0">
          <div className="mb-3">
            <InputFieldFloatLebel.WithError
              type="text"
              placeholder="UserID"
              id="user_id"
              errorMsg={userData.username === "" ? "Enter user ID" : ""}
              onchange={(e) => {
                setUSerData({ ...userData, username: e.target.value });
              }}
            />
          </div>
          <div className="mb-1">
            <InputFieldFloatLebel.WithError
              type={`${isShowPassword ? "text" : "password"}`}
              placeholder="Password"
              id="password"
              errorMsg={userData.password === "" ? "Enter password" : ""}
              onchange={(e) => {
                setUSerData({ ...userData, password: e.target.value });
              }}
            ></InputFieldFloatLebel.WithError>
          </div>
          <div className="mb-4 d-flex justify-content-end">
            <SwitchCheckBox
              labelText="Show Password"
              type="checkbox"
              onChange={() => {
                console.log("show password");
                setIsShowPassword(!isShowPassword);
              }}
            />
          </div>
          <div className="mb-4">
            <div className="row">
              <div className="col-lg-2 col-md-2 col-sm-2"> Captcha</div>
              <div className="col-lg-3 col-md-3 col-sm-4">
                <Canvas className="captcha-canvas" draw={draw} height={50} width={100} />
              </div>
              <div className="col-lg-7 col-md-7 col-sm-12">
                <div className="input-group">
                  <input type="text" id="captcha" className="form-control shadow-none" value={userData?.captcha} placeholder="Enter captcha"
                  onChange={(e) => {
                      setUSerData({ ...userData, captcha: e.target.value });
                    }}/>
                  <button className="btn btn-outline-secondary captch-refresh-btn" type="button" title="Refresh Captcha">
                    <FontAwesomeIcon icon={faArrowsRotate} onClick={createCaptcha} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <BasicButton
              disabled={isLoading ? isLoading : !isValid}
              className="btn btn-bg-login rounded-0"
              type="submit"
              buttonText="Login"
              onClick={(e) => loginAction(e)}
              isLoading={isLoading}
              loadingText={<Spinner />}
            />
            <BasicButton
              className="btn btn-bg-login rounded-0"
              type="submit"
              buttonText="Forgot Password"
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
