import { eventRepository } from '../repository/event.js';
import { preparePagination, getTotalPages } from '../utils/pagination.js';

const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            venue,
            locationPoint,
            startDate,
            endDate,
            imageUrl,
            visibility
        } = req.body;

        const event = await eventRepository.createAndSave({
            title: title.toLowerCase(),
            description,
            category: category.toLowerCase(),
            venue,
            locationPoint,
            startDate,
            endDate,
            imageUrl,
            userId: req.validatedToken.userId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            visibility
        });

        if (event) {
            return res.status(201).send({
                error: false,
                message: 'Event successfully created',
                data: event,
            });
        }
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: `Server error, please try again later. ${error}`,
        });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const { page: offset, limit: count } = preparePagination(page, limit);

        // Fetch all events sorting by the date created which ensures that the latest one come up first
        const allEvents = await eventRepository
            .search()
            .where('visibility')
            .equal(true)
            .sortDescending('createdAt')
            .return.page(offset, count);

        // Get the total number of events in the DB
        const totalEvents = await eventRepository.search().return.count();

        const totalPages = getTotalPages(totalEvents, count);

        return res.status(200).send({
            error: false,
            message: 'Events retrieved successfully',
            data: {
                allEvents,
                totalEvents,
                totalPages,
            },
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: `Server error, please try again later. ${error}`,
        });
    }
};

const getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Fetch a single event by ID
        const event = await eventRepository.fetch(eventId);

        if (!event) {
            return res.status(404).send({
                error: true,
                message: 'Event not found.',
                data: event,
            });
        }

        return res.status(200).send({
            error: false,
            message: 'Event retrieved successfully',
            data: event,
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: `Server error, please try again later. ${error}`,
        });
    }
};

const deleteEventById = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Fetch a single event by ID
        const event = await eventRepository.fetch(eventId);

        if (!event) {
            return res.status(404).send({
                error: true,
                message: 'Event not found.',
                data: event,
            });
        }

        if (eventRepository.remove(eventId)) {
            return res.status(200).send({
                error: false,
                message: 'Event deleted successfully',
            });
        }
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: `Server error, please try again later. ${error}`,
        });
    }
};

const getDraftEventsByUserId = async (req, res) => {
    try {
        const { userId } = req.validatedToken;
        const { page, limit } = req.query;

        const { page: offset, limit: count } = preparePagination(page, limit);

        // Fetch all host events sorting by the date created which ensures that the latest one come up first
        const userDraftEvents = await eventRepository
            .search()
            .where('userId')
            .equal(userId)
            .where('visibility')
            .equal(false)
            .sortDescending('createdAt')
            .return.page(offset, count);

        // Get the total number of events in the DB
        const totalEvents = await eventRepository
            .search()
            .where('userId')
            .equal(userId)
            .where('visibility')
            .equal(false)
            .return.count();

        const totalPages = getTotalPages(totalEvents, count);

        return res.status(200).send({
            error: false,
            message: 'Events retrieved successfully',
            data: {
                userDraftEvents,
                totalEvents,
                totalPages,
            },
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: `Server error, please try again later. ${error}`,
        });
    }
};

const getEventsByUserId = async (req, res) => {
    try {
        const { userId } = req.validatedToken;
        const { page, limit } = req.query;

        const { page: offset, limit: count } = preparePagination(page, limit);

        // Fetch all host events sorting by the date created which ensures that the latest one come up first
        const userEvents = await eventRepository
            .search()
            .where('userId')
            .equal(userId)
            .where('visibility')
            .equal(true)
            .sortDescending('createdAt')
            .return.page(offset, count);

        // Get the total number of events in the DB
        const totalEvents = await eventRepository
            .search()
            .where('userId')
            .equal(userId)
            .where('visibility')
            .equal(true)
            .return.count();

        const totalPages = getTotalPages(totalEvents, count);

        return res.status(200).send({
            error: false,
            message: 'Events retrieved successfully',
            data: {
                userEvents,
                totalEvents,
                totalPages,
            },
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: `Server error, please try again later. ${error}`,
        });
    }
};

const searchEvents = async (req, res) => {
    try {
        const searchKey = Object.keys(req.query)[0];
        const searchValue = Object.values(req.query)[0];

        console.log("req.query", req)

        const { page, limit } = req.query;
        const { page: offset, limit: count } = preparePagination(page, limit);

        // TODO: improve this one 
        if (!searchKey) {
            return await getAllEvents(req, res);
        }

        // Determine the search criteria and search events accordingly
        let searchResult;
        if (searchKey && searchKey.toLowerCase() === 'category') {
            searchResult = await searchByCategory(searchValue.toLowerCase(), offset, count);
        }

        return res.status(200).send({
            error: false,
            message: 'Events based on your search criteria.',
            data: searchResult,
        });
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: `Server error, please try again later. ${error}`,
        });
    }
};

// Search events by category
const searchByCategory = async (category, offset, count) => {
    const events = await eventRepository
        .search()
        .where('category')
        .eq(category)
        .where('visibility')
        .equal(true)
        .sortDescending('createdAt')
        .return.page(offset, count);
    const totalEvents = await eventRepository
        .search()
        .where('category')
        .eq(category)
        .return.count();
    const totalPages = getTotalPages(totalEvents, count);

    return {
        events,
        totalEvents,
        totalPages,
    };
};

export {
    createEvent,
    getAllEvents,
    getEventById,
    deleteEventById,
    getEventsByUserId,
    getDraftEventsByUserId,
    searchEvents,
};