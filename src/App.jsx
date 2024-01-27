import './App.css'

function App() {

  return (
    <>
      <div class="container">
        <h1>Hello App</h1>
        <fieldset>
          <label for="username">Username<input id="username" type="text" required/></label>
          <label for="password">Password<input id="password" type="password" required/></label>
        </fieldset> 
        <input type="submit" value="Log In" />
      </div>
    </>
  )
}

export default App
