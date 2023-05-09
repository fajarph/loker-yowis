import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser, reset } from "../features/authSlice"
import Navbar from "./Navbar";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, isError, isSuccess, isLoading, message} = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if(user || isSuccess){
            navigate(`/profile`)
        }
        dispatch(reset())
    },[user, isSuccess, dispatch, navigate])

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({email, password}))
    }
  return (
    <>
        <Navbar/>
        <div className='container-fluid'>
            <h2 className="fw-bold  text-uppercase text-center text-dark mt-5">Login</h2>
            <form onSubmit={Auth} className='container justify-content-center'>
                {isError && <p className='d-flex text-danger justify-content-center'>{message}</p>}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        placeholder='Email'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        placeholder='Password'
                    />
                </div>
                <button type="submit" className="btn btn-dark">{isLoading ? 'Loading...' : "Login"}</button>
                <p className="text-dark mt-3">Don't have an account?<Link to={'/register'} className='signin'>Sign Up</Link></p>
            </form>
        </div>
    </>
  )
}

export default Login