export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

export const globalErrorHandler = (error, req, res, _next) => {
  console.error(`[${req.method}] ${req.originalUrl}`, error);

  const statusCode = error.statusCode || 500;
  const isValidationError = error.name === 'ZodError';

  if (isValidationError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.errors
    });
  }

  return res.status(statusCode).json({
    message: error.message || 'Internal server error'
  });
};
