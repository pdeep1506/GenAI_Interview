import React, { useState } from 'react'
import { useNavigate, Link} from 'react-router'
import { useAuth } from '../hooks/useAuth';
import toast from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();

   const {loading, handleRegister} = useAuth()
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [username, setUsername] = useState("");
   const onSubmit = async(e)=>{
        e.preventDefault();
        if( email.length ===0 || password.length ===0 || username.length===0){
            toast.error("Username or Email or password are required.");
        }
        else{

            const response = await handleRegister({username,email,password});
            navigate('/login')
        }
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
