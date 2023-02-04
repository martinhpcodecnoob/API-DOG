const { Router } = require("express");
const {Dog,Temperamento} = require('../db.js')

const router = Router();

router.post('/', async(req,res)=>{
    const {name,height,weight,yearlife,origin,image,temperamento} = req.body;

    try {

        if (name.length > 255 || origin.length > 255 || image.length > 255) {
            return res.status(400).send({error:'Ups name, origin, image debe ser menor a 255 characteres'})
        }else{
            const newRaza = await Dog.create({
                        name,height,weight,yearlife,origin,
                        image : image ? image : 'https://cdn.pixabay.com/photo/2017/03/25/14/26/animals-2173635_960_720.jpg',
                    })

            const typeTemper = await Temperamento.findAll({
                where:{
                    name:temperamento
                }
            })

            await newRaza.addTemperamento(typeTemper)
            res.json(newRaza)
        }

    } catch (error) {
        res.status(400).send('Error desde postDogs >> ',error)
    }
})

module.exports= router;