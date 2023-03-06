const CustomAPIError = require('./custom-api-error')
const { StatusCodes } = require('http-status-codes')

class Unauthorized extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = Unauthorized