import React,{useState,useRef,useEffect} from 'react'
import { useDispatch,useSelector } from "react-redux";
import RangeSlider from '../../components/RangeSlider/RangeSlider'
import styles from './CreateDog.module.css'
import { allTemper, all_breeds, breedsPost, setPage } from '../../redux/actions';
import Modal from '../../components/Modal/Modal';
import TemperamentsSelect from '../../components/TemperamentsSelect/TemperamentsSelect';
import NavBar from '../../components/NavBar/NavBar';
import { useHistory } from 'react-router-dom';

export default function CreateDog() {
const temper = useSelector(state => state.temper)
const backupDogsTwo = useSelector ( state => state.backupDogsTwo)
const postDogIsFetching = useSelector(state => state.postDogIsFetching)
// const page = useSelector(state => state.page)
const dispatch = useDispatch()
const history = useHistory()

const initialValues = {
    name: '',
    height: undefined,
    weight: undefined,
    yearlife: undefined,
    origin:'',
    image: '',
    temperamento: []
}

const [input, setInput] = useState(initialValues)
const [errors, setErrors] = useState({})
const [showNameErr, setShowNameErr] = useState(false)

const refSelect = useRef()
const refSubmit = useRef()

const validate = (input) => {
    let errors = {}
    const regex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gim
    const regexTree = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gim
    const regexTwo = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gim
    if(input.name.length === 0) {
        errors.name = 'Name is required'
    } else if(input.name.length < 3) {
        errors.name = 'Name must have at least 3 characters'
    } else if(!regex.test(input.name)) {
        errors.name = 'That name is invalid'
    } else if (backupDogsTwo.some(e => e.name.startsWith(input.name))) {
        errors.name = 'No puede existir nombres repetidos'
    }
    
    if (input.origin.length === 0) {
        errors.origin = "Origin is required"
    }else if (input.origin.length < 3) {
        errors.origin = 'Origin must have at least 3 characteres'
    }else if (!regexTree.test(input.origin)) {
        errors.origin = 'That origin es invalido'
    }

    if (!regexTwo.test(input.image)) {
        errors.image = 'That Image es invalido'
    }

    if(input.height === undefined) errors.height = 'Height is required'

    if(input.weight === undefined) errors.weight = 'Weight is required'

    if(input.yearlife === undefined) errors.yearlife = 'Weight is required'
    
    return errors
}

useEffect(() => {
    // dispatch(setPage(page))
    if (backupDogsTwo.length === 0) {
        history.push('/home')
    }
    temper.length === 0 && dispatch(allTemper())
}, [])

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(breedsPost(input))
}

const handleInputChange = (e) => {
    e.preventDefault()
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
}

useEffect(() => {
    setErrors(validate(input))
}, [input])

const resetForm = () => {
    setInput(initialValues)
    setShowNameErr(false)
}

const Spinner = () => {
    return (
        <div className={styles.spinner}><div></div><div></div><div></div><div></div></div>
    )
}

return (
<>
<div className={styles.create_Nav}><NavBar/></div>
    <main className={styles.main}>
        <div className={`${styles.createWrapper} ${postDogIsFetching ? styles.fetching : ''}`}>
            <div className={styles.formContainer}>
                <Modal reset={resetForm} submit={refSubmit.current} />
                <form onSubmit={handleSubmit} method="post">
                    <div className={styles.uploadImgWrapper}>
                    </div>
                    <div className={styles.dataWrapper}>
                        <div>
                            <input
                                id='name'
                                className={`${styles.name} ${postDogIsFetching ? styles.fetchingData : ''} `}
                                type="text"
                                name="name"
                                value={input.name}
                                placeholder='Name...'
                                autoComplete='none'
                                onChange={handleInputChange}
                                onBlur={() => setShowNameErr(true)}
                            />
                            <p className={styles.errMsg}>{errors.name && showNameErr ? errors.name : ''}</p>

                            <input
                                id='origin'
                                className={`${styles.origin} ${postDogIsFetching ? styles.fetchingData : ''} `}
                                type="text"
                                name="origin"
                                value={input.origin}
                                placeholder='Origin...'
                                autoComplete='none'
                                onChange={handleInputChange}
                                onBlur={() => setShowNameErr(true)}
                            />
                            <p className={styles.errMsg}>{errors.origin && showNameErr ? errors.origin : ''}</p>

                            <input
                                id='image'
                                className={`${styles.image} ${postDogIsFetching ? styles.fetchingData : ''} `}
                                type="text"
                                name="image"
                                value={input.image}
                                placeholder='URL:'
                                autoComplete='none'
                                onChange={handleInputChange}
                                onBlur={() => setShowNameErr(true)}
                            />
                            <p className={styles.errMsg}>{errors.image && showNameErr ? errors.image : ''}</p>
                        </div>
                        <div onClick={() => setShowNameErr(true)} className={`${styles.statsWrapper} ${postDogIsFetching ? styles.fetchingData : ''} `}>
                            <div className={styles.rangeWrapper}>
                                <RangeSlider 
                                    key={'height'} 
                                    input={input} 
                                    setInput={setInput} 
                                    name={'height'} 
                                    label={'Height'} 
                                    min={1} 
                                    max={100} 
                                    gap={1} 
                                    um={'cm'} 
                                />
                                    <RangeSlider  
                                    key={'weight'} 
                                    input={input} 
                                    setInput={setInput} 
                                    name={'weight'} 
                                    label={'Weight'} 
                                    min={1} 
                                    max={100} 
                                    gap={1} 
                                    um={'kg'} 
                                />
                                <RangeSlider
                                  key={'yearlife'} 
                                  input={input} 
                                  setInput={setInput} 
                                  name={'yearlife'} 
                                  label={'Yearlife'} 
                                  min={1} 
                                  max={30} 
                                  gap={1} 
                                  um={'years'} 
                                  />
                                
                            </div>
                            <div className={`${styles.temperamentsWrapper} ${postDogIsFetching ? styles.fetchingData : ''} `}>
                                <TemperamentsSelect refSelect={refSelect} input={input} setInput={setInput} />
                            </div>
                        </div>    
                        <button ref={refSubmit} onClick={() => console.log(input)} disabled={Object.keys(errors).length > 0} className={styles.submit} type="submit">
                            {postDogIsFetching ? <Spinner/> : 'Create'}
                        </button>
                    </div>                    
                </form>
            </div>
        </div>
    </main>
  </>
  )
}
