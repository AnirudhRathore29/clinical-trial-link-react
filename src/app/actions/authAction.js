import { SET_CURRENT_USER } from '../actions/types';
import store from "../store"

export const loginUser = (decode_token) => {
    localStorage.setItem("jwtToken", decode_token);
    return (
        store.dispatch({
            type: SET_CURRENT_USER,
            payload: decode_token
        })
    )
}