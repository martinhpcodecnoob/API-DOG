import React, { useEffect,useRef} from 'react'
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../../components/NavBar/NavBar'
import DogCard from '../../components/DogCard/DogCard'
import Paginate from '../../components/Paginate/Paginate'
import styles from './HomePage.module.css'
import { all_breeds, allTemper, setTotalPages, dogsXpage, clear,Loading } from '../../redux/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import Loader from '../../components/Loader/Loader';

export default function HomePage() {
  const dispatch = useDispatch();
  const dogs = useSelector(state => state.dogs)
  const page = useSelector(state => state.page)
  const filterBYorder = useSelector(state => state.filterBYorder)
  const loader = useSelector(state => state.loader)
  const refCardsContainer = useRef();

  const startAgain = ()=>{
      dispatch(clear());
  } 
  const loadDispatch = async() =>{
      await dispatch(all_breeds());
      dispatch(allTemper());
      dispatch(Loading())
  }

  useEffect(() => {
    if (dogs.length === 0) {
      loadDispatch();
    }
  }, []);

  useEffect(() => {
    dispatch(setTotalPages());
  }, [dogs,filterBYorder]);

  useEffect(() => {
    if (dogs.length > 0) {
        refCardsContainer.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    
  }, [page]);

  if (loader === false) {
    return (
      <>
        <main className={styles.main}>
          <div><Navbar/></div>
          <section ref={refCardsContainer} className={styles.cardsContainer}>
            {
              dogs.length > 0
                ? dogs.slice(dogsXpage * (page-1),dogsXpage * page)
                      .map((dog, i)=>{
                        return <DogCard dog={dog} key={dog ? `dog-${dog.id}` : i}/>
                      })
                :(
                  <div className={styles.notFoundWrapper}>
                    <FontAwesomeIcon icon={faHeartBroken} size="10x"/>
                    <h4>No results found</h4>
                    <p>Please try with anothers keywords or filters</p>
                    <div className={styles.btnCreateA}>
                      <button onClick={() => startAgain()}>Start again</button>
                    </div>
                  </div>
                )
            }
            
            
          </section>
          <section className={styles.paginate}><Paginate/></section>
        </main>  
      </>
    )
  } else{
    return (<Loader/>)
  }
  
}
