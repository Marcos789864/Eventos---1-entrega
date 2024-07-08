import events_enrollmentRepository from '../repositories/events_enrollments-repository.js';
import validacion from "../helpers/validacion_helper.js";
const validar = new validacion();

export default class events_enrollmentsService
{
    getUserFromEvent = async (query) => {
        const repo = new events_enrollmentRepository();
        const eventsEnroll = await repo.getUserFromEvent(query);
        return eventsEnroll;
    };

    updateEventRank = async (evento, entero, idUsuario,observacion) =>{
        
        const repo = new events_enrollmentRepository();
        const UserAppliedForEvent  =  await repo.getUserFromEvent(idUsuario)
        if(UserAppliedForEvent == null)
        {
            return "El usuario no se encuentra alistado en el evento";
        }
        if(validar.validarUpdateEvento(entero,evento.start_date) != "Ok"){
            return validar.validarUpdateEvento(entero,evento.start_date)
        }
        else
        {
        return await repo.updateEventRatingById(evento.id,entero,idUsuario,observacion);
        }
        
    }
}