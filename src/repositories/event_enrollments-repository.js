import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class events_enrollments
{

    getUsersFromEvent = async () =>    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM users INNER JOIN event_enrollments ON users.id = event_enrollments.id_user INNER JOIN events ON event_enrollments.id_event = events.id';
            const result = await client.query(sql);
            if (result.rowCount > 0) {
                success = true;
            }
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }
    getUserFromEventByName = async (name) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM users INNER JOIN event_enrollments ON users.id = event_enrollments.id_user INNER JOIN events ON event_enrollments.id_event = events.id WHERE users.first_name = $1';
            const result = await client.query(sql, [name]);
            if (result.rowCount > 0) {
                success = true;
            }
            await client.end();
        } catch (error) {
           console.log(error);
        }
        return result;
    }
    getUserFromEventByLastName = async (last_name) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM users INNER JOIN event_enrollments ON users.id = event_enrollments.id_user INNER JOIN events ON event_enrollments.id_event = events.id WHERE users.last_name = $1';
            const result = await client.query(sql, [last_name]);
            if (result.rowCount > 0) {
                success = true;            }
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }
    getUserFromEventByUsername = async (username) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM users INNER JOIN event_enrollments ON users.id = event_enrollments.id_user INNER JOIN events ON event_enrollments.id_event = events.id WHERE users.username = $1';
            const result = await client.query(sql, [username]);
            if (result.rowCount > 0) {
                success = true;
            }
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }
    getUserFromEventByAttendance = async (attended) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM users INNER JOIN event_enrollments ON users.id = event_enrollments.id_user WHERE event_enrollments.attended = $1';
            const result = await client.query(sql, [attended]);
            if (result.rowCount > 0) {
                success = true;
            }
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }
    getUserFromEventByRating = async (rate) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM users INNER JOIN event_enrollments ON users.id = event_enrollments.id_user WHERE event_enrollments.rating = $1';
            const result = await client.query(sql, [rate]);
            if (result.rowCount > 0) {
                success = true;
            }
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }
    updateEventRatingById = async (entity) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'UPDATE event_enrollments rating = $1 observations = $2 WHERE id = $3';
            const result = await client.query(sql, [entity.rate, entity.observation, entity.id]);
            if (result.rowCount > 0) {
                success = true;
            }
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }
    createEnrollment = async (entity) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'INSERT INTO event_enrollments(id_event, id_user, description, registration_date_time) VALUES($1,$2,$3,$4) WHERE (SELECT max_assistance FROM events WHERE id = $1) < (SELECT COUNT(id) FROM event_enrollments WHERE id_event = $1) AND (SELECT enabled_for_enrollment FROM events WHERE id = $1) = 1 AND';
            const result = await client.query(sql, [entity.id_event,entity.id_user,entity.description,entity.registration_date_time]);
            if (result.rowCount > 0) {
                success = true;
            }
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
        //FALTA HACER QUE SI YA ESTA ANOTADO NO LO DEJE Y QUE SI YA PASO LA FECHA NO LO DEJE
    }
}