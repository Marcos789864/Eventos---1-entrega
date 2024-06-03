import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class events_locations
{

    getEventLocationsFromIdLocation = async (id) =>    
    {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_locations where id_locations = $1';
            const result = await client.query(sql,[id]);
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