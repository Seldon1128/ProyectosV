import {useState} from 'react'
import {useCookies} from 'react-cookie'

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [isLogIn, setIsLogin] = useState(true)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const[error, setError] = useState(null)

  console.log(cookies)

  const viewLogin = (status) => {
    setError(null)
    setIsLogin(status)
  }

  const handleSubmit =  async (e, endpoint) => {
    e.preventDefault()
    if(!isLogIn && password !== confirmPassword){
      setError('Make sure passwords match!')
      return
    }

    const response = await fetch(`http://localhost:5005/auth/${endpoint}`,{
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({username: email, password})
    })

    const data = await response.json()

    if(data.detail){
       setError(data.detail)
    } else {
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)

      window.location.reload()
    }

  }

  return (
    <div className='auth'>
      <div> 
            <h2 className="sign-up-text">{isLogIn ? 'Login' : 'Please sign up!'}</h2>
            <br/>
      </div>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      {!isLogIn && <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}/>}
      {error && <p>{error}</p>}
      <button id="authBtn" onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'register')}>
          Submit
      </button>
      <hr />
      <div className="register-content">
          <p>{isLogIn ? "Don't have an account?" : "Already have an account?"}</p>
          <button 
            id="registerBtn"
            onClick={() => viewLogin(!isLogIn)}
          >{isLogIn ? "Sign up" : "Sign in"}</button>
      </div>
    </div>
  )
}

export default Auth
