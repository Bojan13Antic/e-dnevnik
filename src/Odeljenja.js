import React, {useState, useEffect} from 'react'

export default function Odeljenja({odeljenja, predmet, birajPredaje}) {
    const [odeljenjaNiz, setOdeljenjaNiz] = useState([])

    useEffect(() => {
        setOdeljenjaNiz([])
    }, [predmet])

    const predaje = {
        "predmet": "",
        "odeljenja": [""]
    }

    const handleChange = (e) => {
        let v = e.target.value
        let i = odeljenjaNiz.indexOf(v)
        let prevNiz = odeljenjaNiz

        if (i<0) {
            prevNiz.push(v)
        } else {
            prevNiz.splice(i, 1)
        }

        setOdeljenjaNiz(prevNiz)

        const predaje = {
            "predmet": predmet,
            "odeljenja": odeljenjaNiz
        }

        birajPredaje(predaje)

        //console.log(predaje)
    }
   
  return (
    <div className='pojedinacno'>
        {odeljenja.filter(name => name.predmetNiz.includes(predmet)).map((o,i) => (
            <label key={o.odeljenjeNaziv}>
            <input 
            type='checkbox'
            value={o.odeljenjeNaziv}
            key={i}
            onChange={handleChange}
            />{o.odeljenjeNaziv}</label>
        ))}
    </div>
  )
}