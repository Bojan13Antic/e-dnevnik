import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import useFetch from './useFetch'
import Predmeti from './Predmeti'


export default function CreateProfesor({ noviPredmeti }) {
    const {data: nalozi} = useFetch('http://localhost:8000/nalozi')
    const {data: predmeti} = useFetch('http://localhost:8000/predmeti')
    const {data: sviPredmeti} = useFetch('http://localhost:8000/sviPredmeti')

    const [korisnik, setKorisnik] = useState('')
    const [sifra, setSifra] = useState('')
    const [razred, setRazred] = useState('III/1')
    const funkcije = ['profesor', 'razredni']
    const [funkcijaNiz, setFunkcijaNiz] = useState([])
    const [brojPredmeta, setBrojPredmeta] = useState(1)
    const [vrednosti, setVrednosti] = useState([noviPredmeti])
    const [nizPredaje, setNizPredaje] = useState([])

    const ucitaniPredmeti = [
        "Srpski jezik",
        "Matematika",
        "Svet oko nas",
        "Priroda i društvo",
        "Fizičko vaspitanje",
        "Muzička kultura",
        "Likovna kultura",
        "Engleski jezik",
        "Istorija",
        "Geografija",
        "Biologija",
        "Tehnika i tehnologija",
        "Informatika i računarstvo",
        "Fizika",
        "Hemija"
      ]

    const updateNizPredaje = (newPredaje) => {
        setNizPredaje((prevNizPredaje) => {
          const newNizPredaje = [...prevNizPredaje];
          const index = newNizPredaje.findIndex(
            (nizPredaje) => nizPredaje.predmet === newPredaje.predmet
          );
          if (index === -1) {
            newNizPredaje.push(newPredaje);
          } else {
            newNizPredaje[index] = newPredaje;
          }
          return newNizPredaje;
        });
      };

    const handleChange = (e) => {
        let v = e.target.value
        let i = funkcijaNiz.indexOf(v)
        let prevNiz = funkcijaNiz

        if (i<0) {
            prevNiz.push(v)
        } else {
            prevNiz.splice(i, 1)
        }
        setFunkcijaNiz(prevNiz)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const funkcija = [
            {
                "vrsta": '',
                "vrednost": ''
            }
        ]

        if (funkcijaNiz.length === 1) {
            funkcijaNiz.map((f,i) => {
                funkcija[i].vrsta = f
                if (f === 'razredni') {funkcija[i].vrednost = razred}
                if (f === 'profesor') {
                        funkcija[i].vrednost = []
                        funkcija[i].vrednost[0] = nizPredaje[0]
                    if (nizPredaje.length > 1) {
                        funkcija[i].vrednost = []
                        nizPredaje.map((n) => {
                        funkcija[i].vrednost.push(n)
                        })
                    }
                }
            })
        } else {
            funkcija.push({
                "vrsta": '',
                "vrednost": ''
            })
            funkcijaNiz.map((f,i) => {
                funkcija[i].vrsta = f
                if (f === 'razredni') {funkcija[i].vrednost = razred}
                if (f === 'profesor') {
                    funkcija[i].vrednost = []
                    funkcija[i].vrednost[0] = nizPredaje[0]
                if (nizPredaje.length > 1) {
                    funkcija[i].vrednost = []
                    nizPredaje.map((n) => {
                    funkcija[i].vrednost.push(n)
                    })
                }
            }
            })
        }

        const nalozi = {korisnik, sifra, funkcija}

        fetch('http://localhost:8000/nalozi', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(nalozi)
        }).then(() => {
            //history.push('/')
        })

        console.log(nalozi)

    }

    if ((nalozi !== null) && (predmeti !== null) && (sviPredmeti !== null))
  return (
    <div className='create'>
        <h2>Dodaj Profesora</h2>
        <form
        onSubmit={handleSubmit}>
        <label>Ime i Prezime</label>
        <input 
            type='text'
            required
            value={korisnik}
            onChange={(e) => setKorisnik(e.target.value)}
            />
        <label>Sifra</label>
        <input 
            type='text'
            required
            value={sifra}
            onChange={(e) => setSifra(e.target.value)}
            />
        <label>Funkcija</label>
        {funkcije.map((p, i) => (
                <label key={p}>
                <input 
                type='checkbox'
                value={p}
                key={i}
                onChange={handleChange}
                />{p}</label>
            ))}
        <label>Odeljenje</label>
        <select
            value={razred}
            onChange={(e) => setRazred(e.target.value)}
            >
                {predmeti.map((pr) => (
                    <option value={pr.odeljenjeNaziv} key={pr.odeljenjeNaziv}>{pr.odeljenjeNaziv}</option>
                ))}
            </select>

            <label>
            <input 
                type='number'
                value={brojPredmeta}
                onChange={(e) => {
                    let prevBroj = parseInt(e.target.value)
                    setBrojPredmeta(parseInt(e.target.value))
                    if (prevBroj > brojPredmeta) {
                        nizPredaje.map((n) => {
                            let i = ucitaniPredmeti.indexOf(n.predmet)
                            if (i > -1) {
                                ucitaniPredmeti.splice(i,1)
                            }
                            console.log(ucitaniPredmeti)
                        })
                        vrednosti.push(ucitaniPredmeti)
                    } else {
                        vrednosti.pop()
                        nizPredaje.pop()
                    }
                }}
                />Broj predmeta</label>
            
            {vrednosti.map((v, i) => {
                return <Predmeti predmeti={vrednosti[i]} odeljenja={predmeti} key={i} odabraniPredmeti={nizPredaje} predajeCallback={updateNizPredaje}/>
            })}
            <button>Dodaj profesora</button>
            </form>
    </div>
  )
}