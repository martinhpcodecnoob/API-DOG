import React, {useEffect,useState,useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown,faArrowDown19, faArrowDownAZ, faArrowUp91, faArrowUpZA} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from 'react-redux'
import {orderBreed,orderWeight} from '../../redux/actions/index';
import styles from './FilterOrder.module.css'
import { ordersOptions } from '../../redux/actions/index';

export default function FilterOrder() {
    const dispatch = useDispatch();
    const order = useSelector(state => state.order)
    const [orderIsOpen, setOrderIsOpen] = useState(false);
    const orderWrapperRef = useRef()

    const orderIcon = [faArrowDownAZ, faArrowUpZA, faArrowDown19, faArrowUp91]

    const orderHandler = (orderN)=>{
        if (ordersOptions[0].name === orderN || ordersOptions[1].name === orderN) {
            dispatch(orderBreed(orderN))
            setOrderIsOpen(false)
            return 
        }
        if (ordersOptions[2].name === orderN || ordersOptions[3].name === orderN) {
            dispatch(orderWeight(orderN))
            setOrderIsOpen(false)
            return 
        }
    }

    function handleClickOutside(event) {
        if (orderWrapperRef.current && !orderWrapperRef.current.contains(event.target)) {
            setOrderIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    });
    
  return (
    <>
        <div ref={orderWrapperRef} className={styles.ordersTotal}>
            <button onClick={() => setOrderIsOpen(!orderIsOpen)} className={`${orderIsOpen ? `${styles.button} ${styles.open}`: `${styles.button} ${styles.close}`}`}>
                <span className={styles.orderIcon}><FontAwesomeIcon icon={orderIcon[order.id]} size='lg' fixedWidth/></span>
                <span>ORDER BY</span>
                <FontAwesomeIcon icon={faAngleDown} size='1x' fixedWidth />
            </button>

            <div className={orderIsOpen ? styles.orderDropdownOpen : styles.orderDropdownClosed}>
                <div className={styles.orderDropdownBody}>
                    {ordersOptions.map((orderMap, i) =>(
                            <button className={styles.option} key={i} onClick={() => orderHandler(orderMap.name)}>
                                <FontAwesomeIcon icon={orderIcon[i]} size='lg' fixedWidth/>
                                <span className={styles.orderName} style={orderMap.id === order.id ? {fontWeight:'800'} : {}}>{orderMap.name}</span>
                            </button>
                    ))
                    }
                </div>
            </div>
        </div>
    </>
  )
}
