const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDogRoutes = require('./getDogs')
const postDogRoutes = require('./postDogs')
const getDogsTemperRoutes = require('./getDogsTemper')
const deleteDogs = require('./deleteDog')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs',getDogRoutes)
router.use('/dogs',postDogRoutes)
router.use('/temperaments',getDogsTemperRoutes)
router.use('/dogs',deleteDogs)

module.exports = router;
