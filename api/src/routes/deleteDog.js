const { Router } = require("express");
const router = Router();
const {Dog} = require('../db')


router.delete('/:id',async(req,res)=>{
    const{id} = req.params;

    try {
        const dog = await Dog.findByPk(id)
        if (!dog) {
            return res.status(400).send({error: "no se encuetra el perro en id"})
        }
        dog.destroy()
        res.status(200).send("Se elimino correctamente")
    } catch (error) {
        console.log(error);
    }
})

module.exports= router;