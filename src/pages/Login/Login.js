import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from "../../firebase"
import netflix_spinner from "../../assets/netflix_spinner.gif"


const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signState, setSignState] = useState("Sign In");
  const [loading, setLoading] = useState(false);
  
  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  }


  const toggler = () =>{
    if (signState === "Sign In") {
      setSignState("Sign Up");
    }
    else {
      setSignState("Sign In");
    }
  }

  return (
    loading ? (<div className='login-spinner'><img src={netflix_spinner}/></div>) : (
    <div className='login'>
      <img src={logo} className='login-logo' alt='login-logo'/>
      <div className='login-form'>
        <h1>{signState}</h1>
        <form action='/'>
          {signState==="Sign Up" ? <input type='text' required value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Your Name'/>:<></>}
          <input type='email' value={email} required onChange={(e)=>{setEmail(e.target.value)}} placeholder='Your Email'/>
          <input type='password' minLength={8} required value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'/>
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className='form-help'>
            <div className='remember'>
              <input type='checkbox' id='remCheck'/>
              <label htmlFor='remCheck'>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className='form-switch'>
          {signState==="Sign In" ? <p>New to Netflix? <span onClick={toggler}>Sign Up Now</span></p>:
          <p>Already have an account? <span onClick={toggler}>Sign In Now</span></p>}
        </div>
      </div>
    </div>)
  )
}

export default Login