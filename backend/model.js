const sql = require('mssql')

// Config to connec to the database.
const config = {
  user: 'admin',
  password: 'mortguage',
  server: 'mortguage.croikdwcmiqp.us-east-2.rds.amazonaws.com', // You can use 'localhost\\instance' to connect to named instance
  database: 'testing',
  options: {
    "enableArithAbort": true
  }
};

const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool => {
  console.log('Connected to MSSQL')
  return pool
})
.catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}
