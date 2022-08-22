import { Router } from 'express';
import {
    createEvent,
    getAllEvents,
    getEventById,
    getEventsByUserId,
    getDraftEventsByUserId,
    searchEvents,
    deleteEventById
} from '../controller/event.controller.js';
import { authGuard } from '../middleware/index.js';

const eventRouter = Router();

eventRouter.post('', authGuard, createEvent);
eventRouter.get('', getAllEvents);
eventRouter.get('/users', authGuard, getEventsByUserId); 
eventRouter.get('/draft', authGuard, getDraftEventsByUserId); 
eventRouter.delete('/delete/:eventId', deleteEventById);
eventRouter.get('/search', searchEvents);
eventRouter.get('/:eventId', getEventById); 

export { eventRouter };