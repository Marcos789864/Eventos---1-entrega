import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class EventsEnrollments
{
    insertUserToEvent = async (enrollment) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'INSERT INTO event_enrollments (id_event, id_user, description, registration_date_time, attended, observations, rating) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    
            const result = await client.query(sql, [enrollment.id_event, enrollment.id_user, enrollment.description, enrollment.registration_date_time, enrollment.attended, enrollment.observations, enrollment.rating]);
            if (result.rowCount > 0) {
                success = true;
            }
            
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }
    deleteUserFromEvent = async (id) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'DELETE FROM event_enrollments WHERE event_enrollments.id_user = $1';
    
            const result = await client.query(sql, [id]);
            if (result.rowCount > 0) {
                success = true;
            }
            
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }

}