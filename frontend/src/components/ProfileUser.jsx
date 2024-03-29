import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Navbar from './Navbar';
import { getMe } from "../features/authSlice"
import myImage from "./img/job.jpg"

const ProfileUser = () => {
    const [username, setUsername] = useState("")
    const [nohp, setNohp] = useState("")
    const [status, setStatus] = useState("")
    const [instagramUrl, setInstagramUrl] = useState("")
    const [facebookUrl, setFacebookUrl] = useState("")
    const [role, setRole] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isError} = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        dispatch(getMe())
    }, []);

    useEffect(() => {
        if (user !== undefined) {
            getUserById();
        }
        if(isError){
            navigate("/")
        }
    }, [user, isError, navigate]);

    const getUserById = async () => {
        if(user) {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${user.uuid}`)
            setUsername(response.data.username)
            setNohp(response.data.nohp)
            setStatus(response.data.status)
            setInstagramUrl(response.data.instagramUrl)
            setFacebookUrl(response.data.facebookUrl)
            setRole(response.data.role)
            setImageUrl(response.data.imageUrl)
        }
    }

  return (
    <div>
        <Navbar/>
        <div className='container'>
            <div className='mt-5 row'>
                <div className='col-3'>
                    <div className='border border-1 bg-body-secondary rounded-top'>
                        <div className='d-flex justify-content-center mt-4'>
                            {imageUrl ? (
                                <img className='image rounded-circle' alt="Image" src={imageUrl} style={{width: "100px", height: "100px"}}/>
                            ) : (
                                <div className='d-flex justify-content-center fw-bold'>Lengkapi Profile</div>
                            )}
                        </div>
                        <h5 className='d-flex justify-content-center mt-3 text-body-secondary'>{username}</h5>
                    </div>
                    <div className='border border-1 rounded-bottom'>
                        <div className='mt-3 ms-3 me-3'>
                            <h6 className='row'>
                                <Link to={`/jobs`} className="btn btn-dark">
                                    Cari Lowongan Kerja
                                </Link>
                            </h6>
                        </div>
                        <div className='mt-3 ms-3 me-3'>
                            <h6 className='row'>
                                {imageUrl ? (
                                    <Link to={`/edit/profile`} className="btn btn-dark">
                                        Edit Profile
                                    </Link>
                                ) : (
                                    ""
                                )}
                            </h6>
                        </div>
                        <div className='mt-3 ms-3 me-3 mb-3'>
                            {user && user.role === "Admin" && (
                                <h6 className='row'>
                                    <Link to={`/add/jobs`} className="btn btn-dark">
                                        Add Job
                                    </Link>
                                </h6>
                            )}
                        </div>
                    </div>
                </div>
                {username ? (
                    <div className='col-9'>
                        <div className='d-flex justify-content-between'>
                            <h5>User Profile</h5>
                        </div>
                        <div className='border border-1 rounded mt-2 mb-5'>
                            <div className='row mt-3 mb-5'>
                                <div className='col-3'>
                                    <div className='row'>
                                        <div className='col-1 ms-4'>
                                            <img className='image rounded-circle' alt="Image" src={imageUrl} style={{width: "150px", height: "150px"}}/>
                                        </div>
                                        <div className='d-flex justify-content-center mt-3'> 
                                            {instagramUrl ? (
                                                <a href={instagramUrl} target="_blank" className='bg-body-secondary border border-1 rounded-circle d-flex justify-content-center me-2' style={{width: "35px", height: "35px"}}>
                                                    <i className="bi bi-instagram mt-1"></i>
                                                </a>
                                            ) : (
                                                ""
                                            )}
                                            {facebookUrl ? (
                                                <a href={facebookUrl} target="_blank" className='bg-body-secondary border border-1 rounded-circle d-flex justify-content-center ms-2' style={{width: "35px", height: "35px"}}>
                                                    <i class="bi bi-facebook mt-1"></i>
                                                </a>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-6 ms-2'>
                                    <div className=''>
                                        <h4>{username}</h4>
                                        <div className='row mt-5'>
                                            <div className='col-6'>
                                                <h5>Nomer Hp</h5>
                                                <h5>Status</h5>
                                                <h5>Role</h5>
                                            </div>
                                            <div className='col'>
                                                <h5>: {nohp}</h5>
                                                <h5>: {status}</h5>
                                                <h5>: {role}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='col-9'>
                        <h4 className='d-flex justify-content-center'>
                            Lengkapi Profile Anda
                        </h4>
                        <div className='d-flex justify-content-center mt-3'>
                            <Link to={`/edit/profile`} className=" col-3 btn btn-dark d-flex justify-content-center">
                                <i className="bi bi-pencil-fill me-1"></i>Lengkapi Profile
                            </Link>
                        </div>
                        <div className='d-flex justify-content-center mt-3'>
                            <img src={myImage} alt="My Image" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default ProfileUser