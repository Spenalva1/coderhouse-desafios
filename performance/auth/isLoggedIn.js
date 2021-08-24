module.exports = function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/login')
        return;
    }
    next();
}