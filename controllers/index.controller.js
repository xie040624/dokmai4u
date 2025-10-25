const path = require('path');

module.exports = {
    root: (req, res, next) => res.sendFile(path.join(__dirname, '../html', 'home.html')),
    team: (req, res, next) => res.sendFile(path.join(__dirname, '../html', 'team.html')),
    search: (req, res, next) => res.sendFile(path.join(__dirname, '../html', 'search.html')),
    login: (req, res, next) => res.sendFile(path.join(__dirname, '../html', 'admin-login.html'))
};