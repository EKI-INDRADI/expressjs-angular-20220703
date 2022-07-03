let express = require('express');
let router = express.Router();
let controller = require('../controller/auth.controller')

router.get('/', function (req, res) {
    console.log('AUTH SERVICES FORSTOK V1 IS RUNNING!');
    res.json({ statusCode: 1, message: 'AUTH SERVICES FORSTOK V1 IS RUNNING!' });
});

router.post('/get-token', controller.getToken);

module.exports = router;
