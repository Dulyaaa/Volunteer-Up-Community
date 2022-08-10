import axios from "axios";
import http from "../API";

const API_URL = "http://localhost:8080/api/v1/events";

class EventService {

    create(data) {
        return http.post("/boardingPlace/create", data);
    }

    getAll() {
        return http.get("/api/v1/events");
    }

    get(id) {
        return http.get(`/boardingPlace/place/${id}`);
    }

    findByPlace(placeCity) {
        return http.get(`/boardingPlace/search?placeCity=${placeCity}`);
    }

    delete(id) {
        return http.delete(`/boardingPlace/delete/${id}`);
    }

    getCount() {
        return http.get("/boardingPlace/count");
    }

    update(id, data) {
        return http.put(`/boardingPlace/update/${id}`, data);
    }

}
export default new EventService();