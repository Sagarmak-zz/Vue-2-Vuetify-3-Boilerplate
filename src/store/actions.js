import * as AT from "./actionTypes";
import api from "@/packages/api";
import Auth from "@/packages/auth";

export default {
  [AT.LOGIN]: (context, data) => {
    return api.login(data).then(response => {
      Auth.setToken(response.token);
      return response;
    });
  }
};
