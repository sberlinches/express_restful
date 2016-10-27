var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/is-authenticated'),
    sequelize       = require('../models/mysql'),
    ResponseHelper  = require('../helpers/response.helper'),
    User            = sequelize.import('../models/mysql/User'),
    res;

var fields = [
    'username',
    'email',
    'password',
    'firstName',
    'lastName',
    'countryId',
    'stateId',
    'cityId',
    'languageId',
    'birthAt'
];

router.route('/users')
    .get(isAuthenticated, function(request, response) {

        var responseHelper = new ResponseHelper('/users', 'get');
        var options = {
            attributes: { exclude: ['password'] },
            include: [{ all: true }]
        };

        User.findAll(options)
            .then(function(data) {
                res = responseHelper.getResponse('ok', data);
                return response.status(res.status).json(res.body);
            })
            .catch(function(error){
                res = responseHelper.getResponse('db_error', error);
                return response.status(res.status).json(res.body);
            });
    })
    .post(isAuthenticated, function(request, response) {

        var responseHelper = new ResponseHelper('/users', 'post');

        if(Object.keys(request.body).length) {

            var values = request.body;
            var options = {
                fields: fields
            };

            User.create(values, options)
                .then(function(data) {
                    res = responseHelper.getResponse('created', data);
                    return response.status(res.status).json(res.body);
                })
                .catch(function(error) {
                    res = responseHelper.getResponse('db_error', error);
                    return response.status(res.status).json(res.body);
                });
        } else {
            res = responseHelper.getResponse('data_not_provided');
            return response.status(res.status).json(res.body);
        }
    });

router.route('/users/:user_id')
    .get(isAuthenticated, function(request, response) {

        var userId = request.params.user_id;
        var responseHelper = new ResponseHelper('/users/' + userId, 'get');
        var options = {
            attributes: { exclude: ['password'] },
            include: [{ all: true }]
        };

        User.findById(userId, options)
            .then(function(data) {
                res = responseHelper.getResponse('ok', data);
                return response.status(res.status).json(res.body);
            })
            .catch(function(error) {
                res = responseHelper.getResponse('db_error', error);
                return response.status(res.status).json(res.body);
            });
    })
    /*.put(isAuthenticated, function(request, response) {

        if(Object.keys(request.body).length) {
            return response.status(200).json({ data: 'put' }); // TODO
        } else {
            return response.status(400).json({ error: 'Data not provided' }); // TODO
        }
    })*/
    .patch(isAuthenticated, function(request, response) {

        var userId = request.params.user_id;
        var responseHelper = new ResponseHelper('/users/' + userId, 'patch');

        if(Object.keys(request.body).length) {

            var values = request.body;
            var options = {
                where: { id: userId },
                fields: fields
            };

            User.update(values, options)
                .then(function(data) {
                    res = responseHelper.getResponse('ok', data);
                    return response.status(res.status).json(res.body);
                })
                .catch(function(error) {
                    res = responseHelper.getResponse('db_error', error);
                    return response.status(res.status).json(res.body);
                });
        } else {
            res = responseHelper.getResponse('data_not_provided');
            return response.status(res.status).json(res.body);
        }
    })
    .delete(isAuthenticated, function(request, response) {

        var userId = request.params.user_id;
        var responseHelper = new ResponseHelper('/users/' + userId, 'delete');
        var options = {
            where: { id: userId }
        };

        User.destroy(options)
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