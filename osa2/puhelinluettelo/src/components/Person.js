import React from 'react'

const Person = (props) => {
    return (
    <div>
        <Details name = {props.name} number = {props.number} />
    </div>
)}

const Details = ({name, number}) => (
    <p>{name} {number}</p>
)

export default Person