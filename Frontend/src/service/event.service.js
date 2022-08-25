import http from "../API";

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

    getEventById(id) {
        return http.get(`/api/v1/events/${id}`);
    }

    updateEvent(id, data) {
        return http.put(`/api/v1/events/update/${id}`, data);
    }

}

export default new EventService();