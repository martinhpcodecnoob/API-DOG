import React,{useRef,useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import styles from './RangeSlider.module.css'

export default function RangeSlider({min,max,gap,label,um,setInput,input,name,close}) {
    const progressRef = useRef()
    const rangeMinRef = useRef()
    const rangeMaxRef = useRef()
  
    const [rangeMin, setRangeMin] = useState(Math.floor(max / 4))
    const [rangeMax, setRangeMax] = useState(Math.floor(max / 4 * 3))
    const [lastHandle, setLastHandle] = useState(undefined)
  
    const postDogFetching = useSelector(state => state.postDogFetching)
  
    const handleRange = (e) => {
  
      if(e.target.id === 'rangeMin' ) {setRangeMin(Number(e.target.value)); setLastHandle('min')}
      if(e.target.id === 'rangeMax' ) {setRangeMax(Number(e.target.value)); setLastHandle('max')}
  
      progressRef.current.style.left = `${(rangeMin / max) * 100}%`
      progressRef.current.style.right = `${100 - (rangeMax / max) * 100}%`
    }
  
    const handleCloseButton = (e) => {
      setInput({
        ...input,
        [name]: undefined
      })
      close(false)
    }
  
    useEffect(() => {
      if(rangeMax - rangeMin < gap)  {
        if(lastHandle === 'min') {
          setRangeMin(rangeMax - gap)
        } else if(lastHandle === 'max'){
          setRangeMax(rangeMin + gap)
        }
      }
    })
  
    useEffect(() => {
      if(input[name] === undefined) {
        setRangeMin(Math.floor(max / 4))
        setRangeMax(Math.floor(max / 4 * 3))
        setLastHandle(undefined)
        progressRef.current.style.left = `25%`
        progressRef.current.style.right = `25%`
      }
    }, [input])
  
    useEffect(() => {
      lastHandle &&
      setInput({
        ...input,
        [name]: `${rangeMin} - ${rangeMax}`
      })
    },[rangeMin, rangeMax])
  
    return (
      <div className={styles.rangeWrapper}>
        <div className={styles.inputValues}>
          <label className={styles.labelWrapper}>
            <div className={styles.label}>
              <span>{label}</span>
              {close && <div className={styles.closeBtn} onClick={handleCloseButton}>✖</div>}
            </div>
          </label>
  
            {lastHandle
              ?   <div className={styles.values}>{`${rangeMin} - ${rangeMax} ${um}`}</div>
              :   <div className={`${styles.values} ${close ? styles.noSet : styles.noSetRed}` }>NO SET</div>
            }
          
        </div>
        <div className={styles.slider}>
          <div ref={progressRef} className={styles.progress}></div>
  
          <div className={styles.inputRange}>
            <input
              disabled={postDogFetching}
              id='rangeMin'
              className={styles.rangeMin}
              type="range"
              min={min}
              max={max}
              onChange={handleRange}
              value={rangeMin}
              ref={rangeMaxRef}
            />
            <input
              disabled={postDogFetching}
              id='rangeMax'
              className={styles.rangeMax}
              type="range"
              min={min}
              max={max}
              onChange={handleRange}
              value={rangeMax}
              ref={rangeMinRef}
            />
          </div>
        </div>
      </div>
      
    )
}
