function isAuthenticated (request, response, next) {

    if (1 === 1) {
        console.log('You are in!');
        next();
    } else {
        response.status(403).send('Forbidden');
    }
}

module.exports = isAuthenticated;