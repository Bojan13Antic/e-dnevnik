import SviPredmeti from './SviPredmeti'
import useFetch from './useFetch'
import React, {useState} from 'react'



export default function Home({vrednost}) {

    const {data: ucenici} = useFetch('http://localhost:8000/ucenik')
    const [predmetU, setPredmetU] = useState(vrednost[0].predmet)
    const [odeljenjeU, setOdeljenjeU] = useState(vrednost[0].odeljenja[0])

if ((ucenici !== null))
    return (

    <div className='Home'>
        <div className='create'>
        <label>Predmet:</label>
            <select
            value={predmetU}
            onChange={(e) => setPredmetU(e.target.value)}
            >
            {vrednost.map(svi => (
                <option value={svi.predmet} key={svi.predmet}>{svi.predmet}</option>
            ))}
            </select>
            
            <label>Odeljenje:</label>
            <select
            value={odeljenjeU}
            onChange={(e) => setOdeljenjeU(e.target.value)}
            >
            {vrednost.filter(name => name.predmet.includes(predmetU)).map(svi => (svi.odeljenja.map(o => (
                <option value={o} key={o}>{o}</option>
                ))))}
            </select>
        </div>
        {(odeljenjeU !== '') && <SviPredmeti ucenici={ucenici} predmetU={predmetU} ime='Po predmetima' odeljenjeU={odeljenjeU}/>}
    </div>
  )
}
