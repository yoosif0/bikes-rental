import React from 'react'
import ReactPaginate from 'react-paginate';



export const PaginationContainer = ({ pageCount, handlePageClick }) => (

    <div id="react-paginate">
        <ReactPaginate previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => handlePageClick(Math.ceil(data.selected * 10))}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"} />
    </div>
)