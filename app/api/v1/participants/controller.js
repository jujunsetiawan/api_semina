const { StatusCodes } = require('http-status-codes')
const { signupParticipant, activateParticipant, signinParticipant, getAllEvent, getOneEvent, getAllOrders, checkoutOrder, googleAuthParticipant } = require('../../../service/mongoose/participants')

const googleAuth = async(req, res, next) => {
    try {
        const result = await googleAuthParticipant(req)
        res.status(StatusCodes.CREATED).json({ message: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const signup = async(req, res, next) => {
    try {
        const result = await signupParticipant(req)
        res.status(StatusCodes.CREATED).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const activeParticipant = async(req, res, next) => {
    try {
        const result = await activateParticipant(req)
        res.status(StatusCodes.OK).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const signin = async(req, res, next) => {
    try {
        const token = await signinParticipant(req)
        res.status(StatusCodes.OK).json({ status: 'success', data: { token }})
    } catch (error) {
        next(error)
    }
}

const getAllLandingPage = async(req, res, next) => {
    try {
        const result = await getAllEvent()
        res.status(StatusCodes.OK).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const getOneLandingPage = async(req, res, next) => {
    try {
        const result = await getOneEvent(req)
        res.status(StatusCodes.OK).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const getDashboard = async(req, res, next) => {
    try {
        const result = await getAllOrders(req)
        res.status(StatusCodes.OK).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const checkout = async(req, res, next) => {
    try {
        const result = await checkoutOrder(req)
        res.status(StatusCodes.CREATED).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

module.exports = { signup, activeParticipant, signin, getAllLandingPage, getOneLandingPage, getDashboard, checkout, googleAuth }