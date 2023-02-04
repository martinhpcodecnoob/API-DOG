import React,{useRef,useState,useEffect} from 'react'
import styles from './NavBar.module.css'
import SeachBar from '../SearchBar/SeachBar'
import FilterOrder from '../../components/FilterOrder/FilterOrder'
import { all_breeds,allTemper,setPage,clearId } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import TemperamentsSelect from '../TemperamentsSelect/TemperamentsSelect'
import SourceApiBYbd from '../SourceApiBYbd/SourceApiBYbd'
import { faAngleDown,faFilter,faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link,useLocation } from "react-router-dom";

export default function NavBar() {
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const filterWrapperRef = useRef()
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const startAgain = ()=>{
      dispatch(all_breeds());
      dispatch(allTemper());
  } 
  function handleClickOutside(event) {
    if (filterWrapperRef.current && !filterWrapperRef.current.contains(event.target)) {
      setFilterIsOpen(false)
      }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    };
});

  switch (pathname.split("/")[1]) {
    case "create":
      return(
        <div>
        <div className={styles.titleSearchCreate}>
          <div className={styles.piDogs}>
              <Link to={'/home'}  
                    style={{right:'6px'}}
                    onClick={() => dispatch(clearId())}
                    className={`${styles.searchButton} ${styles.visible}`}>
                  <FontAwesomeIcon icon={faArrowLeft} size='lg' />
              </Link>
          </div>
        </div>
      </div>
      )
    case "detail":
      return(
      <div>
        <div className={styles.titleSearchCreate}>
          <div className={styles.piDogs}>
              <Link to={'/home'}  
                    style={{right:'6px'}}
                    onClick={() => dispatch(clearId())}
                    className={`${styles.searchButton} ${styles.visible}`}>
                  <FontAwesomeIcon icon={faArrowLeft} size='lg' />
              </Link>
          </div>
          <div className={styles.btnCreateB}>
            <button>
              <Link to="/create">
                Create breed
              </Link>
            </button>
          </div>
        </div>
      </div>
      )
    default:
      return (
        <div>
          <div className={styles.titleSearchCreate}>
            <div className={styles.piDogs}>
              <span onClick={() => {
                            dispatch(setPage(1))
                            startAgain()
                          }}>PI-DOGS</span>
            </div>
            <div><SeachBar/></div>
            <div className={styles.btnCreateB}>
              <button>
                <Link to="/create">
                  Create breed
                </Link>
              </button>
            </div>
          </div>
          <div className={styles.filterBYorder}>
            <div><FilterOrder/></div>
    
            <div><SourceApiBYbd/></div>
            
            <div ref={filterWrapperRef} className={styles.toggles}>
              <button onClick={() => setFilterIsOpen(!filterIsOpen)} className={`${filterIsOpen ? `${styles.button} ${styles.open}` : `${styles.button} ${styles.closed}`}`}>
                <span className={styles.filterIcon}><FontAwesomeIcon icon={faFilter} size='lg' fixedWidth /></span>
                <span>FILTER BY</span>
                <FontAwesomeIcon icon={faAngleDown} size='1x' fixedWidth/>
              </button>
              <div className={filterIsOpen ? styles.filterDropdownOpen : styles.filterDropdownClosed}>
                <div className={styles.filterDropdownBody}>
                  <div className={styles.temperamentsWrapper}>
                    <TemperamentsSelect filtering={true}/>
                  </div>
                </div>
              </div>
            </div>
    
          </div>
        </div>
      )
  }

  
}
