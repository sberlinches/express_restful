var express = require('express'),
    router  = express.Router();

// Middleware
/*router.use(function(request, result, next) {
    console.log('Index middleware');
    next();
});*/

// Root
router.get('/', function(request, result) {
    result.send({ message: 'Greetings' });
});

// Routes
router.use(require('./user'));

// All controllers are prefixed with '/api'
router.use('/api', router);

module.exports = router;