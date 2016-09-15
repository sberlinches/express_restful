var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/isAuthenticated'),
    sequelize       = require('../models/mysql'),
    Country         = sequelize.import('../models/mysql/Country'),
    State           = sequelize.import('../models/mysql/State');

router.route('/countries')
    .get(isAuthenticated, function(request, response) {

        Country.findAll()
            .then(function(data) {
                response.status(200).json({ data: data });
            })
            .catch(function(error) {
                response.status(400).json({ errors: error });
            });
    });

router.route('/countries/:country_id')
    .get(isAuthenticated, function(request, response) {

        var id = request.params.country_id;

        Country.findById(id)
            .then(function(data) {
                response.status(200).json({ data: data });
            })
            .catch(function(error) {
                response.status(400).json({ errors: error });
            });
    });

router.route('/countries/:country_id/states')
    .get(isAuthenticated, function(request, response) {

        var options = {
            where: { countryId: request.params.country_id }
        };

        State.findAll(options)
            .then(function(data) {
                response.status(200).json({ data: data });
            })
            .catch(function(error) {
                response.status(400).json({ errors: error });
            });
    });

module.exports = router;