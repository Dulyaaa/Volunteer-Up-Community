import axios from "axios";
import http from "../API";

const API_URL = "http://localhost:8080/api/v1/events";

class EventService {

    create(config, data) {
        return http.post("/api/v1/events", config, data);
    }

    getAll() {
        return http.get("/api/v1/events");
    }

    getByUser(config) {
        return http.get("/api/v1/events/users", config);
    }

    getDraftsByUser(config) {
        return http.get("/api/v1/events/draft", config);
    }

    delete(id) {
        return http.delete(`/api/v1/events/delete/${id}`);
    }

    searchEvents(data) {
        return http.get(`/api/v1/events/search?category=${data}`);
    }

    // http://localhost:8080/api/v1/events/search?category=fourth


    get(id) {
        return http.get(`/boardingPlace/place/${id}`);
    }

    findByPlace(placeCity) {
        return http.get(`/boardingPlace/search?placeCity=${placeCity}`);
    }

    getCount() {
        return http.get("/boardingPlace/count");
    }

    update(id, data) {
        return http.put(`/boardingPlace/update/${id}`, data);
    }

}
export default new EventService();