import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class Events
{
    buscarEventoNombre = async (name) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'Select * FROM events WHERE name = $1';
    
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

    buscarEventoCategoria = async (category) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'Select * FROM event_categories WHERE name = $1';
    
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

    buscarEventoFecha = async (fecha) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'Select * FROM events WHERE start_date = $1';
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
//fijarse de hacer los innerjoin
    buscarEventoTag = async (tag) =>
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'Select * FROM events WHERE tags = $1';
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

