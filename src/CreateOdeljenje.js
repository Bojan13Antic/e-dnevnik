import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import useFetch from './useFetch'

export default function CreateOdeljenje() {
    const history = useHistory();
    const [odeljenjeNaziv, setOdeljenjeNaziv] = useState('III/4')
    const [predmetNiz, setPredmetNiz] = useState([])
    const {data: sviPredmeti} = useFetch('http://localhost:8000/sviPredmeti')
    
    const handleChange = (e) => {
        let v = e.target.value
        let i = predmetNiz.indexOf(v)
        let prevNiz = predmetNiz

        if (i<0) {
            prevNiz.push(v)
        } else {
            prevNiz.splice(i, 1)
        }

        setPredmetNiz(prevNiz)
    }
    
    

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(odeljenjeNaziv)
        console.log(predmetNiz)

        const predmeti = {odeljenjeNaziv, predmetNiz}

        console.log(predmeti)

        fetch('http://localhost:8000/predmeti', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(predmeti)
        }).then(() => {
            //history.push('/')
        })
    }

    if ((sviPredmeti !== null))
  return (
    <div className='create'>
        <h2>Dodaj odeljenje</h2>
        <form
        onSubmit={handleSubmit}>
            <label>
                Naziv odeljenja:
            </label>
            <input 
            type='text'
            required
            value={odeljenjeNaziv}
            onChange={(e) => setOdeljenjeNaziv(e.target.value)}
            />
            {sviPredmeti.map((p, i) => (
                <label key={p}>
                <input 
                type='checkbox'
                value={p}
                key={i}
                onChange={handleChange}
                />{p}</label>
            ))}
            <button>Dodaj odeljenje</button>
        </form>
    </div>
  )
}
    
  