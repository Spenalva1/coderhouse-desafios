export default function isLoggedIn(req, res, next) {
    if (!req.session.name) {
        res.redirect('/login')
        return;
    }
    next();
}