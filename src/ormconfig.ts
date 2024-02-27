import 'reflect-metadata'
import { DataSource } from "typeorm"

const DatabaseSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: true,
    entities: ['src/entity/*.ts'],
    migrations: ['src/migration/*.ts'],
    migrationsTableName: "migration_table",
})

export default DatabaseSource