import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Artista from "./components/Artista";

function App() {

    const [busquedaLetra, setBusquedaLetra] = useState({})  
    const [letra, setLetra] = useState('')
    const [info, guardarInfo] = useState({})

    useEffect (()=>{
        if(Object.keys(busquedaLetra).length === 0) return

        const consultarApiLetra = async () =>{

           const {artista, cancion} = busquedaLetra

           const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`
           const url2 = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`

           const [letraCancion, informacionArtista] = await Promise.all([
                 axios(url),
                 axios(url2)
           ])

           setLetra(letraCancion.data.lyrics) 
           guardarInfo(informacionArtista.data.artists[0])
        }
        consultarApiLetra()

    }, [busquedaLetra, info])



    return (
      <Fragment>
           <Formulario
             setBusquedaLetra={setBusquedaLetra}
           />

        <div className="container mt-5">
             <div className="row">
                <div className="col-md-6">
                    <Artista
                         info={info}
                    />
                </div>
                <div className="col-md-6">
                    <Cancion 
                        letra={letra}
                    />
                </div>
            </div>
        </div>
      </Fragment>
    )
}

export default App
