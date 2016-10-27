var express         = require('express'),
    router          = express.Router(),
    bcrypt          = require('bcrypt'),
    isAuthenticated = require('../middlewares/is-authenticated'),
    sequelize       = require('../models/mysql'),
    ResponseHelper  = require('../helpers/response.helper'),
    User            = sequelize.import('../models/mysql/User'),
    res;

router.route('/auth/login')
    .post(isAuthenticated, function(request, response) {

        var responseHelper = new ResponseHelper('/auth/login', 'post');

        if(!('username' in request.body) || !('password' in request.body)) {
            res = responseHelper.getResponse('insufficient_parameters');
            return response.status(res.status).json(res.body);
        }

        if(!request.body.username || !request.body.password) {
            res = responseHelper.getResponse('data_not_provided');
            return response.status(res.status).json(res.body);
        }

        var options = {
            where: { username: request.body.username }
        };

        User.findOne(options)
            .then(function(data) {

                if(!data) {
                    res = responseHelper.getResponse('bad_username');
                    return response.status(res.status).json(res.body);
                }

                var isValidPassword = bcrypt.compareSync(request.body.password, data.password);

                if(!isValidPassword) {
                    res = responseHelper.getResponse('bad_password');
                    return response.status(res.status).json(res.body);
                }

                delete data.dataValues.password;
                res = responseHelper.getResponse('ok', data);
                return response.status(res.status).json(res.body);
            })
            .catch(function(error) {
                res = responseHelper.getResponse('db_error', error);
                return response.status(res.status).json(res.body);
            });
    });

module.exports = router;