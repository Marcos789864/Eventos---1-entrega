import events_enrollmentRepository from '../repositories/events_enrollments-repository.js';
import eventsRepository from '../repositories/events_repository.js';
import validacion from "../helpers/validacion_helper.js";
const validar = new validacion();

export default class events_enrollmentsService
{
    getUserFromEvent = async (query) => {
        const repo = new events_enrollmentRepository();
        const eventsEnroll = await repo.getUserFromEvent(query);
        return eventsEnroll;
    };

    async enrollInEvent(eventId, userId) {
        const repo = new eventsRepository();
        const repoE = new events_enrollmentRepository();
        const event = await repo.getEventById(eventId);
        const currentDate = new Date();

        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
        const currentYear = currentDate.getFullYear();
        
        const timestamp = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
        // "27-11-2020"

        if (!event) {
            return { success: false, statusCode: 404, message: "El evento no existe." };
        }

        if (event.start_date <= timestamp) {
            return { success: false, statusCode: 400, message: "No se puede registrar a un evento que ya sucedió o que es hoy." };
        }
    
        if (!event.enabled_for_enrollment) {
            return { success: false, statusCode: 400, message: "El evento no está habilitado para la inscripción." };
        }
    
        const maxCapacity = event.max_assistance;
        const currentRegistrations = await repo.getUsersRegisteredCount(eventId);
        if (currentRegistrations >= maxCapacity) {
            
            return { success: false, statusCode: 400, message: "Capacidad máxima del evento alcanzada." };
        }
    
        const alreadyRegistered = await repoE.checkUserRegistration(eventId, userId);
        if (alreadyRegistered) {
            return { success: false, statusCode: 400, message: "El usuario ya se encuentra registrado en el evento." };
        }
    
        try {
            await repoE.enrollUserInEvent(eventId, userId, timestamp);
            return { success: true, statusCode: 201, message: "Usuario registrado exitosamente en el evento." };
        } catch (error) {
            console.error('Error en enrollInEvent:', error);
            return { success: false, message: "Error al registrar al usuario en el evento." };
        }
    }

    async unenrollFromEvent(eventId, userId) {
        const repo = new eventsRepository();
        const repoE = new events_enrollmentRepository();
        const currentDate = new Date();

        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
        const currentYear = currentDate.getFullYear();
        
        const timestamp = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
        // "27-11-2020"
    
        const event = await repo.getEventById(eventId);
        if (!event) {
            return { success: false, statusCode: 404, message: "El evento no existe." };
        }
    
        if (event.start_date <= timestamp) {
            return { success: false, statusCode: 400, message: "No se puede eliminar la inscripción de un evento que ya sucedió o que es hoy." };
        }
    
        const isRegistered = await repoE.checkUserRegistration(eventId, userId);
        if (!isRegistered) {
            return { success: false, statusCode: 400, message: "El usuario no se encuentra registrado en el evento." };
        }
    
        try {
            await repoE.unenrollUserFromEvent(eventId, userId);
            return { success: true, statusCode: 200, message: "Usuario removido exitosamente del evento." };
        } catch (error) {
            console.error('Error en unenrollFromEvent:', error);
            return { success: false, message: "Error al eliminar la inscripción del usuario en el evento." };
        }
    }

    async updateEventRank(eventId, rating, userId, observations) {
        const repo = new eventsRepository();
        const repoE = new events_enrollmentRepository();
        const currentDate = new Date();
    
        const event = await repo.getEventById(eventId);
        if (!event) {
            return { success: false, statusCode: 404, message: "El evento no existe." };
        }
    
        if (new Date(event.start_date) > currentDate) {
            return { success: false, statusCode: 400, message: "El evento no ha finalizado aún." };
        }
    
        if (rating < 1 || rating > 10 || isNaN(rating)) {
            return { success: false, statusCode: 400, message: "El valor del rating debe estar entre 1 y 10 y ser un número válido." };
        }
    
        const isRegistered = await repoE.checkUserRegistration(eventId, userId);
        if (!isRegistered) {
            return { success: false, statusCode: 400, message: "El usuario no se encuentra registrado en el evento." };
        }
    
        try {
            await repoE.updateEventRatingById(eventId, rating, userId, observations);
            return { success: true, statusCode: 200, message: "Evento calificado exitosamente." };
        } catch (error) {
            console.error('Error en updateEventRank:', error);
            return { success: false, statusCode: 500, message: "Error al calificar el evento." };
        }
    }
    
}