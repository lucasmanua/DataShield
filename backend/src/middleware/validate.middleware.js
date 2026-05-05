export const validate = (schema, source = 'body') => (req, res, next) => {
  try {
    const parsedData = schema.parse(req[source] || {});
    req[source] = parsedData;
    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};