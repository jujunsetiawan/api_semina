const mongoose = require('mongoose')
const { model, Schema } = mongoose
const bcrypt = require('bcryptjs')

const patricipantSchema = Schema(
    {
        firstName: {
            type: String,
            minlength: 3,
            maxlength: 50,
            required: [true, 'nama depan harus diisi']
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'email harus diisi']
        },
        password: {
            type: String,
            required: [true, 'password harus diisi'],
            minlength: 6
        },
        role: {
            type: String,
            default: '-'
        },
        status: {
            type: String,
            enum: ['aktif', 'tidak aktif'],
            default: 'tidak aktif'
        },
        otp: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

patricipantSchema.pre('save', async function(next) {
    const User = this
    if(User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12)
    }
    next()
})

patricipantSchema.methods.comparePassword = async function(canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}

module.exports = model('Participant', patricipantSchema)