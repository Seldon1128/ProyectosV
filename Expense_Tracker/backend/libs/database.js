import pg from 'pg';
import dotenv from "dotenv";

dotenv.config();

const {Pool} = pg;

export const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'expense_tracker'
});

export default pool;
