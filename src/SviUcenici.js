import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import useFetch from './useFetch'


export default function SviUcenici({vrednost, vrsta, ucid}) {

  const [odeljenjeU, setOdeljenjeU] = useState('III/1')
  const {data: predmeti} = useFetch('http://localhost:8000/predmeti')
  const {data: ucenici} = useFetch('http://localhost:8000/ucenik')

  if ((predmeti !== null) && (ucenici !== null) && (vrsta.includes('razredni')) && (!vrsta.includes('direktor')) ) {
    return (
      <>
    <div className='Home'>
      <div className='create'>
      <p>Odeljenje: {vrednost}</p>
        </div>
      </div>
    
    <div className='blog-list'>
      
        {ucenici.map((uc) => {
            if (uc.odeljenje === vrednost)
            return (
            <div className='blog-preview' key={uc.id}>
                <Link to={`/ucenik/${uc.id}`}>
                    <h2>{uc.ime}</h2>
                    <p>Odeljenje: {uc.odeljenje}</p>
                </Link>
            </div>
        )})}
        
    </div>
    </>
    )
  } else if ((predmeti !== null) && (ucenici !== null) && (vrsta.includes('direktor'))) {
  return (

    <>
    <div className='Home'>
      <div className='create'>
        <label>Odeljenje:</label>
            <select
            value={odeljenjeU}
            onChange={(e) => setOdeljenjeU(e.target.value)}
            >
                {predmeti.map((svi) => (
                    <option value={svi.odeljenjeNaziv} key={svi.odeljenjeNaziv}>{svi.odeljenjeNaziv}</option>
                ))}
            </select>
        </div>
      </div>
    
    <div className='blog-list'>
      
        {ucenici.map((uc) => {
            if (uc.odeljenje === odeljenjeU)
            return (
            <div className='blog-preview' key={uc.id}>
                <Link to={`/ucenik/${uc.id}`}>
                    <h2>{uc.ime}</h2>
                    <p>Odeljenje: {uc.odeljenje}</p>
                </Link>
            </div>
        )})}
        
    </div>
    </>
  ) } else if ((predmeti !== null) && (ucenici !== null) && (vrsta.includes('ucenik'))) {
    return (
      <>
    <div className='blog-list'>
        {ucenici.map((uc) => {
            if ((uc.odeljenje === vrednost) && (uc.id === ucid))
            return (
            <div className='blog-preview' key={ucid}>
                <Link to={`/ucenik/${ucid}`}>
                    <h2>{uc.ime}</h2>
                    <p>Odeljenje: {uc.odeljenje}</p>
                </Link>
            </div>
        )})}  
    </div>
    </>
    )
  }
}
