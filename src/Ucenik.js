import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useFetch from './useFetch';

export default function Ucenik({vrsta}) {

    const {id} = useParams();
    const {data: ucenik} = useFetch('http://localhost:8000/ucenik/' + id)
    const history = useHistory();

    const handleDelete = () => {
        fetch('http://localhost:8000/ucenik/' + ucenik.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/')
        })
    }

    
  return (
    <div className='blog-details'>
        { ucenik && (
            <article>
                <h2>{ucenik.ime}</h2>
                <p>Odeljenje: {ucenik.odeljenje}</p>
                {ucenik.predmet.map((s, i) => (
                      <div key={ucenik.id+s}>
                      <p key={ucenik.id}>Predmeti: {s}</p>
                      <p key={ucenik.id+ucenik.ime}>Ocena: {ucenik.ocene[i]}</p>
                      </div>
                ))} 
                <div>
                    {(vrsta !== 'ucenik') ? <button onClick={handleDelete}>Obrisi</button> : ''}
                </div>
            </article>
        )}
    </div>
  )
}
