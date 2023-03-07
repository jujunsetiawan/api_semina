const { StatusCodes } = require('http-status-codes')
const { getAllOrders } = require('../../../service/mongoose/orders')

const index = async(req, res, next) => {
    try {
        const result = await getAllOrders(req)
        res.status(StatusCodes.OK).json({ status: 'success', result })
    } catch (error) {
        next(error)
    }
}

module.exports = { index }