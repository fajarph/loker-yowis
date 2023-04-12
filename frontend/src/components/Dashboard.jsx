import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../features/authSlice"
import Navbar from './Navbar';
import moment from 'moment';
import "./style/dashboard.css"
import myImage from "./img/job.jpg"

const Dashboard = () => {
    const [username, setUsername] = useState("")
    const [createdAt, setCreatedAt] = useState("2022-03-30T10:30:00.000Z")
    const [url, setUrl] = useState("")
    const navigate = useNavigate();
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
            const response = await axios.get(`http://localhost:5000/users/${user.uuid}`)
            setUsername(response.data.username)
            setCreatedAt(response.data.createdAt)
            setUrl(response.data.url)
        }
    }

    const formattedDate = moment(createdAt).format('MMMM DD, YYYY');

  return (
    <div>
        <Navbar/>
        <div className='container'>
            <div className='mt-5 row'>
                <div className='col-3'>
                    <div className='border border-1 bg-body-secondary rounded-top'>
                        <div className='d-flex justify-content-center mt-4'>
                            {url ? (
                                <img className='image rounded-circle' alt="Image" src={url} style={{width: "100px", height: "100px"}}/>
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
                                {url ? (
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
                        <div className='border border-1 rounded mb-5'>
                            <div className='row ms-3 mt-3 mb-3'>
                                <table>
                                    <thead>
                                        <tr className='mb-5'>
                                            <th className='col-2'>ID</th>
                                            <th className='col-3'>Name</th>
                                            <th className='col-8'>Dibuat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className='h6'>{user.id}</th>
                                            <th>
                                                <Link to={`/profile`} className="custom-link h6">
                                                    {username}
                                                </Link>
                                            </th>
                                            <th className='h6'>{formattedDate}</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </tbody>
                                </table>
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

export default Dashboard