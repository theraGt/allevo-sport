import { config } from 'dotenv';

config();

export default {
    port: process.env.PORT || 3030,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpires: process.env.JWT_EXPIRES || '24h',
    appUrl: process.env.APP_URL || 'http://localhost:8100',
    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT) || 5432,
        ssl: process.env.DB_SSL === 'true',
    }
}
