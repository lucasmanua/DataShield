export const validate = (schema, source = 'body') => (req, res, next) => {
  try {
    const parsedData = schema.parse(req[source] || {});
    if (source === 'body') {
      req.body = parsedData;
    } else if (source === 'query') {
      Object.assign(req.query, parsedData);
    } else {
      req[source] = parsedData;
    }
    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};