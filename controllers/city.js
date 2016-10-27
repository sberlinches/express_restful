var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/is-authenticated'),
    sequelize       = require('../models/mysql'),
    ResponseHelper  = require('../helpers/response.helper'),
    City            = sequelize.import('../models/mysql/City'),
    res;

router.route('/cities')
    .get(isAuthenticated, function(request, response) {

        var responseHelper = new ResponseHelper('/cities', 'get');

        City.findAll()
            .then(function(data) {
                res = responseHelper.getResponse('ok', data);
                return response.status(res.status).json(res.body);
            })
            .catch(function(error) {
                res = responseHelper.getResponse('db_error', error);
                return response.status(res.status).json(res.body);
            });
    });

router.route('/cities/:city_id')
    .get(isAuthenticated, function(request, response) {

        var cityId = request.params.city_id;
        var responseHelper = new ResponseHelper('/cities/' + cityId, 'get');

        City.findById(cityId)
            .then(function(data) {
                res = responseHelper.getResponse('ok', data);
                return response.status(res.status).json(res.body);
            })
            .catch(function(error) {
                res = responseHelper.getResponse('db_error', error);
                return response.status(res.status).json(res.body);
            });
    });

module.exports = router;