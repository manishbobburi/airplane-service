class AppError extends Error{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.explaniation = message;
    }
}

module.exports = AppError;