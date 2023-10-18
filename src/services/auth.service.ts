import { authKey } from "@/conastants/authkey";
import { instances as axiosInastant } from "@/helper/axios/axiosInastant";
import { getBaseUrl } from "@/helper/confige/envConfige";
import { getdecodedData } from "@/utills/jwt";
import { getLoacalStorage, setLoacalStorage } from "@/utills/local-storage";

export const userLoginInfo = ({ accessToken }: { accessToken: string }) => {
  return setLoacalStorage(authKey, accessToken);
};
export const getUserInfo = () => {
  const authToken = getLoacalStorage(authKey);
  if (authToken) {
    const decodedData = getdecodedData(authToken);
    return decodedData;
  } else {
    return "";
  }
};
export const isLoggedIn = () => {
  const authToken = getLoacalStorage(authKey);
  return !!authToken;
};
export const getNewAccessToken = async () => {
  return await axiosInastant({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
