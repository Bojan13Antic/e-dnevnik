import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import useFetch from './useFetch'

export default function CreateUcenik() {
    const [ime, setIme] = useState('')
    const [odeljenjeID, setOdeljenjeID] = useState('III/1')
    const history = useHistory();
    const ocene = [];
    const [odeljenje, setOdeljenje] = useState('III/1')
    const [predmet, setPredmet] = useState(["Srpski jezik","Matematika","Muzička kultura","Likovna kultura","Engleski jezik","Fizičko vaspitanje","Priroda i društvo"])
    const {data: predmeti} = useFetch('http://localhost:8000/predmeti')
    const [sifra, setSifra] = useState('')


    useEffect (() => {
        if ((predmeti !== null))
        {predmeti.map((pr) => {
            if (pr.odeljenjeNaziv === odeljenjeID)   
            {   setOdeljenje(pr.odeljenjeNaziv)
                setPredmet(pr.predmetNiz)
            }
        })}
    },[odeljenjeID])

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let i=0; i<predmet.length; i++) {
            ocene.push(0)
        }

        const ucenik = {ime, sifra, odeljenje, predmet, ocene}

        fetch('http://localhost:8000/ucenik', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(ucenik)
        }).then(() => {
            //history.push('/')
        })
    }

    if ((predmeti !== null))
  return (
    <div className='create'>
        <h2>Dodaj ucenika</h2>
        <form
        onSubmit={handleSubmit}>
            <label>
                Ime i prezime:
            </label>
            <input 
            type='text'
            required
            value={ime}
            onChange={(e) => setIme(e.target.value)}
            />
            <label>
                sifra:
            </label>
            <input 
            type='text'
            required
            value={sifra}
            onChange={(e) => setSifra(e.target.value)}
            />
            <label>Odeljenje:</label>
            <select
            value={odeljenjeID}
            onChange={(e) => setOdeljenjeID(e.target.value)}
            >
                {predmeti.map((svi) => (
                    <option value={svi.odeljenjeNaziv} key={svi.odeljenjeNaziv}>{svi.odeljenjeNaziv}</option>
                ))}
            </select>
            <button>Dodaj ucenika</button>
        </form>
    </div>
  )
}
    
  