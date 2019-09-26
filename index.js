require('dotenv').config();
const config = require('config');
const server = require('./server')

//const port = process.env.PORT || 4000
const port = config.get('app.port');
server.listen(port, () => console.log(`API server started on ${port}`))
