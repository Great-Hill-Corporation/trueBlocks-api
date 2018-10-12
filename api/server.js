const express        = require('express');
const AppDAO         = require('./dao')
const bodyParser     = require('body-parser');
const app            = express();

const connection = new AppDAO('./database.sqlite3');
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.text());

require('./routes')(app, connection);

app.listen(port, () => {
    console.log('We are live on ' + port);
});
