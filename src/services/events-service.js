import eventsRepository from '../repositories/events-repository.js';

export default class eventsSerice
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
        const repo = new eventsRepository();
        const Events = await repo.getEvents();
        return Events;
    }

    getEventByName = async (name) =>
    {
        const repo = new eventsRepository();
        const Events = await repo.getEventByName(name);
        return Events;
    }

    getEventByCategory = async (category) =>
    {
        const repo = new eventsRepository();
        const Events = await repo.getEventByCategory(category);
        return Events;
    }

    getEventByDate = async (fecha) =>
    {
        const repo = new eventsRepository();
        const Events = await repo.getEventByDate(fecha);
        return Events;
    }

    getEventByTag = async (tag) =>
    {
        const repo = new eventsRepository();
        const Events = await repo.getEventByTag(tag);
        return Events;
    }

}