const axios = require("axios");

if (typeof window !== "undefined") {
  var token = sessionStorage.getItem("JSESSIONID");
}
// const originUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
const originUrl = "https://mbx-staging.getmagicbox.com"
const headers = {
  "JSESSION-ID": "C9642077CF8C936C217F4D30E926138AB1F762CCFA5B67B696C0A7F26E0F8700",
  "Tenant-URL": `${originUrl}`
};



const multipartHeader = {
  ...headers,
  "Content-Type":"multipart/form-data"
};

//Post Form Data
export const postCallingAPI = async (data,pageName) => {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}`+ pageName, data, {
      headers,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
};

// it should only call for when body is passed as a form-data/multipart
export const postAPIFormData = async (data,pageName) => {
  console.log(multipartHeader);
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}`+ pageName, data, {
      headers:multipartHeader,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
};
