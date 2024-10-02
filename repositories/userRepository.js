const mysql = require('mysql2');

// Configura tu conexión a MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nacional_motos',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

class UserRepository {

        // búsqueda de un usuario por cédula
        async findBycedula(cedula) {
            console.log(cedula)
            // Implementación que consulta en la base de datos
            // Retorna el usuario si existe, o null si no existe
           const[rows]= await promisePool.query('SELECT * FROM usuarios WHERE cedula = ?', [cedula]);
            return rows.length > 0 ? rows[0] : null;

        }
    
        // búsqueda de un usuario por nombre de usuario
        async findByusuario(usuario) {
          // Implementación que consulta en la base de datos
            // Retorna el usuario si existe, o null si no existe
            const[rows]= await promisePool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
            return rows.length > 0 ? rows[0] : null;

        }
    
    
    async createUser(user) {
        const { nombrecompleto, cedula, email, celular, usuario, contraseña } = user;
        try {
            const [result] = await promisePool.query(
                `INSERT INTO usuarios (nombrecompleto, cedula, email, celular, usuario, contraseña) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [nombrecompleto, cedula, email, celular, usuario, contraseña]
            );
            return { id: result.insertId, ...user };
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = new UserRepository();
