import LogHelper from './../helpers/log-helper.js'


export default class ProvinceRepository 
{ 

    getByIdAsync = async (id) => {

        let returnEntity = null;

        const client = new Client(DBConfig);

        try {

            // Obtengo el Cliente y me conecto a la base de datos.

            client = await client.connect();

            const sql = `SELECT * FROM provinces WHERE id=$1`;

            const values = [id];

            const result = await client.query(sql, values);

            if (result.rows.length > 0){

                returnEntity = result.rows[0];

            }

        } catch (error) {

            LogHelper.logError(error); // Esto funciona si hicieron la clase!

        } finally {

            await client.end();

        }
        return returnEntity;
        }
}