const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/crear', async (req, res) => {
    const { id, nombres, apellidos, email, telefono, codvuelo, foto } = req.body;

    if (!id || !nombres || !apellidos || !email || !telefono || !codvuelo || !foto) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const query = 'INSERT INTO pasajero (id, nombres, apellidos, email, telefono, codvuelo, foto) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [id, nombres, apellidos, email, telefono, codvuelo, foto];

    try {
        await connection.execute(query, values);
        res.status(201).json({ message: 'Pasajero creado exitosamente', nuevoPasajero: { id, nombres, apellidos, email, telefono, codvuelo, foto } });
    } catch (error) {
        console.error('Error al crear pasajero:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear pasajero.' });
    }
});

router.get('/consultar/:codvuelo', async (req, res) => {
    const codVuelo = req.params.codvuelo;

    try {
        const [result] = await connection.execute('SELECT * FROM pasajero WHERE codvuelo = ?', [codVuelo]);

        if (result.length > 0) {
            res.status(200).json({ pasajeros: result }); // Cambio aquí: "pasajero" a "pasajeros"
        } else {
            res.status(404).json({ message: 'Recurso no encontrado.' });
        }
    } catch (error) {
        console.error('Error al obtener pasajeros:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener pasajeros.' });
    }
});


router.delete('/eliminar/:id', async (req, res) => {
    const pasajeroId = req.params.id;

    try {
        const [result] = await connection.execute('DELETE FROM pasajero WHERE id = ?', [pasajeroId]);

        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Pasajero no encontrado.' });
        }
    } catch (error) {
        console.error('Error al eliminar pasajero:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar pasajero.' });
    }
});

module.exports = router;
