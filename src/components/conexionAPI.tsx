import { useEffect, useState } from "react";
import { player } from "../models/players";
import './style.css'; 

export const ConexionAPI =() =>{

    const [altura, setAltura] = useState<number>(0);
    const [matchedPlayersHeigth, setMatchedPlayersHeigth ] = useState<string[]>([])
    const [sentences, setsentences] = useState<player[]>([]);

    const cargar = async ()=>{

        const response = await fetch(
            'https://mach-eight.uc.r.appspot.com/'
        );

        const result = await response.json();
        const datos = result;
        setsentences(datos.values);
    }

    const matchHeigthIn = async (altura:number)=>{
      console.log("entro al metodo")
      
      let players :  player[] = sentences; 

      players.sort( (a, b) => +a.h_in - +b.h_in)

      let i: number = 0;
      let j: number = players.length-1;
      let devoluciones: number = 0; 
      let matchedPlayers: string[] = [];

      while(i < j){
        
        if( +players[i].h_in + +players[j].h_in === altura ){
          let pair: string = players[i].first_name + " " + players[i].last_name + " and " + players[j].first_name + " " + players[j].last_name;
          devoluciones++; 
          matchedPlayers.push(pair);
          j--;
        } else if ( +players[i].h_in + +players[j].h_in > altura){
         
          j--;
        } else if ( +players[i].h_in + +players[j].h_in < altura ){
         
         i++; 

         if(+players[i].h_in === +players[i-1].h_in){
          j = j + devoluciones; 
         }
         devoluciones = 0; 
        }
      }

      setMatchedPlayersHeigth(matchedPlayers); 

    }

    useEffect(() => {
        cargar();
      }, []);

      const handleMatch = ()=>{
        console.log("funcion se ejecuto")
        if(altura !== undefined){
          console.log("altura definida")
          matchHeigthIn(altura);
        }

      };

    return (
      <div>
       
       <div className="red-rectangle">

       <h1 className="NBAtittle"> MATCH NBA PLAYERS HEIGHT</h1>

       </div>

       
       <img className="logoDer" src="https://www.logodesignlove.com/images/classic/nba-logo.jpg" alt="Logo NBA"></img>
       <img className="logoIzq" src="https://www.logodesignlove.com/images/classic/nba-logo.jpg" alt="Logo NBA"></img>
       
       <div> 

       <ul className="multi-column-list">
        {sentences.map((sentence, index) => (
          <li key={index}>
            {sentence.first_name} {sentence.last_name} - {sentence.h_in} inches
          </li>
        ))}
      </ul>
       </div>
       
    
       <input  className = "input-box" type="text" placeholder="Enter the height in inches please"  
       onChange={(e) => setAltura(+e.target.value)}></input>

      <button className="red-border-button" onClick={handleMatch}> Find Matches</button>

      <ul>
        {
          matchedPlayersHeigth.map((playerspair, index) => <li key={index}>{playerspair}</li>)
         
        }
        
      </ul>

    


      </div>

    )
}