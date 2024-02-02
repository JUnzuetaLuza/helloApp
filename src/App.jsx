import React, { useState } from 'react'
import './App.css'

function App() {

  const [ showLogin, setShowLogin ] = useState(true);
  const [ showText, setShowText ] = useState(false);
  const [ helloIp, setHelloIp ] = useState(null);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(' ');

  const openTab = () => { setShowLogin(false);  setShowText(true);  }

  const url = "http://ip-api.com/json/";
  
  fetch ( url )
  .then(response => {
    if(!response.ok) { throw new Error("La solicitud no fue exitosa"); }
    return response.json();
  })
  .then(data => { 
    const cc = data.countryCode; 
    fetch ( "http://hellosalut.stefanbohacek.dev/?cc=" + cc )
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
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const errorCredentials = () => {
    if(!username.trim()) { setError('Username is required'); return; } 
    if(username.length > 10) { setError('Username too long'); return; }
    if(!password.trim()) { setError('Password is required'); return; }
    setError('');
    openTab();
  }

  const handleClick = () => {
    errorCredentials();
    console.log(error)
  }
  const handleReload = () => {
    window.location.reload();
  }

  return (
    <>
      {showLogin && (
      <div className="container">
        <h1>Hello App</h1>
        <fieldset>
          <label htmlFor="username">Username
            <input id="username" type="text" onChange={handleUsernameChange} required/></label>
          <label htmlFor="password">Password
            <input id="password" type="password" onChange={handlePasswordChange} required/></label>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </fieldset> 
        <input type="submit" value="Log In" onClick={handleClick} />
      </div>
      )}
      {showText && (
        <>
        <label>{helloIp} {username}, you have successfully logged in!</label>
        <input type="submit" value="Log Out" onClick={handleReload} />
        </>
      )}
    </>
  )
}

export default App
