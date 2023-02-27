const { createImages } = require('../../../service/mongoose/images')
const { StatusCodes } = require('http-status-codes')

const create = async(req, res, next) => {
    try {
        const result = await createImages(req)
        res.status(StatusCodes.CREATED).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

module.exports = { create }