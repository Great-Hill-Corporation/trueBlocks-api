const AppDAO         = require('./dao')
const connection = new AppDAO('./database.sqlite3')


const sql = `
    CREATE TABLE IF NOT EXISTS block_address (
      block_number INTEGER NOT NULL,
      tx_index INTEGER,
      trace_id INTEGER,
      address VARCHAR(42) NOT NULL,
      reason VARCHAR(255) NOT NULL,
      proof VARCHAR(36)
      )`

connection.run(sql);
