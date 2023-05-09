import './App.css';
import React, {useState} from 'react'
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CreateUcenik from './CreateUcenik';
import CreateOdeljenje from './CreateOdeljenje';
import CreateProfesor from './CreateProfesor'; 
import Ucenik from './Ucenik';
import NotFound from './NotFound';
import Home2 from './Home2'
import SviUcenici from './SviUcenici';
import useFetch from './useFetch'
import SviProfesori from './SviProfesori';



function App() {

  const [korisnik, setKorisnik] = useState('')
  const [pass, setPass] = useState('')
  const [vrsta, setVrsta] = useState('unesi')
  const [vrednost, setVrednost] = useState({})
  const [funkcija, setFunkcija] = useState({})
  const [nizDozvola, setNizDozvola] = useState([])
  const [razred, setRazred] = useState('')
  const [ucid, setUcId] = useState('')

//  const [novaSifra, setNovaSifra] = useState('teapavlović')
//  const [broj, setBroj] = useState(1)

  const {data: nalozi} = useFetch('http://localhost:8000/nalozi')   // uzima sve naloge u objekat nalozi
  const {data: ucitaniPredmeti} = useFetch('http://localhost:8000/sviPredmeti')
  const {data: ucenici} = useFetch('http://localhost:8000/ucenik')

  const traziKorisnika = () => {
   if (nalozi.some(n => {                                       
      if ((korisnik === n.korisnik) & (pass === n.sifra)){      //proverava da li se user name i password upisanog korisnika poklapaju sa nekim iz baze (nalozi)

        let nizDozvola = [];

        {n.funkcija.map((f) => {            // za svaku funkciju datu jer moze da ih bude vise, recimo razredni i profesor
          nizDozvola.push(f.vrsta)          // dodaje u niz dozvola
        })}

        if (n.funkcija[1] !== undefined) {
          setRazred(n.funkcija[1].vrednost)    // izvlaci iz podataka korisnika (iz baze) kom odeljenju je razredni (jer je 1 pozicija za razrednog, podrazumeva se da su svi razredni ujedno i profesori)
        }
        setNizDozvola(nizDozvola)            // izvlaci niz u varijablu
        setVrsta(n.funkcija[0].vrsta)        // vrsta naloga - da li je profesor ili je direktor i to se ispisuje
        setVrednost(n.funkcija[0].vrednost)  // kom odeljenju je profesor i kom odeljenju
        setFunkcija(n.funkcija)              // objekat sa svim funkcijama (profesor i razredni npr)
        return true
        }
    })) {} else {
      if (ucenici.some(u => {
        if ((korisnik === u.ime) && (pass === u.sifra)) {
          setVrsta('ucenik')
          setNizDozvola('ucenik')
          setRazred(u.odeljenje)
          setUcId(u.id)
          return true
        }
      })) {} else {setVrsta('Losa sifra')}
      }
  }

/*  const napraviSifru = () => {

    
      let tempUcenik = ucenici[broj]
    
      let tempSifra = tempUcenik.ime.toLowerCase()
      tempSifra = tempSifra.replace(/\s+/g, '')
      setNovaSifra(tempSifra)
  
      let id = tempUcenik.id
  
      let sifra = novaSifra
      let ime = tempUcenik.ime
      let odeljenje = tempUcenik.odeljenje
      let predmet = tempUcenik.predmet
      let ocene = tempUcenik.ocene
  
  
      const noviUcenik = {ime, sifra, odeljenje, predmet, ocene}
  
      fetch('http://localhost:8000/ucenik/' + id, {
              method: 'PUT',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(noviUcenik)
          }).then(() => {
              
              //console.log(ocene)
              //history.push('/')
          })
    
    //let tempUcenik = ucenici[0]
    

  }*/

  if ((nalozi !== null) && (ucitaniPredmeti !== null) && (ucenici !== null))

  return (
    <Router>
    <div className='App'>
      <Navbar vrsta={nizDozvola}/>
      <div className='content'>
        <Switch>
          <Route exact path="/">
            <div>
              <h1>Dobrodosli na sajt škole!</h1>
              <p>Unesite korisničko ime i šifru</p>

              <input
              type='text'
              value={korisnik}
              onChange={(e) => setKorisnik(e.target.value)}
              ></input>
              <input
              type='text'
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              ></input>
              <button onClick={traziKorisnika}>Trazi</button>
              {/*<button onClick={napraviSifru}>Sifra</button>
              <input
              type='number'
              value={broj}
              onChange={(e) => setBroj(e.target.value)}
              ></input>
              <p>{novaSifra}</p>*/}
              <p>{vrsta}</p>
            </div>
          </Route>

          <Route exact path="/poPredmetu">
            <Home2 vrednost={vrednost} />
          </Route>

          <Route path="/createUcenik">
            <CreateUcenik />
          </Route>

          <Route path="/createOdeljenje">
            <CreateOdeljenje/>
          </Route>

          <Route path="/createProfesor">
            <CreateProfesor noviPredmeti={ucitaniPredmeti}/>
          </Route>

          <Route exact path="/poOdeljenju">
            <Home vrednost={razred} vrsta={nizDozvola}/>
          </Route>

          <Route exact path="/poUceniku">
            <SviUcenici vrednost={razred} vrsta={nizDozvola} ucid={ucid}/>
          </Route>

          <Route exact path="/SviProfesori">
            <SviProfesori/>
          </Route>

          <Route path="/ucenik/:id">
            <Ucenik vrsta={nizDozvola}/> 
          </Route>

          <Route path="*">
            <NotFound />
          </Route>

        </Switch>
      </div>
      
    </div>
    </Router>
  );
}

export default App;
