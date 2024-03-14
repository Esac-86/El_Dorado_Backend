const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/', async (req, res) => {
  try {
    const [results] = await connection.execute('SELECT * FROM destino');
    res.status(200).json({ message: 'Consulta exitosa', destinos: results });
  } catch (error) {
    console.error('Error al obtener destinos:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

module.exports = router;
