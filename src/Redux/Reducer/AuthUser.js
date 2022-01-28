import { USERSIGNUP_SUCCESS, USERSLOGIN_SUCCESS, USERSLOGOUT_SUCCESS } from "../Type.js/Type";

const initialState = {};
const signupApiData = (state = initialState, action) => {
  let data = action.payload;
  switch (action.type) {
    case USERSIGNUP_SUCCESS:
      return data;
    case USERSLOGIN_SUCCESS:
      return data;
    case USERSLOGOUT_SUCCESS:
      return data;
    default:
      return state;
  }
};
export default signupApiData;
