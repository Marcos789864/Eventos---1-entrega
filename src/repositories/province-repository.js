import DBConfig from './src/configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class ProvinceRepositorie{
   getAllAsync = async () =>
   {
    let returnArray = null;
    const client = new Client(DBConfig);
    try
    {
        await client.connect();
        const sql =  'SELECT * FROM provinces';
        const result = await client.query(sql);
        await client.end();
        returnArray = result.rows;
    }
    catch(error)
    {
        console.log(error);
    }
    return returnArray;
   }

    getByIdAsync = async (id) => {}
    createAsync = async (entity) => {}
    updateAsync = async (entity) => {}
    deleteByIdAsync = async (id) => {}
}