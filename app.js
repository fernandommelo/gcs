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

APP.post('/avaliarCircunferencia', (req, res) => {
    let circunferencia = parseFloat(req.body.circunferencia);
    let sexo = req.body.sexo;

    let message;
    
    if(!circunferencia || !sexo) {
        message = 'Preencha todos os valores'
        return res.render('index', { message });   
    }

    if((sexo == 'masculino' && circunferencia > 94) || (sexo == 'feminino' && circunferencia > 80)) {
        message = 'Possui riscos! Consultar médico'
        return res.render('index', { message });   
    }

    message = 'Fora de risco!' 
    res.render('index', { message });
});