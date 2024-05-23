import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class Events
{
    getEvents = async () =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM events';
    
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
    getEventByName = async (name) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM events WHERE name = $1';
    
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

    getEventByCategory = async (category) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM events INNER JOIN event_categories ON events.id_event_category = event_categories.id WHERE event_categories.name = $1';
    
            const result = await client.query(sql, [category]);
            if (result.rowCount > 0) {
                success = true;
            }
            
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }

    getEventByDate = async (fecha) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM events WHERE start_date = $1';
            const result = await client.query(sql, [fecha]);
            if (result.rowCount > 0) {
                success = true;
            }
            
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }
    getEventByTag = async (tag) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM events INNER JOIN event_tags ON events.id = event_tags.id_event INNER JOIN tags ON event_tags.id_tag = tags.id WHERE tags.name = $1';
            const result = await client.query(sql, [tag]);
            if (result.rowCount > 0) {
                success = true;
            }
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }

    getUsersFromEvent = async () =>
    {
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
                success = true;
            }
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }
    getUserFromEventByLastName = async (username) =>
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

