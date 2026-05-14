import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT) || 5432,
  ssl: process.env.DB_SSL === 'true',
});

const updatePassword = async () => {
  try {
    const password = 'admin123';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    console.log('Nuevo hash:', hash);
    
    const result = await pool.query(
      `UPDATE allevo.usuarios SET password_hash = $1 WHERE email = $2 RETURNING id, email`,
      [hash, 'admin@allevo.com']
    );
    
    console.log('Usuario actualizado:', result.rows);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

updatePassword();