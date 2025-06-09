const BODY_PARSER = require('body-parser');
const EXPRESS = require('express');

const APP = EXPRESS();

APP.set('view engine', 'ejs');

APP.use(EXPRESS.static('public'));
APP.use(BODY_PARSER.urlencoded({ extended: false }));
APP.use(BODY_PARSER.json());

APP.listen(8080, (error) => {
    error ? console.log(error) : console.clear();
});

APP.get('/', (req, res) => {
    res.render('index');
});
