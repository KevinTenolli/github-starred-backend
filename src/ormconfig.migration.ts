import 'reflect-metadata'
import { DataSource } from "typeorm"

const MigrationSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST_1,
    port: parseInt(process.env.POSTGRES_PORT_1 || '5432'),
    username: process.env.POSTGRES_USER_1,
    password: process.env.POSTGRES_PASSWORD_1,
    database: process.env.POSTGRES_DB_1,
    synchronize: false,
    logging: true,
    entities: ['src/entity/*.ts'],
    migrations: ['src/migration/*.ts'],
    migrationsTableName: "migration_table",
})

export default MigrationSource