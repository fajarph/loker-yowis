import React from 'react'
import Navbar from '../components/Navbar'
import ProfileUser from '../components/ProfileUser'
import Sidebar from '../components/Sidebar'

const Layout = () => {
    return (
        <React.Fragment>
            <Navbar/>   
            <div className=" mt-5 row" style={{minHeight: "100vh"}}>
                <div className='col-3'>
                    <Sidebar/>
                </div>
                <div className="col-9">
                    <ProfileUser/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout