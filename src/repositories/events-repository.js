import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class Events
{
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

    getEventByTag = async (tag) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM events INNER JOIN event_tags ON events.id = event_tags.id_event INNER JOIN tags ON event_tags.id_tag = tags.id INNER JOIN event_enrollments ON events.id = event.enrollments.id_event INNER JOIN users ON events.id_creator_user = users.id INNER JOIN event_categories ON events.id_event_category = event_categories.id INNER JOIN event_locations ON events.id_event_location = event_location.id INNER JOIN locations ON event_locations.id_location = locations.id INNER JOIN provinces ON locations.id_province = provinces.id';
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
}

