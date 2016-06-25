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
            email: 'admin@example.com',
            password: 'admin',
            firstName: 'Administrator'
        }).save();
    }
});
*/

// Routes
router.route('/users')
    .get(isAuthenticated, function(request, result) {

        User.findAll({
                where: { deletedAt: null }
            })
            .then(function(users) {
                result.send({ data: users });
            });
    })
    .post(isAuthenticated, function(request, result) {

        var user = {
            firstName: request.query.first_name,
            email: request.query.email
        };

        User.create(user, {isNewRecord:true})
            .then(function(user){
                result.json({ data: user });
            })
            .catch(function(error){
                result.json({ errors: error });
            });
    });

router.route('/users/:user_id')
    .get(isAuthenticated, function(request, result) {

        User.findById(request.params.user_id)
            .then(function(user) {
                result.json({ data: user });
            });
    })
    .put(isAuthenticated, function(request, result) {
        result.send({ data: 'put' }); // TODO
    })
    .patch(isAuthenticated, function(request, result) {

        User.update({
                firstName: 'changed'
            },
            {
                where: { id: request.params.user_id }
            })
            .then(function () {
                result.json({ data: 'updated partially user id: ' + request.params.user_id });
            })
            .catch(function(error){
                result.json({ errors: error });
            });
    })
    .delete(isAuthenticated, function(request, result) {
        User.destroy({
                where: {
                    id: request.params.user_id
                }
            })
            .then(function () {
                result.json({ data: 'Deleted user id: ' + request.params.user_id });
            })
            .catch(function(error){
                result.json({ errors: error });
            });
    });

module.exports = router;