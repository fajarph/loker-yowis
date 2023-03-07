import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from 'react-router-dom'
import { LoginUser, reset } from "../features/authSlice"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const {user, isError, isSuccess, isLoading, message} = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if(user || isSuccess){
            navigate(`/profile/edit/${id}`)
        }
        dispatch(reset())
    },[user, isSuccess, dispatch, navigate])

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({email, password}))
    }
  return (
    <>
        <div className='container-fluid'>
            <h2 className="fw-bold  text-uppercase text-center text-dark mt-5">Login</h2>
            <form onSubmit={Auth} className='container justify-content-center'>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        placeholder='Email'
                    />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        placeholder='Email'
                    />
                </div>
                <button type="submit" className="btn btn-dark">{isLoading ? 'Loading...' : "Login"}</button>
                <p className="text-dark mt-3">Don't have an account?<a href="/register" className='signin'>Sign Up</a></p>
            </form>
        </div>
    </>
  )
}

export default Login