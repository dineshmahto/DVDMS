import axios from "axios";
import tokenhandle from "../../common/tokenhandle/tokenhandle";
console.log(tokenhandle.getToken());
const serviceCall = axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
  //timeout: 1000 * 5,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + tokenhandle.getToken(),
  },
});

const methods = {
  getData: (url, qeryString, headers) =>
    serviceCall({
      method: "GET",
      url: url,
      params: qeryString,
      headers,
    }),
  postData: (url, formData, header = { token: tokenhandle.getToken() }) =>
    serviceCall({
      method: "POST",
      url: url,
      data: formData,
      headers: header,
    }),
  putData: (url, formData) =>
    serviceCall({
      method: "PUT",
      url: url,
      data: formData,
      headers: {
        "content-type": "application/json", // override instance defaults
      },
    }),
  patchData: (url, formData) =>
    serviceCall({
      method: "PATCH",
      url: url,
      data: formData,
      headers: {
        "content-type": "application/json", // override instance defaults
      },
    }),
  deleteData: (url, qeryString) =>
    serviceCall({
      method: "DELETE",
      url: url,
      params: {
        qeryString,
      },
      //   params: {
      //     search: "parameter",
      //   },
    }),
};

export default methods;
