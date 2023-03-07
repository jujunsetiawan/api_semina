const { StatusCodes } = require('http-status-codes')
const { createPayment, deletePayment, getAllPayments, getOnePayment, updatePayment } = require('../../../service/mongoose/payments')

const create = async(req, res, next) => {
    try {
        const result = await createPayment(req)
        res.status(StatusCodes.CREATED).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const index = async(req, res, next) => {
    try {
        const result = await getAllPayments(req)
        res.status(StatusCodes.OK).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const find = async(req, res, next) => {
    try {
        const result = await getOnePayment(req)
        res.status(StatusCodes.OK).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) => {
    try {
        const result = await updatePayment(req)
        res.status(StatusCodes.OK).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {
        await deletePayment(req)
        res.status(StatusCodes.OK).json({ status: 'success', message: 'payment type has been deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = { create, index, find, update, destroy }