var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/isAuthenticated'),
    sequelize       = require('../models/mysql'),
    City            = sequelize.import('../models/mysql/City');

// Routes
router.route('/cities')
    .get(isAuthenticated, function(request, result) {

        City.findAll()
            .then(function(cities) {
                result.send({ data: cities });
            });
    });

router.route('/cities/:city_id')
    .get(isAuthenticated, function(request, result) {

        City.findById(request.params.city_id, {
                include: [
                    { all: true }
                ]
            })
            .then(function(city) {
                result.json({ data: city });
            });
    });

module.exports = router;