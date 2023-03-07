import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"  
import { LogOut, reset } from "../features/authSlice"

const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispatch(LogOut())
        dispatch(reset())
        navigate("/")
    }

  return (
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
            <div class="container">
                <a class="navbar-brand ms-5" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#"></a>
                        </li>
                    </ul>
                </div>
                <Link to={'/register'} type="submit" class="btn btn-light me-3" >Register</Link>
                <Link to={'/login'} type="submit" class="btn btn-light me-3">Loginn</Link>
                <button onClick={logout} class="btn btn-light">Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar