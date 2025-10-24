module.exports = {
    get: (req, res, next) => {
        res.send('Hi');
    },
    post: (req, res, next) => {
        const message = req.body.message;
        res.send({ message: message });
    },
    put: (req, res, next) => {
        res.send('Put\'s done.');
    },
    delete: (req, res, next) => {
        res.send('Delete\'s done.');
    }
};