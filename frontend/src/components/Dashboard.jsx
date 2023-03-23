import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const ProfileUser = () => {
    const [username, setUsername] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById()
    }, [])

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users`)
        setUsername(response.data.username)
    }

  return (
    <div>
        <Navbar/>
        <div className='container'>
            <div className='mt-5 row'>
                <div className='col-3'>
                    <div className='border border-1 bg-body-secondary rounded-top'>
                        <h4 className='d-flex justify-content-center mt-2'>{username}</h4>
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
                                <Link to={`/edit/profile`} className="btn btn-dark">
                                    Edit Profile
                                </Link>
                            </h6>
                        </div>
                        <div className='mt-3 ms-3 me-3 mb-3'>
                            <h6 className='row'>
                                <Link to={`/add/job`} className="btn btn-dark">
                                    Add Job
                                </Link>
                            </h6>
                        </div>
                    </div>
                </div>
                <div className='col-9'>
                    <div className='border border-1 rounded mb-5'>
                        <div className='row ms-3 mt-3 mb-3'>
                            <table>
                                <thead>
                                    <tr className='mb-5'>
                                        <th className='col-2'>ID</th>
                                        <th className='col-3'>PROFILE</th>
                                        <th className='col-8'>DIBUAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th>
                                            <Link to={`/profile`}>
                                                {username}
                                            </Link>
                                        </th>
                                        <th>{createdAt}</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileUser