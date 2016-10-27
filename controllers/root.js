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

module.exports = router;