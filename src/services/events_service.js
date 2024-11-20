import eventsRepository from '../repositories/events_repository.js';
import eventLocationRepository from '../repositories/events_locations-repository.js';
import validacion from '../helpers/validacion_helper.js';
const validar = new validacion();

export default class EventsService
{
    async createEvent(eventData) {
        const repo = new eventsRepository ();
        const { name, description, id_event_location, max_assistance, price, duration_in_minutes,id_creator_user } = eventData;

        if (!name || name.length < 3 || !description || description.length < 3) {
            return { success: false, message: "El nombre y la descripción deben tener al menos 3 caracteres." };
        }

        const maxCapacity = await repo.getMaxCapacity(parseInt(id_event_location));
        console.log(maxCapacity);
        if (max_assistance > maxCapacity) {
            return { success: false, message: "El máximo de asistentes supera la capacidad máxima del lugar del evento." };
        }

        if (price < 0 || duration_in_minutes < 0) {
            return { success: false, message: "El precio y la duración deben ser mayores o iguales a cero." };
        }

        try {
            const eventId = await repo.createEvent({
                ...eventData,
                id_creator_user: id_creator_user
            });
            return { success: true, message: "Evento creado exitosamente.", eventId };
        } catch (error) {
            console.error('Error en createEvent:', error);
            return { success: false, message: "Error al crear el evento." };
        }
    }

    async getMaxCapacity(id_event_location) {
        console.log("max capacity typeof " + typeof id_event_location);
        const repo = new eventsRepository();
        try {
            const maxCapacity = await repo.getMaxCapacity(id_event_location); 
            return maxCapacity;
        } catch (error) {
            console.error('Error en getMaxCapacity:', error);
            return { success: false, message: "Error al obtener la capacidad máxima." };
        }
    }


    async updateEvent(eventData, userId) {
        const repo = new eventsRepository ();

        console.log("event data" + JSON.stringify(eventData, null, 2));
        const { id, name, description,id_event_category,id_event_location,start_date,duration_in_minutes,price, max_assistance,id_creator_user } = eventData;

        if (!name || name.length < 3 || !description || description.length < 3) {
            return { success: false, message: "El nombre y la descripción deben tener al menos 3 caracteres." };
        }

        const currentEvent = await repo.getEventById(id);
        if (!currentEvent) {
            return { success: false, statusCode: 404, message: "El evento no existe." };
        }

        console.log("idUser" + userId);
        console.log("current event creator id " + currentEvent.id_creator_user);

        if (currentEvent.id_creator_user !== userId) {
            return { success: false, statusCode: 401, message: "No tienes permiso para modificar este evento." };
        }
        
        console.log("id location" + id_event_location);
        const maxCapacity = await repo.getMaxCapacity(id_event_location);
        
        if (max_assistance > maxCapacity) {
            return { success: false, message: "El máximo de asistentes supera la capacidad máxima del lugar del evento." };
        }
        console.log("pase max assistanc");
        console.log("id category" + id_event_category)

        if (price < 0 || duration_in_minutes < 0) {
            return { success: false, message: "El precio y la duración deben ser mayores o iguales a cero." };
        }
        console.log("por entrar")
        try {
            console.log("event data antes de entrar" + JSON.stringify(eventData, null, 2));
            await repo.updateEvent(eventData);
            return { success: true, message: "Evento actualizado exitosamente." };
        } catch (error) {
            console.error('Error en updateEvent:', error);
            return { success: false, message: "Error al actualizar el evento." };
        }
    }

    async deleteEvent(eventId, userId) {
        
        const repo = new eventsRepository ();
        const currentEvent = await repo.getEventById(eventId);
        console.log("evento de ahora" + JSON.stringify(currentEvent, null, 2));
        if (!currentEvent) {
            return { success: false, statusCode: 404, message: "El evento no existe." };
        }
        if (currentEvent.id_creator_user != userId) {
            return { success: false, statusCode: 401, message: "El usuario no es creador del evento." };
        }
        console.log("evento id " + eventId);
        const usersRegistered = await repo.getUsersRegisteredCount(eventId);
        console.log("usuarios para el user registered" + usersRegistered);
        if (usersRegistered != 0) {
            return { success: false, statuscode: 400 , message: "No se puede eliminar el evento porque hay usuarios registrados." };
        }

        try {
            const deleted = await repo.deleteEvent(eventId);
            if (deleted) {
                return { success: true, message: "Evento eliminado exitosamente." };
            } else {
                return { success: false, statusCode: 404, message: "No se encontró el evento para eliminar." };
            }
        } catch (error) {
            console.error('Error en deleteEvent:', error);
            return { success: false, message: "Error al eliminar el evento." };
        }
    }

    getEvents = async () =>
    {
        const repo = new eventsRepository ();
        const Events = await repo.getEvents();
        return Events;
    }

    getEventsAvailables = async () => {
        const repo = new eventsRepository();
        const events = await this.getEvents();
        const filteredEvents = [];
        
        for (const element of events) {
            const idEventLocation = element.id_event_location; 
            console.log("typeof idEventLocation: " + typeof idEventLocation);
            console.log("valor idEventLocation: " + idEventLocation);
    
            if (typeof idEventLocation !== 'number') {
                console.error(`El id_event_location debe ser un número, recibido: ${idEventLocation}`);
                continue;
            }
    
           console.log(idEventLocation);
           console.log(element.max_assistance);

            const usersRegistered = await repo.getUsersRegisteredCount(element.id);
            console.log(element.max_assistance);
            console.log("usuario registrado " + JSON.stringify(usersRegistered))
            console.log( "longitud usaurio registrado" + Object.keys(usersRegistered).length);
            if ( Object.keys(usersRegistered).length < element.max_assistance) {
                console.log("elemento" + JSON.stringify(element, null, 2));
                filteredEvents.push(element);
            }
        }
        
        return filteredEvents;
    };

    getEventById = async (eventId) => {
        const repo = new eventsRepository();
        const Events = await repo.getEventById(eventId);
        return Events;
    }

    getEventDetail = async (id) => {
        const repo = new eventsRepository();
        const Events = await repo.getEventDetail(id);
        return Events;
    }
}