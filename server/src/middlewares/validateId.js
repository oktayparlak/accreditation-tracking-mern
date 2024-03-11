const uuid = require('uuid');

// function validateId(req, res, next) {
//   try {
//     const { id, userId, courseId } = req.params;
//     for (let item in req.params) {
//       console.log(item);
//     }
//     const params = [id, userId, courseId].filter(Boolean);

//     if (params.length !== 1) {
//       return res.status(400).json({ error: { message: 'Invalid parameters' } });
//     }

//     const [param] = params;
//     if (!uuid.validate(param)) {
//       return res.status(400).json({ error: { message: 'Invalid id' } });
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// }

// module.exports = validateId;

module.exports = (req, res, next) => {
  try {
    for (let item in req.params) {
      if (!req.params[item]) {
        return res.status(400).json({ error: { message: 'Id is required' } });
      }
      if (!uuid.validate(req.params[item])) {
        return res.status(400).json({ error: { message: 'Invalid id' } });
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
