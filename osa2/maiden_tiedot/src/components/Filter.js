import React from 'react'

const Filter = ({filterText, handleFilter }) => {
    return (
        <div>
            find countries <input value = {filterText} onChange = {handleFilter} />
        </div>
    )
}

export default Filter