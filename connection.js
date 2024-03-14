const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'bv1arrxtrcp2ih1y1ios-mysql.services.clever-cloud.com',
  user: 'ucespbzk59n6rncp',
  password: '3vwZkHNDr8jr3fFTJwpt',
  database: 'bv1arrxtrcp2ih1y1ios',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;