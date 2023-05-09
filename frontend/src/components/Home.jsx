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
              <div>
                <h1 className='fw-bold'>
                  Selamat datang di LokerYowis! 
                </h1>
                <p>
                  Website lowongan pekerjaan yang dapat membantu Anda menemukan pekerjaan yang tepat dan sesuai dengan kriteria Anda. Silakan jelajahi berbagai lowongan pekerjaan yang tersedia dan temukan peluang karir yang menarik untuk Anda. Terima kasih sudah mengunjungi LokerYowis!
                </p>
              </div>
              
            </div>
            <img src={myImage} alt="My Image" />
          </div>
          
        </div>
    </div>
  )
}

export default Home