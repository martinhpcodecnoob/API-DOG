const { Router } = require("express");
const router = Router();
const {Temperamento} = require('../db')
const {temperamentTotal} = require('../controller/apiDogs')

router.get('/', async(req,res) =>{
    try {
        let temperAll = await temperamentTotal()
        temperAll.forEach(async(e) =>{
            await Temperamento.findOrCreate({
                where:{
                    name:e
                }
            })
        })
        let resultado = await Temperamento.findAll()
        res.send(resultado)
    } catch (error) {
        res.status(400).send("error desde getDogsTemper ",error)
    }
})

module.exports = router;