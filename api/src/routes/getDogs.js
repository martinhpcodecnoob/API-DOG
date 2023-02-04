const { Router } = require("express");
const {infoTotal}= require('../controller/apiDogs')

const router = Router();

router.get('/',async(req,res)=>{
    const {name} = req.query
    let extraerInfo=await infoTotal();
    if (name) {
        try {
            let filterDog = await extraerInfo.filter( elem => {
                return elem.name.toLowerCase().includes(name.toLowerCase())
            })
            if (filterDog.length > 0) {
                return res.send(filterDog)
            } else {
                return res.status(400).send({error:'Ups no hay una raza de perro con ese nombre',filterDog:filterDog})
            }    
        } catch (error) {
            return res.status(400).send("Error >>> ",error)
        }
    } else{
        res.send(extraerInfo)
    }

    
})

router.get('/:id', async(req,res)=>{
    const {id} = req.params;

    try {
        let extraerInfo=await infoTotal();
        let idDoge = await extraerInfo.filter( elem =>{
            return elem.id == id
        })
        idDoge.length ? res.json(idDoge) : res.status(400).send("No existe una raza con ese ID")
    } catch (error) {
        return res.status(400).send('Error desde getDogs ', error)
    }

})

module.exports=router;