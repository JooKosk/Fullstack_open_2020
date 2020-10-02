import React from 'react'

const Filter = ({filterText, handleFilter}) => {
    return (
        <div>
            filter shown with <input value={filterText} onChange = {handleFilter}></input>
            </div>
    )
}

export default Filter