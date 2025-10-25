const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/logout', (req, res) => {
    req.session?.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});


module.exports = router;
