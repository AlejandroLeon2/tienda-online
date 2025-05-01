const errorHandler = (res, error) => {
    console.error('Error:', error);

    const statusCode = error.statusCode || 500;
    const message = error.message || 'Error interno del servidor';

    res.status(statusCode).json({
        success: false,
        error: message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
};

module.exports = errorHandler;