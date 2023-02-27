const mongoose = require('mongoose')
const { Schema, model } = mongoose

const imageSchema = Schema(
    {
        name: {
            type: String
        }
    },
    { timestamps: true }
)

module.exports = model('Image', imageSchema)