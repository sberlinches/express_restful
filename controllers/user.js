var express         = require('express'),
    router          = express.Router(),
    isAuthenticated = require('../middlewares/isAuthenticated'),
    sequelize       = require('../models/mysql'),
    User            = sequelize.import('../models/mysql/User');

/*
User.find({
    where: { email: 'admin@example.com' }
})
.then(function(user) {
    if(!user) {
        User.build({
            username: 'admin',
            email: 'admin@example.com',
            password: 'admin',
            firstName: 'Administrator'
        }).save();
    }
});
*/

// Routes
router.route('/users')
    .get(isAuthenticated, function(request, response) {

        var options = {
            where: { deletedAt: null },
            attributes: { exclude: ['password'] },
            include: [ { all: true } ]
        };

        User.findAll(options)
            .then(function(users) {
                response.status(200).json({ data: users });
            });
    })
    .post(isAuthenticated, function(request, response) {

        var values = request.body;
        var options = {
            isNewRecord:true
        };

        User.create(values, options)
            .then(function(user){
                response.status(201).json({ data: user });
            })
            .catch(function(error){
                response.status(400).json({ errors: error });
            });
    });

router.route('/users/:user_id')
    .get(isAuthenticated, function(request, response) {

        var id = request.params.user_id;
        var options = {
            attributes: { exclude: ['password'] },
            include: [ { all: true } ]
        };

        User.findById(id, options)
            .then(function(user) {
                response.status(200).json({ data: user });
            });
    })
    .put(isAuthenticated, function(request, response) {
        response.status(200).json({ data: 'put' }); // TODO
    })
    .patch(isAuthenticated, function(request, response) {

        var values = request.body;
        var options = {
            where: { id: request.params.user_id }
        };

        User.update(values, options)
            .then(function(user) {
                response.status(200).json({ data: user });
            })
            .catch(function(error){
                response.status(400).json({ errors: error });
            });
    })
    .delete(isAuthenticated, function(request, response) {

        var options = {
            where: { id: request.params.user_id }
        };

        User.destroy(options)
            .then(function(user) {
                response.status(200).json({ data: user });
            })
            .catch(function(error){
                response.status(400).json({ errors: error });
            });
    });

module.exports = router;