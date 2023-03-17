const { UnauthorizedError, UnauthenticatedError } = require('../errors')
const { isTokenValid } = require('../utils')
const { admin } = require('../config')

const authenticateUser = async(req, res, next) => {
    try {
        let token
        
        const authHeader = req.headers.authorization

        if(authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1]
        }

        if(!token) throw new UnauthenticatedError('authentication invalid')

        const payload = isTokenValid({ token })

        req.user = {
            email: payload.email,
            role: payload.role,
            name: payload.name,
            organizer: payload.organizer,
            id: payload.userId
        }

        next()
    } catch (error) {
        next(error)
    }
}

const authenticateParticipant  = async(req, res, next) => {
    try {
        let token

        const authHeader = req.headers.authorization
        
        if(authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1]
        }

        if(!token) throw new UnauthenticatedError('authentication invalid')

        const payload = isTokenValid({ token })

        req.participant = {
            id: payload.participantId,
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email
        }

        next()
    } catch (error) {
        next(error)
    }
}

const googleAuthenticateParticipant = async(req, res, next) => {
    try {
        let token

        const authHeader = req.headers.authorization
        
        if(authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1]
        }

        if(!token) throw new UnauthenticatedError('authentication invalid')

        const payload = await admin.auth().verifyIdToken(token);
        console.log(payload)

        req.participant = {
            id: payload.participantId,
            fullName: payload.firstName,
            email: payload.email
        }

        return next();
        
    } catch (error) {
        next(error)
    }

}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) throw new UnauthorizedError('unauthorized to access this route')
        next()
    }
}

module.exports = { authenticateUser, authenticateParticipant, authorizeRoles, googleAuthenticateParticipant }