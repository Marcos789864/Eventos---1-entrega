import events_enrollmentRepository from '../repositories/event_enrollments-repository.js';

export default class events_enrollmentsService
{
    getUsersFromEvent = async () =>
    {
        const repo = new events_enrollmentRepository();
        const Events_enroll = await repo.getUsersFromEvent(tag);
        return Events_enroll;
    }
    getUserFromEventByName = async (name) =>
    {
        const repo = new events_enrollmentRepository();
        const Events_enroll = await repo.getUserFromEventByName(name);
        return Events_enroll;
    }

    getUserFromEventByLastName = async (last_name) =>
    {
        const repo = new events_enrollmentRepository();
        const Events_enroll = await repo.getUserFromEventByLastName(last_name);
        return Events_enroll;
    }

    getUserFromEventByUsername = async (username) =>
    {
        const repo = new events_enrollmentRepository();
        const Events_enroll = await repo.getUserFromEventByUsername(username);
        return Events_enroll;
    }

}