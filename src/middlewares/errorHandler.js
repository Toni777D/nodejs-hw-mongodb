const errorHandler = (error, req, res) => {
    const {status = 500} = error;
    res.status(status).json({
        message: "Something went wrong",

    });
};

export default errorHandler;
