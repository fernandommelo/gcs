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
    res.render('index', {message : null});
});

APP.post('/calcularImc', (req, res) => {
    let peso = parseFloat(req.body.peso);
    let altura = parseFloat(req.body.altura);
    
    let message;
    
    if(!peso || !altura) {
        message = 'Indique um valor'
        return res.render('index', { message });   
    }

    if(peso < 1 || altura < 1) {
        message = 'Indique valores positivos!'
        return res.render('index', { message });   
    }

    imc = peso / (altura * altura);

    message = `Seu imc é ${imc.toFixed(2)}` 
    res.render('index', { message });
});
