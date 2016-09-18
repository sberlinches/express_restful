var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/is-authenticated'),
    sequelize       = require('../models/mysql'),
    City            = sequelize.import('../models/mysql/City');

router.route('/cities')
    .get(isAuthenticated, function(request, response) {

        City.findAll()
            .then(function(data) {
                response.status(200).json({ data: data });
            })
            .catch(function(error) {
                response.status(400).json({ error: error });
            });
    });

router.route('/cities/:city_id')
    .get(isAuthenticated, function(request, response) {

        var id = request.params.city_id;

        City.findById(id)
            .then(function(data) {
                response.status(200).json({ data: data });
            })
            .catch(function(error) {
                response.status(400).json({ error: error });
            });
    });

module.exports = router;