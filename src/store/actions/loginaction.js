const loginAction = (loginData) => {
  return {
    type: "logged_action",
    payload: loginData,
  };
};

export default loginAction;
