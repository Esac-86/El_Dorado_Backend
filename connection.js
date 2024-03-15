const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'id21976331_root',
  password: 'Soydel2005!!XD',
  database: 'id21976331_el_dorado_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;
