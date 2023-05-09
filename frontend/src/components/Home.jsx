import React from 'react'
import Navbar from './Navbar'
import myImage from './img/job.jpg'

const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className='container'>
          <div className='d-flex justify-content-center mt-5'>
            <div className='row'>
              <h1>
                Welcome to Lokeryowis!
              </h1>
              <h3>
                The job search website that can help you find the right job that matches your criteria. Please explore the various job vacancies available and discover exciting career
              </h3>
            </div>
            <img src={myImage} alt="My Image" />
          </div>
          
        </div>
    </div>
  )
}

export default Home