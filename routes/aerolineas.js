const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/', async (req, res) => {
  try {
    const [results] = await connection.execute('SELECT * FROM aerolinea');
    res.status(200).json({ message: 'Consulta exitosa', aerolineas: results });
  } catch (error) {
    console.error('Error al obtener aerolíneas:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

module.exports = router;
