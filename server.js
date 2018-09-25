const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.path}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('error');
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.get('/', (req, res) => {
    res.render('welcome.hbs', {
        title: 'Welcome page',
        pageTitle: 'Home page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome peasants'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About page',
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to fulfill this request'
    });
});
app.listen(3000);