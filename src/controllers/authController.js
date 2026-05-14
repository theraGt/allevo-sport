import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config.js';

console.log('=== AUTH CONTROLLER LOADED ===');

export const login = async (req, res) => {
    let client;
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        console.log('===== LOGIN FUNCTION START =====');
        
        const { email, password } = req.body;
        
        console.log('Email received:', email);
        console.log('Password received:', password);
        
        if (!email || !password) {
            console.log('MISSING EMAIL OR PASSWORD');
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.login_query, [email]);
        
        console.log('Email:', email);
        console.log('Rows found:', result.rows.length);
        if (result.rows.length > 0) {
            console.log('User found:', result.rows[0].email);
            console.log('Password hash:', result.rows[0].password_hash ? 'exists' : 'NULL');
        }

        if (result.rows.length === 0) return res.status(401).json({ message: 'Credenciales inválidas' });

        const user = result.rows[0];
        
        // Debug: ver valores exactos
        console.log('=== DEBUG LOGIN ===');
        console.log('Password received:', JSON.stringify(password));
        console.log('Password length:', password?.length);
        console.log('Hash from DB:', user.password_hash?.substring(0, 20) + '...');
        console.log('Hash length:', user.password_hash?.length);
        
        const valid = await bcrypt.compare(password, user.password_hash);
        console.log('bcrypt.compare result:', valid);
        
        if (!valid) {
            console.log('DEBUG - Manual string compare:', password === user.password_hash);
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, rol: user.tipo_usuario }, config.jwtSecret, { expiresIn: config.jwtExpires });
        res.json({ message: 'Login exitoso', token, user: { id: user.id, nombre: user.nombres, apellido: user.apellidos, email: user.email, rol: user.tipo_usuario } });
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

export const register = async (req, res) => {
    let client;
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const { nombre, apellido, email, password, rol } = req.body;
        if (!nombre || !email || !password) return res.status(400).json({ message: 'Nombre, email y contraseña son requeridos' });

        const pool = await getConnection();
        client = await pool.connect();

        const existing = await client.query(queries.get_usuario_by_email, [email]);
        if (existing.rows.length > 0) return res.status(409).json({ message: 'El email ya está registrado' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await client.query(queries.create_usuario, [nombre, apellido || '', email, hashedPassword, rol || 'usuario', true]);
        const token = jwt.sign({ id: result.rows[0].id, email, rol: rol || 'usuario' }, config.jwtSecret, { expiresIn: config.jwtExpires });

        res.status(201).json({ message: 'Usuario registrado correctamente', token, user: { id: result.rows[0].id, nombre, email, rol: rol || 'usuario' } });
    } catch (err) {
        console.error('Error en register:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};
