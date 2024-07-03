import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const {Client, Pool } = pkg;

export default class events_categories
{

    getAllCateogories = async() =>{
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_categories';
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
    getCateogoryById = async(id) =>{
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_categories WHERE id = $1';
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
    createCategory = async(name,display_order) =>{
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'INSERT INTO event_categories(name,display_order) VALUES($1,$2)';
            const result = await client.query(sql,[name,display_order]);
            if (result.rowCount > 0) {
                success = true;
            }
            await client.end();
        } catch (error) {
            console.log(error);
        }
        return result;
    }
    //FALTA EDITAR CATEGORIA
    deleteCategory = async(id) =>{
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = 'DELETE FROM event_categories WHERE id = $1';
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