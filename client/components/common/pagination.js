import React from 'react'
import _ from 'lodash'

const Pagination = ({ itemsCount, pageSize, handlePageChange, currentPage }) => {

  const pagesCount = Math.ceil(itemsCount / pageSize) // to prevent only 1 page in pagination
  // use lodash to create [1 ... pagesCount].map()
  if (pagesCount === 1) return null
  const pages = _.range(1, pagesCount + 1)

  return <>
    <ul className="pagination">
      { pages.map((page) => {
        return <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
          <div className="page-link" onClick={() => handlePageChange(page)}>{page}</div>
        </li>
      })
      }
    </ul>
  </>
}
 
export default Pagination
