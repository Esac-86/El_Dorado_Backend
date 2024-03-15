const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/crear', async (req, res) => {
    const { id, nombres, apellidos, email, telefono, codvuelo } = req.body;

    if (!id || !nombres || !apellidos || !email || !telefono || !codvuelo) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const [rows] = await connection.execute('SELECT COUNT(*) AS count FROM pasajero WHERE id = ?', [id]);
        const count = rows[0].count;

        if (count > 0) {
            return res.status(400).json({ message: 'La ID del pasajero ya está en uso.' });
        }

        const insertQuery = 'INSERT INTO pasajero (id, nombres, apellidos, email, telefono, codvuelo) VALUES (?, ?, ?, ?, ?, ?)';
        const insertValues = [id, nombres, apellidos, email, telefono, codvuelo];

        await connection.execute(insertQuery, insertValues);
        res.status(201).json({ message: 'Pasajero creado exitosamente', nuevoPasajero: { id, nombres, apellidos, email, telefono, codvuelo } });
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
            res.status(200).json({ pasajeros: result });
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

router.delete('/eliminarPorCodigoVuelo/:codvuelo', async (req, res) => {
    const codigoVuelo = req.params.codvuelo;

    try {
        const [result] = await connection.execute('DELETE FROM pasajero WHERE codvuelo = ?', [codigoVuelo]);

        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'No se encontraron pasajeros para el código de vuelo especificado.' });
        }
    } catch (error) {
        console.error('Error al eliminar pasajeros por código de vuelo:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar pasajeros por código de vuelo.' });
    }
});

module.exports = router;
