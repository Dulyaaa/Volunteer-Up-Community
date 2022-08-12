import { Router } from 'express';
import {
    createEvent,
    getAllEvents,
    getEventById,
    getEventsByUserId,
    getEventsNearMe,
    searchEvents,
    deleteEventById
} from '../controller/event.controller.js';
import { authGuard } from '../middleware/index.js';

const eventRouter = Router();

eventRouter.post('', authGuard, createEvent);
eventRouter.get('', getAllEvents);
eventRouter.get('/users', authGuard, getEventsByUserId);
eventRouter.delete('/delete/:eventId', deleteEventById);
eventRouter.get('/locations', getEventsNearMe);
eventRouter.get('/search', searchEvents);
eventRouter.get('/:eventId', getEventById); 

export { eventRouter };