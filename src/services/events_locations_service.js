import eventsLocationRepo from '../repositories/events_locations-repository';

export default class EventLocationService
{
    getByIdAsync = async (id) => 
    {
        const repo = new eventsLocationRepo();
        const eventLocation = await repo.getById(id);
        return eventLocation;
    }
}