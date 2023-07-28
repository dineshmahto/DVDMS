//import jwt from "jsonwebtoken";

const isAuthenticated = () => {
  const token = sessionStorage.getItem("DVDMS_KEEP_SECRET"); // Replace 'localStorage' with 'sessionStorage' or read cookies if that's where you store the token
  if (token) {
    try {
      //const decodedToken = jwt.verify(token, "DVDMS_KEEP_SECRET"); // Replace 'your-secret-key' with your actual secret key used to sign the JWT token
      // You can also check for additional information in the decodedToken if needed
      return true;
    } catch (error) {
      // If the token is invalid or expired, clear it from storage
      sessionStorage.removeItem("DVDMS_KEEP_SECRET");
      localStorage.removeItem("PROFILE_DETAIL");
      return false;
    }
  } else {
    return false;
  }
};

export default isAuthenticated;
