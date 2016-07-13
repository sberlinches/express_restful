var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/isAuthenticated'),
    sequelize       = require('../models/mysql'),
    Country         = sequelize.import('../models/mysql/Country');

// Routes
router.route('/countries')
    .get(isAuthenticated, function(request, result) {

        Country.findAll()
            .then(function(countries) {
                result.send({ data: countries });
            });
    });

module.exports = router;