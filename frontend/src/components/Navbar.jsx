import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from "react-redux"  
import { LogOut, reset } from "../features/authSlice"

const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();

    const logout = () => {
        dispatch(LogOut())
        dispatch(reset())
        navigate("/")
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
            <div className="container">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#"></a>
                        </li>
                    </ul>
                </div>
                <Link to={'/dashboard'} type="submit" className="btn btn-light me-3">Dasboard</Link>
                <Link to={'/register'} type="submit" className="btn btn-light me-3" >Register</Link>
                <Link to={'/login'} type="submit" className="btn btn-light me-3">Loginn</Link>
                <button onClick={logout} className="btn btn-light">Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar