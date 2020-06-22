const fs = require('fs');
const jwt = require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs');
const { promisify } = require('util');

const catchAsync = require('./../utils/catchAsync');

const { poolPromise, sql } = require('./../model');

const JWT_EXPIRES_IN = '1d';
const JWT_SECRET = 'my-ultra-secure-and-ultra-long-secret'

const queries = JSON.parse(
  fs.readFileSync(`${__dirname}/../queries/queries.json`)
);

const signToken = (id, fname, lname, email)  => {
  return jwt.sign({id, fname, lname, email}, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

const  findBrokerByEmail  = async (email, cb) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('email', sql.VarChar, email)
    .query(queries.getBroker);
    cb(null, result.recordset[0]);
  } catch (error) {
    cb(error, null)
  }
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return  res.status(401).send('You are not logged in! Please log in to get access!');

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

  // 3) Check if user still exists
  findBrokerByEmail(decoded.email, (err, broker) => {
    if (err) return  res.status(500).send('Server error!');
    if (!broker) return res.status(401).send('The user belonging to this token does no longer exist');

    // GRANT ACCESS TO PROTECTED ROUTE
    req.body.brokerId = broker.id;
    next();
  })
});

const addBroker = async (fname, lname, email, password, cb) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('fname', sql.VarChar, fname)
    .input('lname', sql.VarChar, lname)
    .input('email', sql.VarChar , email)
    .input('password', sql.VarChar, bcrypt.hashSync(password))
    .input('createdAt', sql.DateTime, new Date())
    .query(queries.addBroker);

    cb(null, result.recordset[0]);
  } catch (error) {
    cb(error, null);
  }
};

const addClient = async (fname, lname, amount, rate, amortization, brokerId, cb) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('fname', sql.VarChar, fname)
    .input('lname', sql.VarChar, lname)
    .input('createdAt', sql.DateTime, new Date())
    .input('amount', sql.Money, amount)
    .input('rate', sql.Decimal, rate)
    .input('amortization', sql.Int, amortization)
    .input('brokerId', sql.Int, brokerId)
    .query(queries.addClient);

    cb(null, result.recordset[0]);
  } catch (error) {
    cb(error, null);
  }
};

const buildSearchQuery = (fname, lname) => {
  let q = `SELECT *  FROM [dbo].[client] WHERE brokerId = @brokerId`
  if(fname) { q = q + '  AND fname = @fname';}
  if(lname) { q = q + '  AND lname = @lname';}
  return q;
}

const getBrokerClients  = async (brokerId, fname, lname, cb) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('brokerId', sql.Int, brokerId)
    .input('fname', sql.VarChar, fname)
    .input('lname', sql.VarChar, lname)
    .query(buildSearchQuery(fname, lname));

    cb(null, result.recordset);
  } catch (error) {
    cb(error, null);
  }
};

const getSingleClient = async (clientId, brokerId, cb) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('id', sql.Int, clientId)
    .input('brokerId', sql.Int, brokerId)
    .query(queries.getSingleClient);

    cb(null, result.recordset[0]);
  } catch (error) {
    cb(error, null);
  }
};

const deleteSingleClient = async (clientId, brokerId, cb) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('id', sql.Int, clientId)
    .input('brokerId', sql.Int, brokerId)
    .query(queries.deleteClient);

    cb(null, result.recordset[0]);
  } catch (error) {
    cb(error, null);
  }
};

const updateClientByClientId = async (clientId, fname, lname, createdAt, amount, rate, amortization, brokerId, cb) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('id', sql.VarChar, clientId)
    .input('fname', sql.VarChar, fname)
    .input('lname', sql.VarChar, lname)
    .input('createdAt', sql.DateTime, createdAt)
    .input('updatedAt', sql.DateTime, new Date())
    .input('amount', sql.Money, amount)
    .input('rate', sql.Decimal, rate)
    .input('amortization', sql.Int, amortization)
    .input('brokerId', sql.Int, brokerId)
    .query(queries.updateClient);

    cb(null, result.recordset[0]);
  } catch (error) {
    cb(error, null);
  }
};

exports.getClients = (req, res, next) => {
  const { brokerId } = req.body;
  const { fname, lname } = req.query;

  getBrokerClients(brokerId, fname, lname, (err, list) => {
    if (err) return  res.status(500).send('Server error!');
    res.status(200).send({
      clients: list
    })
  })
};

exports.addClients = (req, res, next) => {
  const { fname, lname, amount, rate, amortization, brokerId } = req.body;
  addClient(fname, lname, amount, rate, amortization, brokerId, (err, client) => {
    if (err) return  res.status(500).send('Server error!');
    res.status(200).send(client);
  })
};

exports.getClientByClientId = (req, res, next) => {
  const { clientId } = req.params;
  const { brokerId } = req.body;
  getSingleClient(clientId, brokerId, (err, client) => {
    if (err) return  res.status(500).send('Server error!');
    res.status(200).send(client)
  })
};

exports.updateClient = (req, res, next) => {
  const { clientId } = req.params;
  const { fname, lname, createdAt, amount, rate, amortization, brokerId } = req.body;

  updateClientByClientId(clientId, fname, lname, createdAt, amount, rate, amortization, brokerId, (err, client) => {
    if (err) return  res.status(500).send('Server error!');
    res.status(200).send(client)
  })
};

exports.deleteClient = (req, res, next) => {
  const { clientId } = req.params;
  const { brokerId } = req.body;
  deleteSingleClient(clientId, brokerId, (err, client) => {
    if (err) return  res.status(500).send('Server error!');
    res.status(200).send('Deleted successfully!')
  })
};

exports.addBrokers = (req, res) => {
  const { fname, lname, email, password } = req.body;

  findBrokerByEmail(email, (err, user) => {
    if (err) return  res.status(500).send('Server error!');
    if (user) return res.status(400).send('A user with this email already exist');
    addBroker(fname, lname, email, password, (err, broker) => {
      if (err) return  res.status(500).send('Server error!');
      const  accessToken  =  signToken(broker.id, broker.fname, broker.lname, broker.email);
      res.status(200).send({
        "user":  {
          "fname": fname,
          "lname": lname,
          "email": email,
        },
        "access_token":  accessToken,
        "expires_in":  JWT_EXPIRES_IN
      });
    })
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  findBrokerByEmail(email, (err, user) => {
    if (err) return  res.status(500).send('Server error!');
    if (!user) return  res.status(404).send('User not found!');
    const  result  =  bcrypt.compareSync(password, user.password);
    if(!result) return  res.status(401).send('Password not valid!');

    const  accessToken  =  signToken(user.id, user.fname, user.lname, user.email);

    res.status(200).send({
      "user":  {
        "id": user.id,
        "fname": user.fname,
        "lname": user.lname,
        "email": user.email,
      },
      "access_token":  accessToken,
      "expires_in":  JWT_EXPIRES_IN
    });
  });

};

exports.logout = (req, res, next) => {};
