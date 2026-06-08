import React, { useState } from 'react'
import { useNavigate, Link} from 'react-router'
import { useAuth } from '../hooks/useAuth';
const Register = () => {
  const navigate = useNavigate();

   const {loading, handleRegister} = useAuth()
      const [email, setEmail] = useState(null);
      const [password, setPassword] = useState(null);
      const [username, setUsername] = useState(null);
   const onSubmit = async(e)=>{
        e.preventDefault();
       const response = await handleRegister({username,email,password});
    }
  return (
    <main>
       <div className='form-container'>
            <h1>Register</h1>
            <form onSubmit={(e)=>onSubmit(e)}>
                <div className='input-group'>
                    <label htmlFor='email'>Username</label>
                    <input type='username' id='username' name='username' placeholder='Enter username' onChange={(e)=>{setUsername(e.target.value)}}></input>
                </div>

                <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' placeholder='Enter email' onChange={(e)=>{setEmail(e.target.value)}}></input>
                </div>

                 <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' placeholder='Enter password' onChange={(e)=>{setPassword(e.target.value)}}></input>
                </div>

                <button className='button primary-button'>Register</button>
            </form>

            <p>Already have an account? <Link to={'/login'}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register
