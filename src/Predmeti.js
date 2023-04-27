import React, {useState} from 'react'
import Odeljenja from './Odeljenja'

export default function Predmeti({predmeti, odeljenja, odabraniPredmeti, predajeCallback }) {

    const [predmet, setPredmet] = useState(predmeti[0])

    const handlePredaje = (predaje) => {
        predajeCallback(predaje);
      };

    //console.log(odabraniPredmeti)
    //console.log(predmeti)

  return (
    <div className='create'>
        <select
            value={predmet}
            onChange={(e) => setPredmet(e.target.value)}
            >
                {odabraniPredmeti.map((jedanPredmet) => {
                    if (jedanPredmet.predmet === "Srpski jezik") {
                        console.log('jeste srpski')
                    } else {
                        console.log('nije srpski')
                    }
                })}
                {predmeti.map((pr) => (
                    <option value={pr} key={pr}>{pr}</option>
                ))}
            </select>
        <div className='odeljenja'>
            <Odeljenja odeljenja={odeljenja} predmet={predmet} birajPredaje={handlePredaje}/>
        </div>
        
    </div>
  )
}