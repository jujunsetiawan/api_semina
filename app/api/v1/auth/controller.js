const { StatusCodes } = require('http-status-codes')
const { signin } = require('../../../service/mongoose/auth')

const signinCms = async(req, res, next) => {
    try {
        const result = await signin(req)
        res.status(StatusCodes.CREATED).json({ status: 'success', data: {token: result}})
    } catch (error) {
        next(error)
    }
}

module.exports = { signinCms }