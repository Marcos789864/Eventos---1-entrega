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

    getById = async (id,idUser) => 
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql =  'SELECT * FROM event_locations where id = $1 AND id_creator_user = $2 ';
            const result = await client.query(sql,[id,idUser]);
            await client.end();
            return result.rows;
        }
        catch(error)
        {
           return console.log(error);
        }
        
    }

    

}