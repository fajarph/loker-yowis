import React from 'react'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const {user, isError, isSuccess, isLoading, message} = useSelector(
        (state) => state.auth
    );
    
  return (
    <div>
        <div className='container-fluid'>
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
                        <Link to={`/edit-profile/${user.uuid}`}>
                            <button type="button" class="btn btn-dark">Edit Profile</button>
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
    </div>
  )
}

export default Sidebar