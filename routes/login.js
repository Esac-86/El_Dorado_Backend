const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Por favor, proporciona un nombre de usuario y una contraseña.' });
    }

    try {
        // Verificar las credenciales en la base de datos
        const query = 'SELECT * FROM usuario WHERE username = ? AND password = ?';
        const [results] = await connection.execute(query, [username, password]);

        if (results.length > 0) {
            // Credenciales válidas
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            // Credenciales incorrectas
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error de inicio de sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


module.exports = router;
