import eventsRepository from '../repositories/events_repository.js';

export default class EventsService
{
    createEvent = async (entity) => 
    {
        const repo = new eventsRepository();
        const Events = await repo.createEvent(entity);
        return Events;
    }

    updateEvent = async (entity) =>
    {
        const repo = new eventsRepository();
        const Events = await repo.updateEvent(entity);
        return Events;
    }

    deleteEvent = async (id) =>
    {
        const repo = new eventsRepository();
        const Events = await repo.updateEvent(id);
        return Events;
    }

    getEvents = async () =>
    {
        const repo = new eventsRepository ();
        const Events = await repo.getEvents();
        return Events;
    }

    getEvent = async (query) => {
        const repo = new eventsRepository();
        const Events = await repo.getEvent(query);
        return Events;
    }

    getEventDetail = async (id) => {
        const repo = new eventsRepository();
        const Events = await repo.getEventDetail(id);
        return Events;
    }
}