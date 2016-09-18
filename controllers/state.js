var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/is-authenticated'),
    sequelize       = require('../models/mysql'),
    State           = sequelize.import('../models/mysql/State'),
    City            = sequelize.import('../models/mysql/City');

router.route('/states')
    .get(isAuthenticated, function(request, response) {

        State.findAll()
            .then(function(states) {
                response.status(200).json({ data: states });
            })
            .catch(function(error) {
                response.status(400).json({ error: error });
            });
    });

router.route('/states/:state_id')
    .get(isAuthenticated, function(request, response) {

        var id = request.params.state_id;

        State.findById(id)
            .then(function(data) {
                response.status(200).json({ data: data });
            })
            .catch(function(error) {
                response.status(400).json({ error: error });
            });
    });

router.route('/states/:state_id/cities')
    .get(isAuthenticated, function(request, response) {

        var options = {
            where: { stateId: request.params.state_id }
        };

        City.findAll(options)
            .then(function(data) {
                response.status(200).json({ data: data });
            })
            .catch(function(error) {
                response.status(400).json({ error: error });
            });
    });

module.exports = router;