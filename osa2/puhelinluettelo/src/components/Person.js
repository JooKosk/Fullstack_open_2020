import React from 'react'

const Person = (props) => {
    return (
    <>
        <Details name = {props.name} number = {props.number} />
    </>
)}

const Details = (props) => {
    return (
        <>
        {props.name} {props.number}
        </>
    )
    }

export default Person