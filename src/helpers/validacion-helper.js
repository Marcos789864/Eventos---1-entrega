import 'dotenv/config';
import fs from 'fs';

class LogHelper {

    constructor() {

        this.filePath            = process.env.LOG_FILE_PATH;

        this.fileName            = process.env.LOG_FILE_NAME;

        this.logToFileEnabled    = process.env.LOG_TO_FILE_ENABLED.toLowerCase() === 'true';

        this.logToConsoleEnabled = process.env.LOG_TO_CONSOLE_ENABLED.toLowerCase() === 'true';

        if (!fs.existsSync(this.filePath)) {
            fs.mkdirSync(this.filePath, { recursive: true });

    }
    /**

     * Este método almacena en un archivo de texto y/o por muestra consola información del Error.

     * @param {*} errorObject

     */

   function logError(errorObject)  {
        if (this.logToFileEnabled) {
            const timestamp = new Date().toISOString();
            const logMessage = `[${timestamp}] ${errorObject.stack}\n`;

            const logFilePath = `${this.filePath}/${this.fileName}`;
            fs.appendFile(logFilePath, logMessage, (err) => {
                if (err) {
                    console.error(`Error al escribir en el archivo de registro: ${err}`);
                }
            });
        }

        if (this.logToConsoleEnabled) {
            console.error(errorObject);
        }
    }}
}


export default new LogHelper();
























