const Talents = require('../../api/v1/talents/model')
const { checkingImage } = require('./images')
const { BadRequestError, NotFoundError } = require('../../errors')

const getAllTalent = async(req) => {
    const { keyword } = req.query

    let condition = { organizer: req.user.organizer }

    if(keyword) condition = { ...condition, name: { $regex: keyword, $options: 'i' } }

    const result = await Talents.find(condition)
    .populate({
        path: 'image',
        select: '_id name'
    })
    .select('_id name role image')

    return result
}

const createTalent = async(req) => {
    const { name, role, image } = req.body

    await checkingImage(image)

    const check = await Talents.findOne({ name, organizer: req.user.organizer })

    if(check) throw new BadRequestError('pembicara sudah terdaftar')

    const result = await Talents.create({ name, image, role, organizer: req.user.organizer })
    return result
}

const getOneTalent = async(req) => {
    const { id } = req.params

    const result = await Talents.findOne({ _id: id, organizer: req.user.organizer })
    .populate({
        path: 'image',
        select: '_id name'
    }).select('_id image name')

    if(!result) throw new NotFoundError(`Tidak ada pembicara dengan id ${id}`)
    return result
}

const updateTalent = async(req) => {
    const { id } = req.params
    const { name, image, role } = req.body

    await checkingImage(image)

    const check = await Talents.findOne({ name, _id: { $ne: id}, organizer: req.user.organizer })

    if(check) throw new BadRequestError('pembicara sudah terdaftar')

    const result = await Talents.findOneAndUpdate(
        { _id: id },
        { name, image, role, organizer: req.user.organizer },
        { new: true, runValidators: true }
    )

    if(!result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`)
    return result
}

const deleteTalent = async(req) => {
    const { id } = req.params

    const result = await Talents.findOneAndDelete({_id: id, organizer: req.user.organizer})
    if(!result) throw new NotFoundError(`Tidak ada pembicara dengan id ${id}`)
}

const checkingTalent = async(id) => {
    const result = await Talents.findById(id)

    if(!result) throw new NotFoundError(`Tidak ada talent dengan id ${id}`)

    return result
}

module.exports = { getAllTalent, getOneTalent, createTalent, updateTalent, deleteTalent, checkingTalent }