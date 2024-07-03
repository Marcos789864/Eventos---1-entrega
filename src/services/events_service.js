import eventsRepository from '../repositories/events_repository.js';
import eventLocationRepository from '../repositories/events_locations-repository.js';
import validacion from '../helpers/validacion_helper.js';
const validar = new validacion();

export default class EventsService
{
    createEvent = async (entity) => 
    {
        const repo = new eventLocationRepository();
        const repo2 = new eventsRepository();
        const event_location =  await repo.getById(entity.id_event_location)
        if(entity.name.length < 3 || entity.description.length < 3 )
        {
            return "El nombre o descripcion del evento debe tener una longitud superior a 3 ";
        }
        else if(validar.ValidarCreacionEvento(entity.max_assistance,event_location[0].max_capacity,entity.price,entity.duration_in_minutes) != true)
        {
            return validar.ValidarCreacionEvento(entity.max_assistance,entity.max_capacity,entity.price,entity.duration_in_minutes);
        }
        else
        {
            await repo2.createEvent(entity);
            return true;
        }
    }

    updateEvent = async (entity) =>
    {
        const repo = new eventsRepository();
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