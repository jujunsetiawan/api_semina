const User = require('../../api/v1/users/model')
const Organizer = require('../../api/v1/organizers/model')
const { BadRequestError } = require('../../errors')

const createOrganizer = async(req) => {
    const { organizer, email, password, confirmPassword, name, role } = req.body
    if(password !== confirmPassword) throw new BadRequestError('password dan confirm password tidak cocok')
    
    const result = await Organizer.create({ organizer })

    const users = await User.create({ email, name, password, role, organizer: result._id })

    delete users._doc.password

    return users
}

const createUser = async(req) => {
    const { name, email, password, confirmPassword, role } = req.body

    if(password !== confirmPassword) throw new BadRequestError('password dan confirm password tidak cocok')

    const result = User.create({ name, email, password, confirmPassword, role, organizer: req.user.organizer })

    delete result._doc.password

    return result
}

const getAllUsers = async() => {
    const result = await User.find().select('_id name email role organizer')
    return result
}

module.exports = { createOrganizer, createUser, getAllUsers }