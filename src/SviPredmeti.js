import React from 'react'
import PoOceni from './PoOceni';
//import { Link } from 'react-router-dom'

export default function SviUcenici({ucenici, imeNaslov, predmetU, odeljenjeU}) {

  
  
  const indexPredmeta = (element) => element === predmetU;

  return (
    <div className='blog-list'>
      <h2>{imeNaslov}</h2>
        {ucenici.map((uc) => {
          let i = uc.predmet.findIndex(indexPredmeta)
          if ((i>-1) && (uc.odeljenje === odeljenjeU))
          return (
            <div className='blog-preview' key={uc.id}>                      
            <PoOceni ime={uc.ime} odeljenje={uc.odeljenje} id={uc.id} i={i}/>
            </div>
            )
          })
        }
    </div>
  )
}


