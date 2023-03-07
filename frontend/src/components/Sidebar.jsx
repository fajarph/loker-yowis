import React from 'react'

const Sidebar = () => {
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
                <div className='mt-3 ms-3'>
                    <h6>
                        Edit Profile
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