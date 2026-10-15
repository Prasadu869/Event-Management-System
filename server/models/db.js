import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: Number(process.env.DB_PORT) || 3306,
};

const dbName = process.env.DB_NAME || 'eventdb';

export async function initDatabase() {
  try {
    // 1. Connect without selecting a database first to ensure it exists
    const connection = await mysql.createConnection({
      ...dbConfig,
      multipleStatements: true,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);

    // 2. Run schema.sql to ensure tables and initial seed data exist
    const schemaPath = path.resolve(__dirname, '../schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await connection.query(schemaSql);
    }

    await connection.end();
    console.log(`✅ Database "${dbName}" verified and schema confirmed.`);
  } catch (error) {
    console.warn(`⚠️ Database initialization notice:`, error.message);
  }
}

const pool = mysql.createPool({
  ...dbConfig,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
