module.exports = {
    get: (req, res, next) => {
        res.send(`get`)
    },
    post: (req, res, next) => {
        res.send(`post`)
    },
    put: (req, res, next) => {
        res.send(`put`)
    },
    delete: (req, res, next) => {
        res.send(`delete`)
    }
};