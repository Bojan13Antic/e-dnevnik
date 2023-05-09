import React, {useState} from 'react'
import useFetch from './useFetch'
import Profesor from './Profesor'

export default function SviProfesori() {

    const {data: profesori} = useFetch('http://localhost:8000/nalozi')

    if (profesori !== null) {
        return (
            <div>
            {profesori.map((prof) => {
                if (prof.funkcija[0].vrsta !== 'direktor') return (
                    <Profesor prof={prof} key={prof.id}/>
                )})} 
            </div>
          )
    }
}
