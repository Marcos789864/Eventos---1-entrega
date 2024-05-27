import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class UserRepository
{
    getUserByUsername = async (username, password) => 
    {
        let returnArray = null;
        const client = new Client(DBConfig);
        try
        {
            await client.connect();
            const sql =  'SELECT * FROM users WHERE username = $1 AND password = $2';
            const result = await client.query(sql,[username. password]);
            await client.end();
            returnArray = result.rows;
        }
        catch(error)
        {
            console.log(error);
        }
        return returnArray;
    };
      
    createUser = async (user) => {
        let success = false;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)';
            const result = await client.query(sql, [first_name, last_name, username, password]);
            await client.end();
            success = true; 
        }
        catch(error)
        {
            console.log(error);
        }
        return success;
      };
}