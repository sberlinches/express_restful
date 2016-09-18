function isAuthenticated(request, response, next) {

    if (1 === 1) {
        console.log('Allowed');
        next();
    } else {
        response.status(403).json({ error: 'Forbidden' });
    }
}

module.exports = isAuthenticated;