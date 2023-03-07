const Payments = require('../../api/v1/payments/model')
const { checkingImage } = require('../../service/mongoose/images')
const { BadRequestError, NotFoundError } = require('../../errors')

const getAllPayments = async(req) => {
    const result = await Payments.find({ organizer: req.user.organizer })
    .populate({ path: 'image', select: '_id name' })
    .select('_id type status image')

    return result
}

const createPayment = async(req) => {
    const { type, image } = req.body

    await checkingImage(image)

    const check = await Payments.findOne({ type, organizer: req.user.organizer })

    if(check) throw new BadRequestError('tipe pembayaran sudah ada')

    const result = await Payments.create({ image, type, organizer: req.user.organizer })

    return result
}

const getOnePayment = async(req) => {
    const result = await Payments.findOne({ _id: req.params.id, organizer: req.user.organizer })
    .populate({ path: 'image', select: '_id name' })
    .select('_id type status image')

    if(!result) throw new NotFoundError(`tidak ada pembayaran dengan id ${req.params.id}`)
    return result
}

const updatePayment = async(req) => {
    const { type, image } = req.body
    const { id } = req.params

    await checkingImage(image)

    const check = await Payments.findOne({ _id: {$ne: id}, type, organizer: req.user.organizer })

    if(check) throw new BadRequestError('tipe pembayaran sudah terdaftar')

    const result = await Payments.findOneAndUpdate({ _id: id }, { type, image,  organizer: req.user.organizer }, { new: true, runValidators: true })
    if(!result) throw new NotFoundError(`tidak ada tipe pembayaran dengan id ${id}`)

    return result
}

const deletePayment = async(req) => {
    const result = await Payments.findByIdAndRemove(req.params.id)
    if(!result) throw new NotFoundError(`tidak ada payment dengan id ${req.params.id}`)
    return result
}

module.exports = { getAllPayments, createPayment, getOnePayment, updatePayment, deletePayment }