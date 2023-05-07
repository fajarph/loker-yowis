import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [role, setRole] = useState("")
    const [msg, setMsg] = useState("")
    const [errMsgs, setErrMsgs] = useState([])
    const navigate = useNavigate()

    const saveUser = async(e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/users`, {
                email: email,
                password: password,
                confPassword: confPassword,
                role: role
            })
            navigate("/login")
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.msg)
                setErrMsgs(error.response.data.message)
            }
        }
    }

    const filterErrMsgs = (fieldName) => {
        if (errMsgs.length === 0) {
            return
        }
        
        const item = errMsgs.filter((err) => err.path[0] === fieldName)[0]

        if (item) {
            return item.message
        }
    }

  return (
    <>
        <Navbar/>
        <div className='container-fluid'>
            <h2 className="fw-bold  text-uppercase text-center text-dark mt-5">Register</h2>
            <form onSubmit={saveUser} className='container justify-content-center'>
                <p className='text-center'>{msg}</p>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                    />
                </div>
                {
                    filterErrMsgs('email') && <p className='text-danger'>{filterErrMsgs('email')}</p>
                }
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                </div>
                {
                    filterErrMsgs('password') && <p className='text-danger'>{filterErrMsgs('password')}</p>
                }
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={confPassword} 
                        onChange={(e) => setConfPassword(e.target.value)}
                        placeholder='Confirm Password'
                    />
                </div>
                {
                    filterErrMsgs('confPassword') && <p className='text-danger'>{filterErrMsgs('confPassword')}</p>
                }
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                        className="form-select" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        placeholder='Job Role'
                    >
                        <option selected hidden>Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                </div>
                {
                    filterErrMsgs('role') && <p className='text-danger'>{filterErrMsgs('role')}</p>
                }
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