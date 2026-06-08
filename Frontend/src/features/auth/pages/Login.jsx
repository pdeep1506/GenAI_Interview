import React, { useState } from 'react'
import { useNavigate, Link} from 'react-router'
import '../auth.form.scss'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const {loading, handleLogin} = useAuth()
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const onSubmit = async(e)=>{
        e.preventDefault();
        const response = await handleLogin({email, password});
        
    }
  return (
    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={(e)=>onSubmit(e)}>

                <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' placeholder='Enter email' onChange={(e)=>{setEmail(e.target.value)}}></input>
                </div>

                 <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' placeholder='Enter password' onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>

                <button className='button primary-button'>Login</button>
            </form>
              <p>Dont have an account? <Link to={'/register'}>Register here</Link></p>
        </div>
    </main>
  )
}

export default Login