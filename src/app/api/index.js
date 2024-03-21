const axios = require("axios");


//Post Form Data
export const postCallingAPI = async (data,pageName) => {
    var token = '';
    if (typeof window !== "undefined") {
       token = sessionStorage.getItem("JSESSIONID");
       console.log("token", token)
    }
    
    const originUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    
    const headers = {
      "JSESSION-ID": `${token}`,
      "Tenant-URL": `${originUrl}`,
    };
    
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
    
    var token = '';
    if (typeof window !== "undefined") {
       token = sessionStorage.getItem("JSESSIONID");
       console.log("token", token)
    }
    
    const originUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    
    const headers = {
      "JSESSION-ID": `${token}`,
      "Tenant-URL": `${originUrl}`,
    };
    
    const multipartHeader = {
      ...headers,
      "Content-Type":"multipart/form-data"
    };
    
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