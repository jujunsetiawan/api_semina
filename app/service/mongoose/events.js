const Event = require('../../api/v1/events/model')
const { checkingImage } = require('./images')
const { chekingCategories } = require('./categories')
const { checkingTalent } = require('./talents')
const {BadRequestError, NotFoundError} = require('../../errors')

const getAllEvents = async(req) => {
    const { keyword, category, talent, status } = req.query
    let condition = { organizer: req.user.organizer }

    if(keyword) {
        condition = {...condition, title: { $regex: keyword, $options: 'i' }}
    }

    if(category) {
        condition = {...condition, category}
    }

    if(talent) {
        condition = {...condition, talent}
    }

    if(['Draft', 'Published'].includes(status)) {
        condition = {...condition, statusEvent: status}
    }

    const result = await Event.find(condition)
    .populate({path: 'image', select: '_id name'})
    .populate({path: 'category', select: '_id name'})
    .populate({
        path: 'talent',
        select: '_id name role image',
        populate: {path: 'image', select: '_id name'}
    })

    return result
}

const createEvent = async(req) => {
    const { title, date, about, tagline, venueName, keypoint, statusEvent, tickets, image, category, talent } = req.body

    await checkingImage(image),
    await chekingCategories(category)
    await checkingTalent(talent)

    const check = await Event.findOne({ title, organizer: req.user.organizer })

    if(check) throw new BadRequestError('judul acara sudah terdaftar')

    const result = await Event.create({ title, date, about, tagline, venueName, keypoint, statusEvent, tickets, image, category, talent, organizer: req.user.organizer })

    return result
}

const getOneEvent = async(req) => {
    const { id } = req.params

    const result = await Event.findOne({ _id: id, organizer: req.user.organizer })
    .populate({path: 'image', select: '_id name'})
    .populate({path: 'category', select: '_id, name'})
    .populate({path: 'talent', select: '_id name role image', populate: {path: 'image', select: '_id name'}})

    if(!result) throw new NotFoundError(`Tidak ada acara dengan id ${id}`)

    return result
}

const updateEvent = async(req) => {
    const { id } = req.params
    const {title, date, about, tagline, venueName, keyPoint, statusEvent, tickets, image, category, talent} = req.body

    await checkingImage(image)
    await chekingCategories(category)
    await checkingTalent(talent)

    const check = await Event.findOne({_id: {$ne: id}, title, organizer: req.user.organizer})
    if(check) throw new BadRequestError(`judul event sudah terdaftar`)

    const result = await Event.findOneAndUpdate(
        {_id: id},
        {title, date, about, tagline, venueName, keyPoint, statusEvent, tickets, image, category, talent, organizer: req.user.organizer},
        {new: true, runValidators: true}
    )

    if(!result) throw new NotFoundError(`tidak ada event dengan id ${id}`)
 
    return result
}

const deleteEvent = async(req) => {
    const { id } = req.params
    
    const result = await Event.findOneAndDelete({_id: id, organizer: req.user.organizer})
    if(!result) throw new NotFoundError(`tidak ada acara dengan id ${id}`)
}

const changeStatusEvent = async(req) => {
    const { id } = req.params
    const { statusEvent } = req.body

    const result = await Event.findOneAndUpdate({ _id: id, organizer: req.user.organizer }, { statusEvent }, { new: true, runValidators: true})
    
    if(!result) throw new NotFoundError(`tidak ada acara dengan id ${id}`)
    return result
}

module.exports = { getAllEvents, createEvent, getOneEvent, updateEvent, deleteEvent, changeStatusEvent }