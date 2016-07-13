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

module.exports = router;