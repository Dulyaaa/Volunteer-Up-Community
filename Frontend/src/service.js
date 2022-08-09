import http from '../API';

class Events {

    create(data) {
        return http.post("/boardingPlace/create", data);
    }

    getAll() {
        return http.get("/getAllEvents");
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

export default new Events();





// eventRouter.post('', authGuard, createEvent);
// eventRouter.get('', getAllEvents);
// eventRouter.get('/users', authGuard, getEventsByUserId);
// eventRouter.get('/locations', getEventsNearMe);
// eventRouter.get('/search', searchEvents);
// eventRouter.get('/:eventId', getEventB


// authRouter.post('/signup', createAccount);
// authRouter.post('/login', login);