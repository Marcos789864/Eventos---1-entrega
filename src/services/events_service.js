import eventsRepository from '../repositories/events_repository.js';
import eventLocationRepo from '../repositories/events_locations-repository.js';
import validacion from '../helpers/validacion_helper.js';

export default class EventsService
{
    createEvent = async (entity) => 
    {
        const repo = new eventLocationRepo();
        const validar = new validacion();
        const event_location = repo.getById(entity.id)
        if(entity.name.length < 3 || entity.description.length < 3 )
        {
            return "El nombre o descripcion del evento debe tener una longitud superior a 3 ";
        }
        else if(validar.ValidarCreacionEvento(entity.max_assistance,event_location.id,entity.price,entity.duration_in_minutes) != "Ok")
        {
            return validar.ValidarCreacionEvento(entity.max_assistance,entity.max_capacity,entity.price,entity.duration_in_minutes);
        }
        else
        {
            return await repo.createEvent(entity);
        }
    }

    updateEvent = async (entity) =>
    {
        const repo = new eventsRepository();
        const validar = new validacion();
        const capacidadMax = await repo.obtenerCapacidadMaxima(entity.id);
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