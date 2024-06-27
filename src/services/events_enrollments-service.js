import events_enrollmentRepository from '../repositories/event_enrollments-repository.js';

export default class events_enrollmentsService
{
    getUserFromEvent = async (query) => {
        const repo = new events_enrollmentRepository();
        const eventsEnroll = await repo.getUserFromEvent(query);
        return eventsEnroll;
    };
}