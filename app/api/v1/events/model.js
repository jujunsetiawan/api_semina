const mongoose = require('mongoose')
const { model, Schema } = require('mongoose')

const ticketCategorySchema = Schema(
    {
        type: {
            type: String,
            required: [true, 'Tipe tiket harus diisi']
        },
        price: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            default: 0
        },
        statusTicketCategory: {
            type: Boolean,
            enum: [true, false],
            default: true
        },
        expired: {
            type: Date
        }
    }
)

const eventSchema = Schema(
    {
        title: {
          type: String,
          required: [true, 'Judul harus diisi'],
          minlength: 3,
          maxlength: 50,
        },
        date: {
          type: Date,
          required: [true, 'Tanggal dan waktu harus diisi'],
        },
        about: {
          type: String,
        },
        tagline: {
          type: String,
          required: [true, 'Tagline harus diisi'],
        },
        keyPoint: {
          type: [String],
        },
        venueName: {
          type: String,
          required: [true, 'Tempat acara harus diisi'],
        },
        statusEvent: {
          type: String,
          enum: ['Draft', 'Published'],
          default: 'Draft',
        },
        tickets: {
          type: [ticketCategorySchema],
          required: true,
        },
        image: {
          type: mongoose.Types.ObjectId,
          ref: 'Image',
          required: true,
        },
        category: {
          type: mongoose.Types.ObjectId,
          ref: 'Category',
          required: true,
        },
        talent: {
          type: mongoose.Types.ObjectId,
          ref: 'Talent',
          required: true,
        },
    }
)

module.exports = model('Event', eventSchema)