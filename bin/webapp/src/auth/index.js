// is logged in 
import { Navigate } from "react-router-dom";
export const isLoggedIn = () => {
    let data = sessionStorage.getItem("data")
    if (data == null) {
        return false;
    }
    else {
        return true;
    }
}
//do logout
export const doLogout = (next) => {
    sessionStorage.removeItem("data");
    console.log("data cleared from storage ");
    next()


}
// set to local storage
export const dologin = (data, next) => {
    sessionStorage.setItem("data", JSON.stringify(data))
    next();
}
//get Current UserdATA
export const getCureentUser = () => {
    if (isLoggedIn) {
        // console.log("hehe", JSON.parse(sessionStorage.getItem("data")))
        return (JSON.parse(sessionStorage.getItem("data")));
    }
    else {
        console.log("returning false")
        return false;
    }
}