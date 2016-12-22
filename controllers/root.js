"use strict";

var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/is-authenticated'),
    ResponseHelper  = require('../helpers/response.helper'),
    res;

router.route('/')
    .get(isAuthenticated, function(request, response) {
        var responseHelper = new ResponseHelper(request);
        res = responseHelper.getResponse('ok', 'Greetings');
        return response.status(res.status).json(res.body);
    });

// Test purposes
router.ws('/', isAuthenticated, function(ws, request) {
    ws.on('message', function(data) {
        console.log(data.toString());
    });
});

module.exports = router;