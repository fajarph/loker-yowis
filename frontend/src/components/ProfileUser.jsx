import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const ProfileUser = () => {
    const [username, setUsername] = useState("")
    const [nohp, setNohp] = useState("")
    const [status, setStatus] = useState("")
    const [instagramUrl, setInstagramUrl] = useState("")
    const [facebookUrl, setFacebookUrl] = useState("")
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById()
    }, [])

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users/${id}`)
        setUsername(response.data.username)
        setNohp(response.data.nohp)
        setStatus(response.data.status)
        setInstagramUrl(response.data.instagramUrl)
        setFacebookUrl(response.data.facebookUrl)
    }

  return (
    <div>
        <Navbar/>
        <div className='container'>
            <div className='mt-5 row'>
                <div className='col-3'>
                    <div className='border border-1 bg-body-secondary rounded-top'>
                        <h1 className='d-flex justify-content-center'>Username</h1>
                    </div>
                    <div className='border border-1 rounded-bottom'>
                        <div className='mt-3 ms-3'>
                            <h6>
                                Cari Lowongan Kerja
                            </h6>
                        </div>
                        <div className='mt-3 ms-3 me-3'>
                            <h6 className='row'>
                                <Link to={``} className="btn btn-dark">
                                    Edit Profile
                                </Link>
                            </h6>
                        </div>
                        <div className='mt-3 ms-3'>
                            <h6>
                                Cari Lowongan Kerja
                            </h6>
                        </div>
                        <div className='mt-3 ms-3'>
                            <h6>
                                Cari Lowongan Kerja
                            </h6>
                        </div>
                    </div>
                </div>
                <div className='col-9'>
                    <h5>User Profile</h5>
                    <div className='border border-1 rounded mt-3 mb-5'>
                        <div className='row mt-3'>
                            <div className='col-3 d-flex justify-content-center'>
                                <h1>Picture</h1>
                            </div>
                            <div className='col-6 ms-2'>
                                <div className=''>
                                    <h4>{username}</h4>
                                    <div className='row mt-5'>
                                        <div className='col-6'>
                                            <h5>Nomer Hp</h5>
                                            <h5>Status</h5>
                                        </div>
                                        <div className='col'>
                                            <h5>: {nohp}</h5>
                                            <h5>: {status}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileUser