const key = "DVDMS_KEEP_SECRET";
const PROFILE_DETAIL = "PROFILE_DETAIL";
const storetoken = (token) => {
  sessionStorage.setItem(key, token);
};

const storeProfileDetails = (details) => {
  console.log("Details", details);

  sessionStorage.setItem(PROFILE_DETAIL, JSON.stringify(details));
};
const getToken = () => {
  return sessionStorage.getItem(key);
};
const getProfileDetail = () => {
  return sessionStorage.getItem(PROFILE_DETAIL);
};

const clearToken = () => {
  sessionStorage.clear();
  return true;
};

const func = {
  storetoken,
  getToken,
  clearToken,
  storeProfileDetails,
  getProfileDetail,
};

export default func;
