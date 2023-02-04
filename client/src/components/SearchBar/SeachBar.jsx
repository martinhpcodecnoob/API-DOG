import React,{useState}from "react";
import styles from './SeachBar.module.css'
import { allDogName } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function SeachBar() {
    const [nombre, setNombre] = useState("");
    const dispatch = useDispatch();
    const handleInput = (e) => {
        e.preventDefault();
        setNombre(e.target.value);
    };
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(nombre);
        dispatch(allDogName(nombre));
        setNombre("")
    }
    return (
        <div className={styles.containerBuscar}>
        <div className={styles.Buscar}>
            <input
            type="text"
            value={nombre}
            className={styles.inputBuscar}
            placeholder="Search breeds..."
            onChange={(e) => handleInput(e)}
            />

            <button className={styles.btnBuscar} onClick={(e) => handleSubmit(e)}>
            <svg className={styles.search__icon} aria-hidden="true" viewBox="0 0 24 24">
                <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
            </svg>
            </button>
        </div>
        </div>
    );
}
