import axios from "axios";
export const ALL_BREEDS = 'ALL_BREEDS';
export const FILTER_TEMPER = 'FILTER_TEMPER';
export const FILTER_BREEDS = 'FILTER_BREEDS'
export const ORDER_BREED = 'ORDER_BREED';
export const ORDER_WEIGHT = 'ORDER_WEIGHT'
export const ALL_DOG_NAME = 'ALL_DOG_NAME';
export const ALL_TEMPER = 'ALL_TEMPER';
export const ALL_BREEDS_ID = 'ALL_BREEDS_ID';
export const FILTER_BREEDS_BD = 'FILTER_BREEDS_BD'
export const FILTER_BREEDS_API = 'FILTER_BREEDS_API'
export const FILTER_BREED_APIBD = 'FILTER_BREED_APIBD'
export const CLEAR = 'CLEAR';
export const SET_PAGE = 'SET_PAGE';
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
export const dogsXpage = 8;
export const OF_BACKUP_ALLDOG = "OF_BACKUP_ALLDOG"
export const LOAD = "LOAD"
export const CLEAR_ID = "CLEAR_ID"
export const CLEAR_MODAL = "CLEAR_MODAL"
export const POST_DOG_START = "POST_DOG_START"
export const POST_DOG_SUCCESS = "POST_DOG_SUCCESS"
export const POST_DOG_FAILED = "POST_DOG_FAILED"
export const ordersOptions=[
    {
        id:0,
        name:"Name (A - Z)"
    },
    {
        id: 1,
        name: 'Name (Z - A)',
    },
    {
        id: 2,
        name: 'Weight (Low to high)',
    },
    {
        id: 3,
        name: 'Weight (High to low)',
    }
]
export const originOp = [
    {
        id: 0,
        name: 'All Breeds',
        filterr:() => filterBreedsDuo()
    },
    {
        id: 1,
        name: 'Breeds API',
        filterr:() => filterBreedsAPI()
    },
    {
        id: 2,
        name: 'Breeds BD',
        filterr:() => filterBreedsBD()
    }
]
export const verifOrder = (orderNaN) =>{
    if (orderNaN.length === 2) {
        if (orderNaN[0] === "NaN") {
            return orderNaN[1]
        }
        if (orderNaN[1] === "NaN") {
            return orderNaN[0]
        }

        if (orderNaN[0] !== "NaN") {
            return orderNaN[0]
        }
    }
    if (orderNaN.length === 1) {
        if (orderNaN[0]=== "NaN") {
            return "0"
        }else{
            return orderNaN[0]
        }

    }
}

export const all_breeds = () => dispatch =>{
    return axios.get('/dogs/')
                .then(res => res.data)
                .then(info => dispatch({
                    type: ALL_BREEDS,
                    payload: info
                }))
}

export const filter_temper = (temper) =>{
    return({
        type: FILTER_TEMPER,
        payload: temper
    })
}

export const filter_breeds = (breed) => {
    return({
        type: FILTER_BREEDS,
        payload: breed
    })
}

export const orderBreed = (order) =>{
    return({
        type:ORDER_BREED,
        payload: order
    })
}

export const orderWeight = (ordeWe) => {
    return({
        type:ORDER_WEIGHT,
        payload: ordeWe
    })
}

export const allDogName = (name) => dispatch =>{
    try {
        return axios.get(`/dogs?name=${name}`)
                    .then(res => res.data).catch(res => res.response.data)
                    .then(info => dispatch({
                        type:ALL_DOG_NAME,
                        payload:info
                    }))
    } catch (error) {
        console.log("Error en allDogName >>> ",error);
    }
}

export const allTemper = () => (dispatch) =>{
    return axios.get('/temperaments/')
                .then(res => res.data)
                .then(infoTemper => dispatch({
                    type:ALL_TEMPER,
                    payload: infoTemper
                }))
}

export const allBreedsId = (id) => dispatch => {
    return axios.get(`/dogs/${id}`)
                .then(res => res.data)
                .then(infoId => dispatch({
                    type: ALL_BREEDS_ID, 
                    payload: infoId
                }))
}

// export function breedsPost(datos){
//     return async function(dispatch) {
//         const json = await axios.post('/dogs/',datos)
//         return json
//     }
// }

export const breedsPost = (data) =>{
    return async(dispatch) => {
        await dispatch(startValidation())
        axios.post('/dogs/',data)
                .then(res => {
                    dispatch(sucessValidation())
                })
                .catch(e => {
                    dispatch(failedValidation())
                    console.log(e);
                })
    }
}

export const filterBreedsBD = () =>{
    return({
        type:FILTER_BREEDS_BD,
    })
}

export const filterBreedsAPI = () =>{
    return({
        type:FILTER_BREEDS_API
    })
}

export const filterBreedsDuo = () =>{
    return{
        type:FILTER_BREED_APIBD
    }
}

export const clear = () => {
    return({
        type:CLEAR
    })
}

export const clearId = () => {
    return({
        type:CLEAR_ID
    })
}

export const clearModal = () =>{
    return{
        type:CLEAR_MODAL
    }
}

export const setPage = (page) =>{
    return{
        type: SET_PAGE,
        payload: page
    }
}

export const setTotalPages = () =>{
    return{
        type: SET_TOTAL_PAGES
    }
}

export const ofBack_allDogs = () =>{
    return{
        type: OF_BACKUP_ALLDOG
    }
}

export const Loading = () =>{
    return{
        type:LOAD
    }
}

export const startValidation = () => {
    return {
        type:POST_DOG_START
    }
}

export const sucessValidation = () => {
    return {
        type:POST_DOG_SUCCESS
    }
}

export const failedValidation = () =>{
    return{
        type:POST_DOG_FAILED
    }
}
