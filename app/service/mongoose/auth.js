const User = require('../../api/v1/users/model')
const { BadRequestError, UnauthenticatedError } = require('../../errors')
const { createJWT, createTokenUser } = require('../../utils')

const signin = async(req) => {
    const { email, password } = req.body
    if(!email || !password) throw new BadRequestError('please provide email and password')

    const result = await User.findOne({ email })
    if(!result) throw new UnauthenticatedError('invalid credentials')

    const isPasswordCorrect = await result.comparePassword(password)
    if(!isPasswordCorrect) throw new UnauthenticatedError('invalid credentials')

    const token = createJWT({ payload: createTokenUser(result) })
    return token
}

module.exports = { signin }