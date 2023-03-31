import CryptoJS from "crypto-js";

export const encrypt = (rowJson) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(rowJson),
    process.env.REACT_APP_SECRET_KEY
  ).toString();
};

export const decrypt = (secret) => {
  return JSON.parse(
    CryptoJS.AES.decrypt(secret, process.env.REACT_APP_SECRET_KEY).toString(
      CryptoJS.enc.Utf8
    )
  );
};
