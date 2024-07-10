import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class events_locationsRepository
{

    getEventLocations= async () =>    
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_locations ';
            const result = await client.query(sql);
            await client.end();
            return result.rows;
        } catch (error) {
             return console.log(error);
        }
        
    }

    getById = async (id) => 
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql =  'SELECT * FROM event_locations where id = $1';
            const result = await client.query(sql,[id]);
            await client.end();
            return result.rows[0];
        }
        catch(error)
        {
           return console.log(error);
        }
        
    }

    createLocation = async (entity, idUsuario) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7)';
            await client.query(sql, [entity.id_location, entity.name, entity.full_address, entity.max_capacity, entity.latitude, entity.longitude, idUsuario]);
            await client.end();
            return "Creación exitosa";
        } catch (error) {
            console.error("Error de conexión:", error);
            return "Error de conexión";
        }
    }
    
    updateEventLocation = async (entity, idUsuario) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'UPDATE event_locations SET id_location = $2, name = $3, full_address = $4, max_capacity = $5, latitude = $6, longitude = $7, id_creator_user = $8 WHERE id = $1';
            await client.query(sql, [entity.id, entity.id_location, entity.name, entity.full_address, entity.max_capacity, entity.latitude, entity.longitude, idUsuario]);
            await client.end();
            return "Actualización exitosa";
        } catch (error) {
            console.error("Error de conexión:", error);
            return "Error de conexión";
        }
    }
    
    deleteEventLocation = async (id) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'DELETE FROM event_locations WHERE id = $1';
            await client.query(sql, [id]);
            await client.end();
            return "Eliminación exitosa";
        } catch (error) {
            console.error("Error de conexión:", error);
            return "Error de conexión";
        }
    }
}