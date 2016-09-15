var express = require('express'),
    router  = express.Router();

router.get('/', function(request, result) {
    result.send({ message: 'Greetings' });
});

router.use(require('./user'));
router.use(require('./city'));
router.use(require('./state'));
router.use(require('./country'));
router.use('/api', router);

module.exports = router;