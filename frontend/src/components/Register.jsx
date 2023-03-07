import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const navigate = useNavigate()

    const saveUser = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/users', {
                email: email,
                password: password,
                confPassword: confPassword,
            })
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <div className='container-fluid'>
            <h2 className="fw-bold  text-uppercase text-center text-dark mt-5">Register</h2>
            <form onSubmit={saveUser} className='container justify-content-center'>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                    />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Email'
                    />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={confPassword} 
                        onChange={(e) => setConfPassword(e.target.value)}
                        placeholder='Email'
                    />
                </div>
                <button type="submit" className="btn btn-dark">Submit</button>
                <p className="text-dark mt-3">
                    You have an account?
                    <a href="/login">
                        Sign In
                    </a>
                </p>
            </form>
        </div>
    </>
  )
}

export default Register