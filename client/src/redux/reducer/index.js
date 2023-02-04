import {
    ALL_BREEDS,
    FILTER_TEMPER,
    ORDER_BREED,
    ORDER_WEIGHT,
    ALL_DOG_NAME,
    ALL_TEMPER,
    ALL_BREEDS_ID,
    FILTER_BREEDS_API,
    FILTER_BREEDS_BD,
    CLEAR, CLEAR_ID,
    ordersOptions, dogsXpage, verifOrder, originOp,
    SET_PAGE, SET_TOTAL_PAGES,
    OF_BACKUP_ALLDOG, FILTER_BREED_APIBD,
    LOAD,
    POST_DOG_START, POST_DOG_SUCCESS,
    POST_DOG_FAILED, CLEAR_MODAL
} from '../actions/index.js'

const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

const initialState = {
    dogs:[],
    dogId:{},
    temper:[],
    backupDogs:[],
    backupDogsTwo:[],
    loader:true,
    filterBYorder:{
        FOtemper:"",
        FObreed:"",
        FOweight:"",
        filterObjetBDandAPI:originOp[0],
    },
    order:ordersOptions[0],
    page:1,
    totalPages:1,
    postDogFetching:false,
    modalDogCreatedSucess:false,
    modalDogCreatedFailed:false
}

const rootReducer= (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case ALL_BREEDS:
            return{
                ...state,
                dogs: payload,
                backupDogs: payload,
                backupDogsTwo: payload
            }
        case FILTER_TEMPER:
            const resultado= state.dogs
            if (payload === "all") {
                return{
                    ...state,
                    dogs:resultado
                }
            } else{
                const dogeTemper = resultado.filter( dog =>{
                    return dog.temperamento?.some(T => T === payload)
                })
                return{
                    ...state,
                    dogs:dogeTemper,
                    filterBYorder:{...state.filterBYorder, FOtemper:payload}
                }
            }
        case ORDER_BREED:
            const arrayOrden = payload === "Name (A - Z)" ?
            state.dogs.sort(function (a,b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1
                }
                return 0
            }) : state.dogs.sort(function (a,b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1
                }
                return 0
            })
            const newOrderOptions=ordersOptions.filter( orderMuch => orderMuch.name === payload)
                return{
                    ...state,
                    dogs:arrayOrden,
                    filterBYorder:{...state.filterBYorder, FObreed:payload},
                    order:newOrderOptions[0]
                }
        case ORDER_WEIGHT:
            const arraWei = payload === 'Weight (Low to high)' ?
                state.dogs.sort(function (a,b) {
                    return verifOrder(a.weight.split(' - ')) - verifOrder(b.weight.split(' - '))
                    }) :
                state.dogs.sort(function (a,b) {
                    return verifOrder(b.weight.split(' - ')) - verifOrder(a.weight.split(' - '))
                    })
            const newOrderOptionsTwo=ordersOptions.filter( orderMuch => orderMuch.name === payload)
                return{
                    ...state,
                    dogs: arraWei,
                    filterBYorder:{...state.filterBYorder, FOweight:payload},
                    order:newOrderOptionsTwo[0]
                }
        case ALL_DOG_NAME:
            return{
                ...state,
                dogs:payload
            }
        case ALL_TEMPER:
            return{
                ...state,
                temper:payload
            }
        case ALL_BREEDS_ID:
            return{
                ...state,
                dogId: payload
            }
        case FILTER_BREEDS_BD:
            const infoBD = state.backupDogsTwo.filter(doge => regex.test(doge.id))
            const newOriginBD = originOp[2]
            return{
                ...state,
                dogs: infoBD,
                backupDogs:infoBD,
                filterBYorder:{
                    ...state.filterBYorder,
                    FOtemper:"",
                    filterObjetBDandAPI:newOriginBD
                }
            }
        case FILTER_BREEDS_API:
            const infoAPI = state.backupDogsTwo.filter(doge => !regex.test(doge.id))
            const newOriginBDTwo = originOp[1]
            return{
                ...state,
                dogs: infoAPI,
                backupDogs:infoAPI,
                filterBYorder:{
                    ...state.filterBYorder,
                    FOtemper:"",
                    filterObjetBDandAPI:newOriginBDTwo
                }
            }
        case FILTER_BREED_APIBD:
            const infoDuo = state.backupDogsTwo
            const newOriginDuo = originOp[0]
            return{
                ...state,
                dogs:infoDuo,
                backupDogs:infoDuo,
                filterBYorder:{
                    ...state.filterBYorder,
                    FOtemper:"",
                    filterObjetBDandAPI:newOriginDuo
                }
            }
        case CLEAR:
            return{
                ...state,
                dogs:state.backupDogsTwo,
                backupDogs:state.backupDogsTwo,
                order:ordersOptions[0],
                filterBYorder:{
                    ...state.filterBYorder,
                    FOtemper:"",
                    FObreed:"",
                    FOweight:"",
                    filterObjetBDandAPI:originOp[0]
                }
            }
        case CLEAR_ID:
            return{
                ...state,
                dogId:{}
            }
        case SET_PAGE:
            return{
                ...state,
                page:payload
            }
        case SET_TOTAL_PAGES:
            const newTotalPag = Math.ceil((state.dogs.length < 8 ? 8 : state.dogs.length) /dogsXpage)
            return{
                ...state,
                totalPages:newTotalPag,
                page: newTotalPag > 0 && state.page > newTotalPag ? newTotalPag : state.page
            }
        case OF_BACKUP_ALLDOG:
            const recuperacion = state.backupDogs
            return{
                ...state,
                dogs:recuperacion,
                // order:ordersOptions[0],
                filterBYorder:{...state.filterBYorder, FOtemper:""}
            }
            case LOAD:
                if (state.loader === true) {
                    return {
                        ...state,
                        loader:false
                    }
                } else {
                    return {
                        ...state,
                        loader:true
                    }
                }
            case POST_DOG_START:
                return{
                    ...state,
                    postDogFetching:true,
                }
            case POST_DOG_SUCCESS:
                return{
                    ...state,
                    postDogFetching:false,
                    modalDogCreatedSucess:true
                }
            case POST_DOG_FAILED:
                return{
                    ...state,
                    postDogFetching:false,
                    modalDogCreatedFailed:true
                }
            case CLEAR_MODAL:
                return{
                    ...state,
                    modalDogCreatedSucess:false,
                    modalDogCreatedFailed:false
                }
        default:
            return {...state}
    }
}

export default rootReducer;