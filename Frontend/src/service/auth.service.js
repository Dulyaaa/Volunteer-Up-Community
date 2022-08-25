import http from "../API";

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

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();