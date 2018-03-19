const express       = require('express');
const hbs           = require('hbs');
const fs            = require('fs');

const port          = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use(function (req, res, next){
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err){
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use(function (req, res, next){
//     res.render('maintenance');
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get("/", function(req, res){
    res.render( 'home', {
        pageTitle: 'Home Page',
        name: 'Andrew',
        likes: [
            'Biking',
            'Cities'
        ]
       // currentYear: new Date().getFullYear()
    });
});

app.get("/about", function(req, res){
    res.render('about', {
        pageTitle: 'About Page'
       // currentYear: new Date().getFullYear()
    });
});

app.get("/bad", function(req, res){
    res.send({
        error: 'Page not found.',
    });
});


app.listen(port, () => console.log(`Server is up on port ${port}`));