const errorHandler = (error, req, res, next) => {
    res.status(500).json({
        message: "Somthing went wrong",
        data,
    });
};

export default errorHandler;
