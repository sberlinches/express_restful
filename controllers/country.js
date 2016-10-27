var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/is-authenticated'),
    sequelize       = require('../models/mysql'),
    ResponseHelper  = require('../helpers/response.helper'),
    Country         = sequelize.import('../models/mysql/Country'),
    State           = sequelize.import('../models/mysql/State'),
    res;

router.route('/countries')
    .get(isAuthenticated, function(request, response) {

        var responseHelper = new ResponseHelper(request);

        Country.findAll()
            .then(function(data) {
                res = responseHelper.getResponse('ok', data);
                return response.status(res.status).json(res.body);
            })
            .catch(function(error) {
                res = responseHelper.getResponse('db_error', error);
                return response.status(res.status).json(res.body);
            });
    });

router.route('/countries/:country_id')
    .get(isAuthenticated, function(request, response) {

        var countryId = request.params.country_id;
        var responseHelper = new ResponseHelper(request);

        Country.findById(countryId)
            .then(function(data) {
                res = responseHelper.getResponse('ok', data);
                return response.status(res.status).json(res.body);
            })
            .catch(function(error) {
                res = responseHelper.getResponse('db_error', error);
                return response.status(res.status).json(res.body);
            });
    });

router.route('/countries/:country_id/states')
    .get(isAuthenticated, function(request, response) {

        var countryId = request.params.country_id;
        var responseHelper = new ResponseHelper(request);
        var options = {
            where: { countryId: countryId }
        };

        State.findAll(options)
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