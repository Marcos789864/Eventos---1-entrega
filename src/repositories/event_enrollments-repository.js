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


}