import jwtDecode from "jwt-decode";

export const getdecodedData = (token: string) => {
  return jwtDecode(token);
};
