//import SviUcenici from './SviUcenici'
import useFetch from './useFetch'
import React, {useState} from 'react'
import SortingTable from './components/SortingTable'

export default function Home({vrednost, vrsta}) {

    const {data: ucenici} = useFetch('http://localhost:8000/ucenik')
    const {data: predmeti} = useFetch('http://localhost:8000/predmeti')
    const [odeljenjeU, setOdeljenjeU] = useState('III/1')

    if ((predmeti !== null) && (ucenici !== null) && (vrsta.includes('razredni')) && (!vrsta.includes('direktor')) ) {
    return (
    <>
    <div className='Home'>
      <div className='create'>
        <p>Odeljenje: {vrednost}</p>
        </div>

        <SortingTable ucenici={ucenici} odeljenjeU={vrednost}/>
    </div>
    </>
  )} else if (((predmeti !== null) && (ucenici !== null) && (vrsta.includes('direktor')))) {
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

        <SortingTable ucenici={ucenici} odeljenjeU={odeljenjeU}/>
      
    </div>

    
    </>
  )}
}
