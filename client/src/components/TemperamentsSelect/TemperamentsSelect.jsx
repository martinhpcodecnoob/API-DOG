import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TemperamentsSelect.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { faCircle,faSquare } from '@fortawesome/free-regular-svg-icons'
import { allTemper } from "../../redux/actions";
import { filter_temper,ofBack_allDogs, orderBreed,setPage } from "../../redux/actions";
import { useLocation } from "react-router-dom";

    const TemperamentsSelect = ({ filtering, input, setInput}) => {
    const dispatch = useDispatch();
    let { pathname } = useLocation();
    const temper = useSelector((state) => state.temper);
    const [tempToSearch, setTempToSearch] = useState("");

    const filterBYorder = useSelector((state) => state.filterBYorder);
    const filterByTemperament = filterBYorder.FOtemper
    const setFilterByTemperament = (filter) => dispatch(filter_temper(filter));

        const tempToggleHandler = async(e) => {
            e.stopPropagation();
            let value = e.target.children[1].innerText;
            if (filtering) {
                if (filterByTemperament !== value) {
                    dispatch(ofBack_allDogs())
                    setFilterByTemperament(value);
                    dispatch(orderBreed("Name (A - Z)"))
                    dispatch(setPage(1))
                } else {
                    setFilterByTemperament("");
                    dispatch(ofBack_allDogs())
                    dispatch(orderBreed("Name (A - Z)"))
                    dispatch(setPage(1))
                }
            } else{
                if (!input.temperamento.some((t) => t === value)) {
                    setInput({ ...input, temperamento: [...input.temperamento, value] });
                    } else {
                    setInput({
                        ...input,
                        temperamento: input.temperamento.filter((t) => t !== value),
                    });
                    }
            }
            setTempToSearch("");
        };


        
        useEffect(() => {
            !temper && dispatch(allTemper());
        });

        switch (pathname.split("/")[1]) {
            case "create":
                return(
                    <>
    <div className={styles.filterHeader}>
        <div className={styles.filterTitle}>
            Temperaments
            {input.temperamento.length > 0 && (
                    <div>{input.temperamento.length}</div>
                )}
        </div>
        {temper.length > 0 && <div className={filtering ? styles.searchFilter : styles.searchFilter2}>
        <input
            className={styles.searchFilterInput}
            placeholder="Search..."
            type="text"
            name="filterByTemperament"
            id="inputfilterByTemperament"
            onChange={(e) => setTempToSearch(e.target.value.toLowerCase())}
            value={tempToSearch}
            />
            </div>}
        </div>
        <div className={styles.tempCont}>
            {temper.length === 0 ? (
            <span className={styles.nothing}>Loading temper...</span>
            ) : temper &&
            temper.filter((t) => t.name.toLowerCase().startsWith(tempToSearch)).length > 0 ? (
            temper
                .filter((t) => t.name.toLowerCase().startsWith(tempToSearch))
                .map((t) => (
                <button
                    type="button"
                    key={t.id}
                    value={t.name}
                    className={styles.tempToggle}
                    onClick={tempToggleHandler}
                >
                    <div className={styles.checkbox}>
                        <FontAwesomeIcon
                            icon={
                                input.temperamento.some((f) => f == t.name)
                                ? faCheckSquare
                                : faSquare
                            }
                            size="lg"
                            fixedWidth
                        />
                    </div>
                    <div className={styles.toggleName}>{t.name}</div>
                </button>
                ))
            ) : (
            <span className={styles.nothing}>No temper found :(</span>
            )}
        </div>
    </>
)
            default:
                return (
                    <>
                    <div className={styles.filterHeader}>
                        <div className={styles.filterTitle}>
                        Temperaments
                        </div>
                        {temper.length > 0 && (
                        <div className={styles.searchFilter}>
                            <input
                            className={styles.searchFilterInput}
                            placeholder="Search..."
                            type="text"
                            name="filterByTemperament"
                            id="inputfilterByTemperament"
                            onChange={(e) => setTempToSearch(e.target.value.toLowerCase())}
                            value={tempToSearch}
                            />
                        </div>
                        )}
                    </div>
                    <div className={styles.tempCont}>
                        {!temper ? (
                        <span className={styles.nothing}>Loading temper...</span>
                        ) : temper && temper.filter((t) => t.name.toLowerCase().startsWith(tempToSearch))
                        .length > 0 ? (
                            temper
                            .filter((t) => t.name.toLowerCase().startsWith(tempToSearch))
                            .map((t) => (
                            <button
                                type="button" key={t.id} value={t.name} className={styles.tempToggle}
                                onClick={tempToggleHandler}
                            >
                                <div className={styles.checkbox}>
                                {
                                    <FontAwesomeIcon
                                    icon={
                                        filterByTemperament === t.name
                                        ? faCircleCheck
                                        : faCircle
                                    }
                                    size="lg"
                                    fixedWidth
                                    />
                                }
                                </div>
                                <div className={styles.toggleName}>{t.name}</div>
                            </button>
                            ))
                        ) : (
                        <span className={styles.nothing}>No temper found :(</span>
                        )}
                    </div>
                    </>
                );    
        }
        
        };

export default TemperamentsSelect;