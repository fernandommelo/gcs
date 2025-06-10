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
    res.render('index', {message_imc : null, message_circunferencia : null});

});

APP.post('/calcularImc', (req, res) => {
    let peso = parseFloat(req.body.peso);
    let altura = parseFloat(req.body.altura);
    
    let message_imc;
    
    if(!peso || !altura) {
      message_imc = 'Indique um valor'
        return res.render('index', { message_imc, message_circunferencia : null });   
    }

    if(peso < 1 || altura < 1) {
        message_imc = 'Indique valores positivos!'
        return res.render('index', { message_imc, message_circunferencia : null });   
    }

    imc = peso / (altura * altura);

    message_imc = `Seu imc é ${imc.toFixed(2)}` 
    res.render('index', { message_imc, message_circunferencia : null });

});

APP.post('/avaliarCircunferencia', (req, res) => {
    let circunferencia = parseFloat(req.body.circunferencia);
    let sexo = req.body.sexo;

    let message_circunferencia;
    
    if(!circunferencia || !sexo) {
        message_circunferencia = 'Preencha todos os valores'
        return res.render('index', { message_circunferencia,message_imc : null });   
    }

    if((sexo == 'masculino' && circunferencia > 94) || (sexo == 'feminino' && circunferencia > 80)) {
        message_circunferencia = 'Possui riscos! Consultar médico'
        return res.render('index', { message_circunferencia, message_imc : null });   
    }

    message = 'Fora de risco!' 
    res.render('index', { message_circunferencia, message_imc : null});
});