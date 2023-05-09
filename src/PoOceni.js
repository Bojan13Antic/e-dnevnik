import React, {useState} from 'react'
import useFetch from './useFetch'

export default function PoOceni({ime, odeljenje, id, i}) {

    const [novaOcena, setNovaOcena] = useState(1)
    const {data: ucenik} = useFetch('http://localhost:8000/ucenik/' + id)

    const promeniOcenu = () => {
        
    let ocene = ucenik.ocene
    let predmet = ucenik.predmet
    let sifra = ucenik.sifra

        ocene.splice(i, 1, novaOcena)

    const ucenikUp = {ime, sifra, odeljenje, predmet, ocene}

        fetch('http://localhost:8000/ucenik/' + id, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(ucenikUp)
        }).then(() => {
            
            //console.log(ocene)
            //history.push('/')
        })
      }


if (ucenik !== null)
        return (
    <>
        <h2>{ucenik.ime}</h2>
        <p>Odeljenje: {ucenik.odeljenje}</p>
        <p>Ocena: {ucenik.ocene[i]}</p>
            <button onClick={promeniOcenu}>Promeni ocenu</button>
            <select
            value={novaOcena}
            onChange={(e) => setNovaOcena(parseInt(e.target.value))}
            >
                <option value={1} key={1}>1</option>
                <option value={2} key={2}>2</option>
                <option value={3} key={3}>3</option>
                <option value={4} key={4}>4</option>
                <option value={5} key={5}>5</option>
            </select>
    </>
  )
}
