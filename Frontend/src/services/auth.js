import axios from "axios";
import http from "../API";

const API_URL = "http://localhost:8080/api/v1/auth/";

class AuthService {

    login(data) {
        return http.post("/api/v1/auth/login", data)
    }

    register(data) {
        return http.post("/api/v1/auth/signup", data)
    }

    logout() {
        localStorage.removeItem("user");
    }

    // register(username, email, password) {
    //     return axios.post(API_URL + "signup", {
    //         username,
    //         email,
    //         password
    //     });
    // }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}
export default new AuthService();