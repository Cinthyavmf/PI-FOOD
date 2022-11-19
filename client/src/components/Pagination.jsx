import React from 'react';
import {useState} from 'react';
import style from './Pagination.module.css'

const Pagination = function({page, setPage, totalPages}) {

    const [currentPage, setCurrentPage] = useState(1);


    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        setPage(page + 1);
    }

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
        setPage(page - 1);
    }

    let pages = [];
    let n = 1;

    while(n < totalPages + 1) {
        pages.push(n);
        n++;
    }

    return (

    <div className={style.pagination}>
        {/* <h2>{currentPage} de {totalPages}</h2> */}
        <div className = {style.pages}>
            <button className = {style.nextPrev} onClick = {handlePrev} disabled = {currentPage <= 1}>Prev.</button>
            {pages.map((p) => <button className = {style.pages} onClick = {() => {setCurrentPage(p); setPage(p)}} disabled={currentPage === p}>{p}</button>)}
            <button className = {style.nextPrev} onClick = {handleNext}disabled = {currentPage >= totalPages}>Next</button>
        </div>
    </div>
)}

export default Pagination;