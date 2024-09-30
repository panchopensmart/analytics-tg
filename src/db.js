const { Pool } = require('pg');

const pool = new Pool({
    user: 'tgmetric',
    host: '79.174.88.144',
    database: 'tgmetric',
    password: 'Panches2002@',
    port: 19567,
});

module.exports = pool;