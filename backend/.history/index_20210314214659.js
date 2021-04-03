require('rootpath')();


var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '100mb' }));


// A sample route
app.get('/', (req, res) => res.send('Hello World!'))


app.listen('4000', function () {
    console.log('running on 4000...');
});