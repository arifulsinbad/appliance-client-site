import { authKey } from "@/conastants/authkey";
import { getNewAccessToken } from "@/services/auth.service";
import { IGenericErrorResponse, IResponse } from "@/type";
import { getLoacalStorage, setLoacalStorage } from "@/utills/local-storage";
import axios from "axios";

const instances = axios.create();
instances.defaults.headers.post["Content-Type"] = "application/json";
instances.defaults.headers["Accept"] = "application/json";
instances.defaults.timeout = 60000;
// Add a request interceptor
instances.interceptors.request.use(
  function (config) {
    const authToken = getLoacalStorage(authKey);
    if (authToken) {
      config.headers.Authorization = authToken;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instances.interceptors.response.use(
  //  @ts-ignore
  function (response) {
    const responseObject: IResponse = {
      data: response?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  async function (error) {
    const config = error?.config;

    if (error?.response?.status === 403 && !config?.sent) {
      config.sent = true;
      const res = await getNewAccessToken();
      const accessToken = res?.data?.token;
      config.headers["Authorization"] = accessToken;
      setLoacalStorage(authKey, accessToken);
      return instances(config);
    } else {
      const responseObject: IGenericErrorResponse = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Somthing went wrong",
        errorMessages: error?.response?.data?.message,
      };
      return responseObject;
    }
  }
);

export { instances };
