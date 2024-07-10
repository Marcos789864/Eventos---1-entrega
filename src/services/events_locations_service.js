import EventsLocationsRepository from "../repositories/events_locations-repository.js";

export default class EventLocationService {
    getAllLocations = async () => {
        const repo = new EventsLocationsRepository();
        const eventLocations = await repo.getEventLocations();
        return eventLocations;
    }

    getByIdAsync = async (id,idUser) => {
        const repo = new EventsLocationsRepository();
        const eventLocation = await repo.getById(parseInt(id),idUser);
        return eventLocation;
    }

    createEventLocation = async (entity,idUsuario) => 
    {
        const repo = new EventsLocationsRepository();
        const eventLocations = await repo.createLocation(entity,idUsuario);
        return eventLocations;
    }
}