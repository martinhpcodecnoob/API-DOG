import React,{useRef,useEffect} from 'react'
import { useDispatch,useSelector } from "react-redux";
import { all_breeds, clearModal } from '../../redux/actions';
import styles from './Modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
export default function Modal({reset, submit}) {
    const refModal = useRef()

    const dispatch = useDispatch()
    const modalDogCreatedSucess = useSelector(state => state.modalDogCreatedSucess)
    const modalDogCreatedFailed = useSelector(state => state.modalDogCreatedFailed)

    function handleClickOutside(event) {
        if (refModal.current && !refModal.current.contains(event.target)) {
            !modalDogCreatedFailed && reset()
            dispatch(clearModal())
            
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    if(modalDogCreatedSucess){
        return (
       
                <div className={styles.darkBg}>
                    <div ref={refModal} className={styles.modalSuccess}>
                        <header className={styles.modalHeader}>
                            <FontAwesomeIcon icon={faCircleCheck} size='6x' />
                        </header>
                        <main className={styles.modalMain}>
                            <h2>Great!</h2>
                            <p>Your dog's breed has been created successfully</p>
                            <div className={styles.modalButtons}>
                                <Link className={styles.secondaryButton} onClick={() => {dispatch(clearModal())
                                                                                        dispatch(all_breeds())}} to={'/home'}>Back to home</Link>
                                <button className={styles.accentButton} type='button' onClick={() => {reset(); dispatch(clearModal())}}>Create new</button>
                            </div>
                        </main>
                    </div>
                </div>

        )
    } else if(modalDogCreatedFailed) {
        return (
            
                <div className={styles.darkBg}>
                    <div ref={refModal} className={styles.modalFailed}>
                        <header className={styles.modalHeader}>
                            <FontAwesomeIcon icon={faCircleXmark} size='6x' />
                        </header>
                        <main className={styles.modalMain}>
                            <h2>Ooops!</h2>
                            <p>If name, origin and image must not be longer than 255 characters.</p>
                            <div className={styles.modalButtons}>
                                <button type='button' className={styles.yellowButton} onClick={(e) => {dispatch(clearModal())}}>
                                <FontAwesomeIcon icon={faRotateRight} size='sm' />
                                    Modify values
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
        
        )
    }else{
        return(
            <>
            </>
        )
    }
}
