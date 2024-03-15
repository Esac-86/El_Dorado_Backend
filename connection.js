const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'monorail.proxy.rlwy.net',
  user: 'root',
  password: 'XfrfoAMxQGiCYmVGNKBUKsaUZzuBUSrk',
  database: 'railway',
  port: 23707, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;
