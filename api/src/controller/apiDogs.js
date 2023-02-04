require('dotenv').config({path:'../../.env'});
const axios = require('axios');
const {Dog,Temperamento}=require('../db.js');
const { newTiposTemp } = require('./util.js');
const {YOUR_API_KEY} = process.env;

const dogeApi= async() =>{
    try {
        const extractApi=await axios({
            method: 'GET',
            url: `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
        })

        const API=await extractApi.data?.map((x) => {
            return{
                id: x.id,
                name: x.name,
                height: x.height.metric,
                weight: x.weight.metric,
                yearlife: x.life_span,
                origin: x.origin,
                image: x.image.url,
                temperamento:x.temperament == undefined ? [] : x.temperament.split(', ').sort()
            }
        })
        // console.log(API);
        return API;
    } catch (error) {
        return `Este es el error: ${error}`
    }
}

const infoBD = async() =>{
    try {
        const doges = await Dog.findAll({
            include:{
                model: Temperamento,
                attributes:['name'],
                through:{
                    attributes:[]
                }
            }
        })

        return await doges.map( i =>{
            return{
                id:i.id,
                name:i.name,
                height:i.height,
                weight:i.weight,
                yearlife:i.yearlife,
                origin:i.origin,
                image:i.image,
                temperamento:i.temperamentos.map( dog => dog.name)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const infoTotal = async() =>{
    const loadDogApi = await dogeApi();
    const loadInfoBD = await infoBD();
    return loadInfoBD.concat(loadDogApi)
    // console.log(loadInfoBD.concat(loadDogApi));
}



const temperamentTotal = async() => {
    const temperamentos = await infoTotal();
    const extractTemp = temperamentos.map( e => {
        return e.temperamento
    })
    return newTiposTemp(extractTemp)
    // console.log(newTiposTemp(extractTemp));
}


// temperamentTotal();
// infoTotal()

module.exports={
    dogeApi,
    infoBD,
    infoTotal,
    temperamentTotal
}
