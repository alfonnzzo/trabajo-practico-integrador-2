import { validationResult, matchedData } from "express-validator";

export const applyValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const validatedData = matchedData(req);
  req.validatedData = validatedData;
  next();
};
// import { body, validationResult, matchedData } from
// 'express-validator';
// const controller = (req, res) => {
// const errors = validationResult(req);
// if (!errors.isEmpty()) {
// return res.status(400).json(errors);
// }
// // Obtener solo los datos que pasaron la validación
// const validatedData = matchedData(req);
// console.log(validatedData); // Solo campos validados
// // Usar validatedData en lugar de req.body
// // createUser(validatedData);
// res.status(200).json({ message: 'User created', data:
// validatedData });
// };
