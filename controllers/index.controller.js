const path = require('path');

module.exports = {
    home: (req, res, next) => {
        res.sendFile(path.join(__dirname, './../html', 'home.html'));
    },
    login: (req, res, next) => {
        res.sendFile(path.join(__dirname, './../html', 'home.html'));
    }
};