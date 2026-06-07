import React from 'react'
import { useNavigate, Link} from 'react-router'
import '../auth.form.scss'
const Login = () => {
    const onSubmit = (e)=>{
        e.preventDefault();
    }
  return (
    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={(e)=>onSubmit(e)}>

                <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' placeholder='Enter email'></input>
                </div>

                 <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' placeholder='Enter password'></input>
                </div>

                <button className='button primary-button'>Login</button>
            </form>
              <p>Dont have an account? <Link to={'/register'}>Register here</Link></p>
        </div>
    </main>
  )
}

export default Login