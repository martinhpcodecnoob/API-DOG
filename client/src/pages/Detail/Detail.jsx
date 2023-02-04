import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from './Detail.module.css'
import { allBreedsId} from '../../redux/actions';
import Loader from '../../components/Loader/Loader';
import NavBar from '../../components/NavBar/NavBar';


export default function Detail() {
  const [details, setDetails] = useState()
  const [fullsize, setFullsize] = useState()
  const {id} = useParams()
  const dispatch = useDispatch()
  const dogID = useSelector(state => state.dogId)
  const [imgError, setImgError] = useState(false)
  const placeholderOnError = "https://cdn.pixabay.com/photo/2017/03/25/14/26/animals-2173635_960_720.jpg"

  const dataDispatch =() =>{
    dispatch(allBreedsId(id))
  }
  
  useEffect(() => {
    setDetails(dogID[0])
  }, [dogID])

  useEffect(() => {
    dataDispatch();
  }, [])
  
  useLayoutEffect(() => {
    if (details && details.image === null) {
      setImgError(true)
    }
  }, [details])

  const handleImgError = (e) =>{
    e.targe.onerror = null
    setImgError(true)
  }
  
  return (details ?
      <>
      <div><NavBar/></div>
        <main className={styles.main}>
          <div className={styles.detailsBody}>
              {imgError ?
                  <img id='imagePlaceholder' className={styles.imagePlaceholder} src={placeholderOnError} />
                  : 
                  <img  onError={handleImgError} 
                  onClick={() => setFullsize(!fullsize)} className={fullsize ? styles.imageFullsize : styles.image} 
                  src={details.image} 
                      alt={details.name} />
                    }
              <div className={styles.dataWrapper}> 
                <h2 className={`${styles.dogName} ${fullsize ? styles.fullsize : ''}`}>{details.name}</h2>
                <div className={`${styles.dogStats} ${fullsize ? styles.fullsize : ''}`}>{`Height: ${details.height} cm`}</div>
                <div className={`${styles.dogStats} ${fullsize ? styles.fullsize : ''}`}>{`Weight: ${details.weight} kg`}</div>
                <div className={`${styles.dogStats} ${fullsize ? styles.fullsize : ''}`}>{`Origin: ${details.origin}`}</div>
                {details.yearlife && <div className={`${styles.dogStats} ${fullsize ? styles.fullsize : ''}`}>{`Life span: ${details.yearlife}`}</div>}
                <div className={styles.temperamentsWrapper}>
                  {details.temperamento && details.temperamento.map(temperament => (<div key={temperament} className={`${styles.temperament} ${fullsize ? styles.tfullsize : ''}`}>{temperament}</div>))}
                </div>
              </div>
          </div>
        </main>
      </>
        : <Loader/>
      )
}
