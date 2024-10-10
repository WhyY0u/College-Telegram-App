import React from 'react'
import styles from './styles/TicketNavigate.module.css'
function TicketNavigate({handlePageChange, currentPage, visiblePages, totalPages}) {
  return (
    <div className={`${styles.ticket__list__user__pagination} ${styles.pagination}`}>
                    <button className={styles.pagination__arrow} onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                        &lt;&lt;
                    </button>
                    <button className={styles.pagination__arrow} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        &lt;
                    </button>

                    {visiblePages.map((number, index) => (
                        <button 
                            key={index} 
                            onClick={() => handlePageChange(number)} 
                            className={number === currentPage ? styles.pagination__active : styles.pagination__simple}
                            disabled={number === '...'}
                        >
                            {number}
                        </button>
                    ))}

                    <button className={styles.pagination__arrow} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        &gt;
                    </button>
                    <button className={styles.pagination__arrow} onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                        &gt;&gt;
                    </button>
                </div>
  )
}

export default TicketNavigate