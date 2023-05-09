import React from 'react'

export default function Profesor({prof}) {

    const handleDelete = () => {
        fetch('http://localhost:8000/nalozi/' + prof.id, {
            method: 'DELETE'
        }).then(() => {
            //history.push('/')
        })
    }

  return (
    <div className='blog-details' key={prof.id}>
        <h2>Ime: {prof.korisnik}</h2>
        {prof.funkcija.map((vr)=> {  // za svaku funkciju koju profesor obavlja
            if (vr.vrsta === 'profesor') {
                return (
                    vr.vrednost.map((pr) => { //  za svaki predmet koji predaje
                        return (
                            <>
                            <h3>Predmet: {pr.predmet}</h3>
                            {pr.odeljenja.map((od) => {
                            return (
                                <p>Odeljenje: {od}</p>
                            )
                            })}
                            </>
                        )
                }))} else if (vr.vrsta === 'razredni') {
                return (
                    <h3>Razredni: {vr.vrednost}</h3>
                )}
        })}
        <button onClick={handleDelete}>Obrisi</button>
    </div>
  )
}
