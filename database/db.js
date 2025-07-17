'server-only'

import sql from 'mssql';

// Configuración de la base de datos SQL Server
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        serverName: process.env.DB_HOST
    }
};

class Database {
    constructor() {
        this.pool = null;
    }

    async getConnection() {
        if (!this.pool || !this.pool.connected) {
            try {
                this.pool = await sql.connect(dbConfig);
                console.log("✅ Conexión exitosa a la base de datos");
            } catch (error) {
                console.error('💥 Error al conectar con la base de datos:', error);
                throw error;
            }
        }
        return this.pool;
    }

    async closeConnection() {
        if (this.pool) {
            await this.pool.close();
            this.pool = null;
            console.log("❌ Conexión a la base de datos cerrada");
        }
    }
}

// Exportamos una única instancia para usarla en toda la aplicación
const dbInstance = new Database();
export default dbInstance;