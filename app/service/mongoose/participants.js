const Participant = require('../../api/v1/participants/model')
const Event = require('../../api/v1/events/model')
const Order = require('../../api/v1/orders/model')
const Payments = require('../../api/v1/payments/model')
const { otpMail, orderMail } = require('../mail')
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../errors')
const { createJWT, createTokenParticipant } = require('../../utils')

const signupParticipant = async(req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body

    let result = await Participant.findOne({ email, status: 'tidak aktif' })
    console.log(result)
    if(result) {
        result.firstName = firstName
        result.lastName = lastName
        result.role = role
        result.email = email
        result.password = password
        result.otp = Math.floor(Math.random() * 9999)
        await result.save()
    } else {
        result = await Participant.create({firstName, lastName, email, role, password, otp: Math.floor(Math.random() * 9999)})
    }
    await otpMail(email, result)

    delete result._doc.password
    delete result._doc.otp

    return result
}

const activateParticipant = async(req) => {
    const { otp, email } = req.body

    const check = await Participant.findOne({ email })

    if(!check) throw new NotFoundError(`participant belum terdaftar`)

    if(check && check.otp !== otp) throw new BadRequestError('kode otp salah')

    const result = await Participant.findOneAndUpdate({_id: check._id},{status: 'aktif'},{new: true, runValidators: true})

    delete result._doc.password
    delete result._doc.otp
    
    return result
}

const signinParticipant = async(req) => {
    const { email, password } = req.body

    if(!email || !password) throw new BadRequestError('please provide email and password')

    const result = await Participant.findOne({ email })

    if(!result) throw new UnauthorizedError('invalid credentials')

    if(result.status === 'tidak aktif') throw new UnauthorizedError('akun anda belum aktif')

    const isPasswordCorrect = await result.comparePassword(password)
    if(!isPasswordCorrect) throw new UnauthorizedError('invalid credentials')

    const token = createJWT({payload: createTokenParticipant(result)})
    return token
}

const getAllEvent = async() => {
    const result = await Event.find({ statusEvent: 'Published' })
    .populate('category')
    .populate('image')
    .select('_id title date tickets venueName')

    return result
}

const getOneEvent = async(req) => {
    const result = await Event.findOne({ _id: req.params.id })
    .populate('category')
    .populate('talent')
    .populate('image')

    if(!result) throw new NotFoundError(`tidak ada acara dengan id ${req.params.id}`)

    return result
}

const getAllOrders = async(req) => {
    const result = await Order.find({ participant: req.participant.id })
    return result
}

const checkoutOrder = async(req) => {
    const { event, personalDetail, payment, tickets } = req.body

    const checkingEvent = await Event.findOne({ _id: event })
    if(!checkingEvent) throw new NotFoundError(`tidak ada event dengan id ${event}`)

    const chekingPayment = await Payments.findOne({ _id: payment })
    if(!chekingPayment) throw new NotFoundError(`tidak ada metode pembayaran dengan id ${payment}`)

    let totalPay = 0, totalOrderTicket = 0
    await tickets.forEach(tic => {
        checkingEvent.tickets.forEach(ticket => {
            console.log(tic.ticketCategories.type)
            console.log(ticket.type)
            if(tic.ticketCategories.type === ticket.type) {
                if(tic.sumTicket > ticket.stock) {
                    throw new NotFoundError(`stock event tidak mencukupi`)
                } else {
                    ticket.stock -= tic.sumTicket
                    totalOrderTicket += tic.sumTicket
                    totalPay += tic.ticketCategories.price * tic.sumTicket
                }
            } else {
                throw new BadRequestError('anda memilih kategori tiket yang salah')
            }
        })
    });

    await checkingEvent.save()

    const historyEvent = {
        title: checkingEvent.title,
        date: checkingEvent.date,
        about: checkingEvent.about,
        tagline: checkingEvent.about,
        keyPoint: checkingEvent.keyPoint,
        venueName: checkingEvent.venueName,
        tickets: tickets,
        image: checkingEvent.image,
        category: checkingEvent.category,
        talent: checkingEvent.talent,
        organizer: checkingEvent.organizer
    }

    const result = new Order({
        date: new Date(),
        personalDetail,
        totalPay,
        totalOrderTicket,
        orderItems: tickets,
        participant: req.participant.id,
        event,
        historyEvent,
        payment
    })

    await orderMail(personalDetail.email, result)

    await result.save()
    return result
}

module.exports = { signupParticipant, activateParticipant, signinParticipant, getAllEvent, getOneEvent, getAllOrders, checkoutOrder }