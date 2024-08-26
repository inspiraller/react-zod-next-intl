import { PropsFormRegister } from "@/@types";
import { axiosBase } from "@/apis/axios.config";

export const apiRegister = ({regUsername, regEmail, regPassword}: PropsFormRegister) => {
  return axiosBase({
    method: "POST",
    url: "/users/register",
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      name: regUsername,
      email: regEmail,
      password: regPassword
    },
    withCredentials: true, // NOTE: Make sure origin is set for specific ip. If origin is *, then withCredentials: true will trigger an error!
  });
};
