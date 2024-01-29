import React, { useState } from 'react'
import './App.css'

function App() {

  const [ showLogin, setShowLogin ] = useState(true);
  const [ showText, setShowText ] = useState(false);
  const [ helloIp, setHelloIp ] = useState(null);

  const openTab = () => { setShowLogin(false);  setShowText(true);  }
  const closeTab = () => { setShowLogin(true);  setShowText(false);  }

  const url = "http://ip-api.com/json/";
  
  fetch ( url )
  .then(response => {
    if(!response.ok) { throw new Error("La solicitud no fue exitosa"); }
    return response.json();
  })
  .then(data => { 
    const ip = data.query; 
    fetch ( "https://hellosalut.stefanbohacek.dev/?ip=" + ip )
    .then(response => {
      if(!response.ok) { throw new Error("La solicitud no fue exitosa"); }
      return response.json();
    })
    .then(data => {
      setHelloIp(data.hello);
      console.log(data.hello);
    })
  })
  .catch(error => { console.log("Error al realizar la solicitud", error); })
  

  return (
    <>
      {showLogin && (
      <div className="container">
        <h1>Hello App</h1>
        <form>
        <fieldset>
          <label htmlFor="username">Username<input id="username" type="text" required/></label>
          <label htmlFor="password">Password<input id="password" type="password" required/></label>
        </fieldset> 
        <input type="submit" value="Log In" onClick={openTab} />
        </form>
      </div>
      )}
      {showText && (
        <label>{helloIp}</label>
      )}
    </>
  )
}

export default App
