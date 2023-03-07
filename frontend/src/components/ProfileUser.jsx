import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        <div className='container-fluid'>
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
  )
}

export default ProfileUser