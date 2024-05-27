import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class Events
{

    createEvent = async (entity) =>
    {
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql = 'INSERT INTO provinces (name,description,id_event_category,id_event_location,start_date,duration_in_minutes, price,enabled_for_enrollment,max-assitance,id_creator_user) VALUES ($1,$2,$3,$4,$5,$6,$7.$8,$9,$10)';
            const result = await client.query(sql, [entity.name,entity.description,entity.id_event_category,entity.id_event_location,entity.start_date,entity.duration_in_minutes,entity.price,entity.enabled_for_enrollment, entity.max-assitance,entityid_creator_user]);
            await client.end();
            success = true; 
        } 
        catch (error)
        {
            console.log(error);
        }
        return result;
    }


    updateEvent = async (entity) =>
    {
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql = 'UPDATE events SET name = $2, description = $3, id_event_category = $4, id_event_location = $5, start_date = $6, duration_in_minutes = $7, price= $8, enabled_for_enrollment = $9, max-assitance = $10, id_creator_user = $11 WHERE id = $1  ';
            const result = await client.query(sql, [entity.id,entity.name,entity.description,entity.id_event_category,entity.id_event_location,entity.start_date,entity.duration_in_minutes,entity.price,entity.enabled_for_enrollment, entity.max-assitance,entity.id_creator_user]);
            await client.end();
            success = true; 
        } 
        catch (error)
        {
            console.log(error);
        }
        return result;
    }

    deleteEvent = async (id) =>
    {
        let success = false;
        const client = new Client(DBConfig);
        try {
        await client.connect();
        const sql = 'DELETE FROM events WHERE id = $1';

        const result = await client.query(sql, [id]);
        if (result.rowCount > 0) {
            success = true;
        }
        await client.end();
    } catch (error) {
        console.log(error);
    }
    return success;
    }


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

