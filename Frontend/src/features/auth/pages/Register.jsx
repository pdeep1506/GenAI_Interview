import React from 'react'
import { useNavigate, Link} from 'react-router'

const Register = () => {
  const navigate = useNavigate();
   const onSubmit = (e)=>{
        e.preventDefault();
    }
  return (
    <main>
       <div className='form-container'>
            <h1>Register</h1>
            <form onSubmit={(e)=>onSubmit(e)}>
                <div className='input-group'>
                    <label htmlFor='email'>Username</label>
                    <input type='username' id='username' name='username' placeholder='Enter username'></input>
                </div>

                <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' placeholder='Enter email'></input>
                </div>

                 <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' placeholder='Enter password'></input>
                </div>

                <button className='button primary-button'>Register</button>
            </form>

            <p>Already have an account? <Link to={'/login'}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register
