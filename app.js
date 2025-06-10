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
    res.render('index', {message-imc : null, message-circunferencia : null});

});

APP.post('/calcularImc', (req, res) => {
    let peso = parseFloat(req.body.peso);
    let altura = parseFloat(req.body.altura);
    
    let message-imc;
    
    if(!peso || !altura) {
      message-imc = 'Indique um valor'
        return res.render('index', { message-imc });   
    }

    if(peso < 1 || altura < 1) {
        message-imc = 'Indique valores positivos!'
        return res.render('index', { message-imc });   
    }

    imc = peso / (altura * altura);

    message-imc = `Seu imc é ${imc.toFixed(2)}` 
    res.render('index', { message-imc });

});

APP.post('/avaliarCircunferencia', (req, res) => {
    let circunferencia = parseFloat(req.body.circunferencia);
    let sexo = req.body.sexo;

    let message-circunferencia;
    
    if(!circunferencia || !sexo) {
        message-circunferencia = 'Preencha todos os valores'
        return res.render('index', { message-circunferencia });   
    }

    if((sexo == 'masculino' && circunferencia > 94) || (sexo == 'feminino' && circunferencia > 80)) {
        message-circunferencia = 'Possui riscos! Consultar médico'
        return res.render('index', { message-circunferencia });   
    }

    message = 'Fora de risco!' 
    res.render('index', { message-circunferencia});
});