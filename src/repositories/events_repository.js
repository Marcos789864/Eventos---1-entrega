import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class eventsRepository
{

    createEvent = async (entity) =>
    {
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql = 'INSERT INTO events (name,description,id_event_category,id_event_location,start_date,duration_in_minutes, price,enabled_for_enrollment,max_assistance,id_creator_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)';
            const result = await client.query(sql, [entity.name,entity.description,entity.id_event_category,entity.id_event_location,entity.start_date,entity.duration_in_minutes,entity.price,entity.enabled_for_enrollment, entity.max_assistance,entity.id_creator_user]);
            await client.end(); 
            return true;
        } 
        catch (error)
        {
            return  console.log(error);
        }
        
    }


    updateEvent = async (entity) =>
    {
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql = 'UPDATE events SET name = $2, description = $3, id_event_category = $4, id_event_location = $5, start_date = $6, duration_in_minutes = $7, price= $8, enabled_for_enrollment = $9, max_assistance = $10, id_creator_user = $11 WHERE id_creator_user = $1';
            const result = await client.query(sql, [entity.id,entity.name,entity.description,entity.id_event_category,entity.id_event_location,entity.start_date,entity.duration_in_minutes,entity.price,entity.enabled_for_enrollment, entity.max_assistance,entity.id_creator_user]);
            await client.end();
            return true;
        } 
        catch (error)
        { 
            return console.log(error);
        }
        
    }

    obtenerCapacidadMaxima = async (id) =>
    {
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql = 'SELECT max_capacity FROM event_locations RIGHT JOIN events ON event_locations.id_creator_user = events.id_creator_user WHERE event_locations.id_creator_user = $1';
            const result = await client.query(sql, [id]);
            await client.end();
            return result;
        } 
        catch (error)
        {
                
                return console.log(error);
        }
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
            await client.end();
            return result;
        } catch (error) {
            console.log(error);
        }
        
    }
    
    getEvent = async (query) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
    
            let sql = `
                SELECT events.*, event_categories.name AS category_name
                FROM events
                LEFT JOIN event_categories ON events.id_event_category = event_categories.id
            `;
    
            const queryParams = [];
    
            if (query.tag) {
                sql += ' INNER JOIN event_tags ON events.id = event_tags.id_event';
                sql += ' INNER JOIN tags ON event_tags.id_tag = tags.id';
                sql += (queryParams.length > 0 ? ' AND' : ' WHERE') + ' tags.name = $' + (queryParams.length + 1);
                queryParams.push(query.tag);
            }
    
            if (query.startdate) {
                sql += (queryParams.length > 0 ? ' AND' : ' WHERE') + ' start_date = $' + (queryParams.length + 1);
                queryParams.push(query.startdate);
            }
    
            if (query.name) {
                sql += (queryParams.length > 0 ? ' AND' : ' WHERE') + ' lower(events.name) = lower($' + (queryParams.length + 1) + ')';
                queryParams.push(query.name);
            }

            if (query.category) {
                sql += (queryParams.length > 0 ? ' AND' : ' WHERE') + ' lower(event_categories.name) = lower($' + (queryParams.length + 1) + ')';
                queryParams.push(query.category);
            }
    
            const result = await client.query(sql, queryParams);
            await client.end();
            return result.rows;
            
        } catch (error) {
            console.log(error);
        }
    }
    
    getEventDetail = async (id) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
            SELECT events.*, 
                   event_categories.name AS category_name, 
                   event_location.*, 
                   locations.*, 
                   provinces.*
            FROM events
            LEFT JOIN event_categories ON events.id_event_category = event_categories.id
            LEFT JOIN event_locations ON events.id_event_locations = event_locations.id
            LEFT JOIN locations ON event_locations.id_locations = locations.id
            LEFT JOIN provinces ON locations.id_province = provinces.id
            WHERE events.id = $1`;
            
            const result = await client.query(sql, [id]);
            if (result.rowCount > 0) {
                const success = true;
                // Procesa los resultados si es necesario
            } else {
                console.log('No se encontró el evento con el ID proporcionado');
            }
    
            await client.end();
            return result.rows; // Retorna los resultados
        } catch (error) {
            console.log(error);
        }
    };
}


