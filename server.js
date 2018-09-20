const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 8080;

app.use(bodyParser.urlencoded({ extended: true}));

app.listen(port, () => {
    console.log('Listening on port ' + port);
});
