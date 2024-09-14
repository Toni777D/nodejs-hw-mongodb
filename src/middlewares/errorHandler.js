const errorHandler = (error, req, res, next) => {
    const {status = 500} = error;
    res.status(status).json({
        message: "Contact not found",

    });
};

export default errorHandler;
