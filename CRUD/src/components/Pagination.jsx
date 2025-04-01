import React from 'react'

const Pagination = ({ pages, pageHandler, currentPage }) => {
    const array = []
    for (let i = 0; i < pages; i++) {
        array.push(i)
    }
    return (
        <>
            {
                array.map((array, index) => (
                    <button className={currentPage === index + 1 ? "bg-gray-300 p-3 text-gray-900 mx-2 cursor-pointer" : "bg-gray-500 p-3 mx-2 hover:bg-gray-300 hover:text-gray-900 cursor-pointer"} key={index} onClick={() => pageHandler(index + 1)}>{index + 1}</button>
                ))
            }
        </>
    )
}

export default Pagination