const mongoose = require('mongoose')
const { Schema, model } = mongoose

const talentSchema = Schema(
    {
        name: {
          type: String,
          required: [true, 'Nama harus diisi'],
        },
        role: {
          type: String,
          default: '-',
        },
        image: {
          type: mongoose.Types.ObjectId,
          ref: 'Image',
          required: true,
        },
    },
    { timestamps: true }
)

module.exports = model('Talent', talentSchema)