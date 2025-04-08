import axios from "axios";
import baseUrls from "../constants/baseUrls";

import { set } from "lodash";

export function callApi(args = {}) {
  const promise = new Promise((resolve, reject) => {
    let doRequest;

    const headers = {};
    set(headers, "Accept", "application/json");
    set(headers, "Content-Type", "application/json");
    set(headers, "Access-Control-Allow-Origin", "*")

    if (args.method === "PUT") {
      doRequest = axios.put(baseUrls.baseUrl + args.endPoint, args.data, {
        headers: headers,
      });
    } else if (args.method === "POST") {
      doRequest = axios.post(baseUrls.baseUrl + args.endPoint, args.data, {
        headers: headers,
      });
    } else if (args.method === "DELETE") {
      doRequest = axios.delete(baseUrls.baseUrl + args.endPoint, {
        headers: headers,
      });
    } else {
      doRequest = axios.get(baseUrls.baseUrl + args.endPoint, {
        headers: headers,
      });
    }

    doRequest.then(
      (res) => {
        if (args.callback) {
          args.callback(res);
        }
      },

      (err) => {
        if (args.callback) {
          args.callback(err);
        }
      }
    );
  });

  return promise;
}
