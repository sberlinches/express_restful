var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/isAuthenticated'),
    sequelize       = require('../models/mysql'),
    Country         = sequelize.import('../models/mysql/Country'),
    State           = sequelize.import('../models/mysql/State');

// Routes
router.route('/countries')
    .get(isAuthenticated, function(request, response) {

        Country.findAll()
            .then(function(countries) {
                response.status(200).json({ data: countries });
            });
    });

router.route('/countries/:country_id')
    .get(isAuthenticated, function(request, response) {

        var id = request.params.country_id;
        var options = {
            include: [{ all: true }]
        };

        Country.findById(id, options)
            .then(function(country) {
                response.status(200).json({ data: country });
            });
    });

router.route('/countries/:country_id/states')
    .get(isAuthenticated, function(request, response) {

        var options = {
            where: { countryId: request.params.country_id },
            include: [{ all: true }]
        };

        State.findAll(options)
            .then(function(states) {
                response.status(200).json({ data: states });
            });
    });

module.exports = router;