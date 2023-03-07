const nodemailer = require('nodemailer')
const { gmail, password } = require('../../config')
const Mustace = require('mustache')
const fs = require('fs')
const { BadRequestError } = require('../../errors')

const transporter = nodemailer.createTransport({
    host: 'smpt.gmail.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
        user: gmail,
        pass: password
    }
})

const otpMail = async(email, data) => {
    try {
        let template = fs.readFileSync('app/views/email/otp.html', 'utf-8')
        let message = {
            from: gmail,
            to: email,
            subject: 'OTP for registration is :',
            html: Mustace.render(template, data)
        }

        return await transporter.sendMail(message)
    } catch (error) {
        console.log(error)
    }
}

const orderMail = async(email, data) => {
    try {
        let template = fs.readFileSync('app/views/order/invoice.html', 'utf-8')

        let message = {
            from: gmail,
            to: email,
            subject: 'Receipt Payment',
            html: Mustace.render(template, data)
        }

        return await transporter.sendMail(message)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { otpMail, orderMail }