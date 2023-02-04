import React from 'react'
import styles from './SourceApiBYbd.module.css'
import { originOp, orderBreed } from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SourceApiBYbd() {
    const filterByOrigin = useSelector(state => state.filterBYorder.filterObjetBDandAPI)
    const dispatch = useDispatch();
    const originToggleHandler = (origin) => {
        dispatch(origin.filterr())
        dispatch(orderBreed("Name (A - Z)"))
    }
  return (
    <div className={styles.filterByOriginBody}>
        {
            originOp.map((origen, i)=>(
                <button key={i} className={styles.originToggle} onClick={() => originToggleHandler(origen)}>
                    <div className={styles.checkbox}>
                        <FontAwesomeIcon icon={filterByOrigin.id === origen.id ? faCircleCheck : faCircle} size='lg' fixedWidth />
                    </div>
                    <div className={styles.toggleName}>
                        {origen.name}
                    </div>
                </button>
            ))
        }
    </div>
  )
}
