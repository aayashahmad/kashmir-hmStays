import MAINAPI from "../api";
import CommonService from "../commonService";
import commonService from "../commonService";

export const GetApi = (endPoint, appType = "PB") => {
  return ({ callback, urlParams, AT = false, headers = [], target }) => {
    let url = endPoint;

    MAINAPI({
      method: "GET",
      url: target + (urlParams ? CommonService.objToQuery(urlParams ?? "") : ""),
      AT: AT,
      appType,
      headers
    })
      .then((res) => {
        if (res) {
          if (callback) callback(res);
        }
      })
      .catch((err) => {
        console.log(err?.response);
        if (callback) callback(err?.response);
      });
  };
};

export const GetApi2 = (endPoint, appType = "PB") => {
  return ({ callback, urlParams }) => {
    let url = endPoint;
    MAINAPI({
      method: "GET",
      url: url + (urlParams ? CommonService.objToQuery(urlParams) : ""),
      appType,
    })
      .then((res) => {
        if (res) {
          if (callback) callback(res);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (callback) callback(err.response);
      });
  };
};

export const GetApi3 = (endPoint, appType = "PB") => {
  return ({ callback, urlParams }) => {
    let url = endPoint;
    MAINAPI({
      method: "GET",
      url: url + (urlParams ? CommonService.objToQuery(urlParams) : ""),
      appType,
    })
      .then((res) => {
        if (res) {
          if (callback) callback(res);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (callback) callback(err.response);
      });
  };
};

export const DetailsApi = (endPoint, appType = "PB") => {
  return ({ id, callback, apiEndPoint = "", headers = [], }) => {
    let url = `${endPoint + apiEndPoint}/${id}`;
    MAINAPI({
      method: "GET",
      url,
      appType,
      headers,
    })
      .then((res) => {
        if (res) {
          if (callback) callback(res);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (callback) callback(err.response);
      });
  };
};

export const PostApi = (endPoint, appType = "PB") => {
  return ({
    data,
    callback,
    urlParams = null,
    apiEndPoint = "",
    hasFile = false,
    headers = [],
  }) => {
    let url = `${endPoint + apiEndPoint}${commonService.objToQuery(urlParams)}`;
    MAINAPI({
      method: "POST",
      url,
      payload: data,
      hasFile,
      appType,
      headers,
    })
      .then((res) => {
        if (res) {
          if (callback) callback(res);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (callback) callback(err.response);
      });
  };
};

export const PutApi = (endPoint, appType = "PB") => {
  return ({ data, callback, urlParams }) => {
    MAINAPI({
      method: "PUT",
      url: endPoint + commonService.objToQuery(urlParams),
      payload: data,
      appType,
    })
      .then((res) => {
        if (res) {
          if (callback) callback(res);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (callback) callback(err.response);
      });
  };
};

export const PutWithPath = (endPoint, appType = "PB") => {
  return ({ data, callback, path = "", urlParams }) => {
    let url = `${endPoint + path}${commonService.objToQuery(urlParams)}`;
    MAINAPI({
      method: "PUT",
      url,
      payload: data,
      appType,
    })
      .then((res) => {
        if (res) {
          if (callback) callback(res);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (callback) callback(err.response);
      });
  };
};

export const DeleteApi = (endPoint, appType = "PB") => {
  return ({ id, callback }) => {
    let url = `${endPoint}`;
    if (id) url = `${endPoint}/${id}`;
    MAINAPI({
      method: "DELETE",
      url,
      appType,
    })
      .then((res) => {
        if (res) {
          if (callback) callback(res);
        }
      })
      .catch((err) => {
        console.log(err.response);
        if (callback) callback(err.response);
      });
  };
};
