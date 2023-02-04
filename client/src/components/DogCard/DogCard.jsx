import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import styles from './DogCard.module.css'
import { verifOrder } from '../../redux/actions'

export default function DogCard({dog}) {
    const imgRef = useRef()
    const hiddenImgError = () =>{
        imgRef.current.style.display = 'none'
    }

  return (
    <div className={styles.cardWrapper}>
        {dog && 
            <Link to={`/detail/${dog.id}`} className={styles.card}>
                <header className={styles.cardHeader}>
                    {
                        dog.image !== null && 
                            <img
                                className={styles.image}
                                src={dog.image}
                                alt={dog.name}
                                onError={hiddenImgError}
                                ref={imgRef} />
                    }
                    <img className={styles.imagePlaceHolder} src="https://cdn.pixabay.com/photo/2017/03/25/14/26/animals-2173635_960_720.jpg" alt='placeholder'/>
                </header>
                <main className={styles.cardMain}>
                    <div className={styles.nameCont}>
                        <h3 className={styles.dogName}>{dog.name}</h3>
                    </div>
                    <div className={styles.temperamentsCont}>
                        <div className={styles.weight}>{`Weight: ${dog.weight.split(' - ').length <= 1 ? verifOrder(dog.weight.split(' - ')): dog.weight.split(' - ')[0] === "NaN" ? `0 - ${dog.weight.split(' - ')[1]}` : dog.weight} kg`}</div>
                        {
                            dog.temperamento && dog.temperamento.map((temper, i) =>
                                <div key={i} className={styles.temperament}>{temper}</div>
                                )
                        }
                    </div>
                </main>
            </Link>
        }
    </div>
  )
}
