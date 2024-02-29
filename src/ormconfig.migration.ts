import 'reflect-metadata'
import { DataSource } from "typeorm"
import dotenv from "dotenv"
dotenv.config()

const MigrationSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST_1,
    port: parseInt(process.env.POSTGRES_PORT_1 || '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: true,
    entities: ['src/entity/*.ts'],
    migrations: ['src/migration/*.ts'],
    migrationsTableName: "migration_table",
})

export default MigrationSource