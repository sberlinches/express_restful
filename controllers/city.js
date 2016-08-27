var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/isAuthenticated'),
    sequelize       = require('../models/mysql'),
    City            = sequelize.import('../models/mysql/City');

// Routes
router.route('/cities')
    .get(isAuthenticated, function(request, response) {

        City.findAll()
            .then(function(cities) {
                response.status(200).json({ data: cities });
            });
    });

router.route('/cities/:city_id')
    .get(isAuthenticated, function(request, response) {

        var id = request.params.city_id;
        var options = {
            include: [{ all: true }]
        };

        City.findById(id, options)
            .then(function(city) {
                response.status(200).json({ data: city });
            });
    });

module.exports = router;