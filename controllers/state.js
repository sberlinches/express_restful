var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/is-authenticated'),
    sequelize       = require('../models/mysql'),
    ResponseHelper  = require('../helpers/response.helper'),
    State           = sequelize.import('../models/mysql/State'),
    City            = sequelize.import('../models/mysql/City'),
    res;

router.route('/states')
    .get(isAuthenticated, function(request, response) {

        var responseHelper = new ResponseHelper(request);

        State.findAll()
            .then(function(data) {
                res = responseHelper.getResponse('ok', data);
                return response.status(res.status).json(res.body);
            })
            .catch(function(error) {
                res = responseHelper.getResponse('db_error', error);
                return response.status(res.status).json(res.body);
            });
    });

router.route('/states/:state_id')
    .get(isAuthenticated, function(request, response) {

        var stateId = request.params.state_id;
        var responseHelper = new ResponseHelper(request);

        State.findById(stateId)
            .then(function(data) {
                res = responseHelper.getResponse('ok', data);
                return response.status(res.status).json(res.body);
            })
            .catch(function(error) {
                res = responseHelper.getResponse('db_error', error);
                return response.status(res.status).json(res.body);
            });
    });

router.route('/states/:state_id/cities')
    .get(isAuthenticated, function(request, response) {

        var stateId = request.params.state_id;
        var responseHelper = new ResponseHelper(request);
        var options = {
            where: { stateId: stateId }
        };

        City.findAll(options)
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