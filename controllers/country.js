var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/isAuthenticated'),
    sequelize       = require('../models/mysql'),
    Country         = sequelize.import('../models/mysql/Country'),
    State           = sequelize.import('../models/mysql/State');

// Routes
router.route('/countries')
    .get(isAuthenticated, function(request, result) {

        Country.findAll()
            .then(function(countries) {
                result.send({ data: countries });
            });
    });

router.route('/countries/:country_id')
    .get(isAuthenticated, function(request, result) {

        Country.findById(request.params.country_id, {
                include: [
                    { all: true }
                ]
            })
            .then(function(country) {
                result.json({ data: country });
            });
    });

router.route('/countries/:country_id/states')
    .get(isAuthenticated, function(request, result) {

        State.findAll({
                where: { countryId: request.params.country_id },
                include: [
                    { all: true }
                ]
            })
            .then(function(states) {
                result.json({ data: states });
            });
    });

module.exports = router;