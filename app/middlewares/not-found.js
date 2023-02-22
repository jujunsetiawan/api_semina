const notFound = (req, res) => res.status(404).send({ status: 'error', message: 'Route does not exist' });

module.exports = notFound;