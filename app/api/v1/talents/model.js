const mongoose = require('mongoose')
const { model, Schema } = mongoose

let talentSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Field name can not empty']
        },
        role: {
            type: String,
            default: '-'
        },
        // untuk membuat relasi pada mongoose kita perlu membuat types ObjectId
        image: {
            type: mongoose.Types.ObjectId,
            ref: 'Image',
            required: true
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true
        }
    },
    { timestamps: true }
)

module.exports = model('Talent', talentSchema)