import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class Locations
{
    getLocationsByIdProvince = async (id) =>
    {
        let Location = null;
        const client = new Client(DBConfig);
    try
    {
        await client.connect();
        const sql =  'SELECT * FROM locations WHERE locations.id_province = $1';
        const result = await client.query(sql,[id]);
        await client.end();
        Location = result.rows;
    }
    catch(error)
    {
        console.log(error);
    }
    return Location;
    }

    getAllLocations = async() =>{
        let ArrayLocation = null;
        const client = new Client(DBConfig);
    try
    {
        await client.connect();
        const sql =  'SELECT * FROM locations';
        const result = await client.query(sql);
        await client.end();
        ArrayLocation = result.rows;
    }
    catch(error)
    {
        console.log(error);
    }
    return ArrayLocation;
    }
}