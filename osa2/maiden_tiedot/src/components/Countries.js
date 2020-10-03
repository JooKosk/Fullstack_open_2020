import React from 'react'
import Country from './Country'

const Countries = ({countriesToShow}) => {
    return (
        <div>
            {countriesToShow.map(country => 
                <Country key = {country.numericCode} country = {country} languages = {country.languages}/>
            )}
        </div>
    )}


export default Countries