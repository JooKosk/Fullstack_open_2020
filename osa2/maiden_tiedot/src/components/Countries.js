import React from 'react'
import Country from './Country'

const Countries = ({countriesToShow, handleClick}) => {

    if (countriesToShow.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countriesToShow.length < 10 && countriesToShow.length > 1) {
        return(
            countriesToShow.map(country =>
             <p key={country.numericCode}>
                 {country.name} <button onClick={()=> handleClick(country.name)}>show</button>       
             </p>)
            )} else {
            return (
                <div>
                    {countriesToShow.map(country => 
                        <Country key = {country.numericCode} country = {country} languages = {country.languages}/>
                    )}
                </div>
    )}}

export default Countries