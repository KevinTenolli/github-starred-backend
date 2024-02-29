import 'reflect-metadata'
import { DataSource } from "typeorm"

const MigrationSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST_1,
    port: parseInt(  '5452'),
    username: 'testUser',
    password: '1234',
    database: 'testDb',
    synchronize: false,
    logging: true,
    entities: ['src/entity/*.ts'],
    migrations: ['src/migration/*.ts'],
    migrationsTableName: "migration_table",
})

export default MigrationSource