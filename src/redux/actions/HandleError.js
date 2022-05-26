import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HandleError = error => {
    console.log("error", error)
    toast.configure();
    if (error.code === "UNAUTHORIZED_ACCESS" || error.code === "LOGOUT") {
        //localStorage.removeItem("auth_security");
        // localStorage.removeItem("user");
        //toast.error(error.message, { theme: "colored" })
        //window.location.href = "/login"
    }
};

export default HandleError;