import EventsLocationsRepository from "../repositories/events_locations-repository.js";import validacion from '../helpers/validacion_helper.js';
const validar = new validacion();


export default class EventLocationService {
    getAllLocations = async () => {
        const repo = new EventsLocationsRepository();
        const eventLocations = await repo.getEventLocations();
        return eventLocations;
    }

    getByIdAsync = async (id) => {
        const repo = new EventsLocationsRepository();
        const eventLocation = await repo.getById(id);
        return eventLocation;
    }

    createEventLocation = async (entity, idUsuario) => {
        const repo = new EventsLocationsRepository();
        const result = await repo.createLocation(entity, idUsuario);
        return result;
    }
    
    updateEventLocation = async (entity, idUsuario) => {
        const repo = new EventsLocationsRepository();
        const result = await repo.updateEventLocation(entity, idUsuario);
        return result;
    }
    
    deleteEventLocation = async (id) => {
        const repo = new EventsLocationsRepository();
        const result = await repo.deleteEventLocation(id);
        return result;
    }    
}