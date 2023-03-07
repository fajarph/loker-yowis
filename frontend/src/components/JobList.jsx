import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const JobList = () => {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        getJobs()
    }, [])

    const getJobs = async () => {
        const response = await axios.get('http://localhost:5000/jobs')
        setJobs(response.data);
    }

    const deleteJob = async(jobId) => {
        await axios.delete(`http://localhost:5000/jobs/${jobId}`)
        getJobs()
    }

  return (
    <>
        <Navbar/>
        <div className='container mt-5'>
            <form>
                <div className='d-flex justify-content-center'>
                    <div className="mb-3">
                        <input 
                            type="text" 
                            className="form-control"
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-dark">Search</button>
                    </div>
                </div>
                
            </form>
            <div className='mt-5 container'>
                <h2>Cari Lowongan kerja</h2>
                <div className='row mt-4'>
                    <div className='col-3'>
                        <h5>VACANCY</h5>
                    </div>
                    <div className='col-4'>
                        <h5>DETAIL</h5>
                    </div>
                    <div className='col-5'>    
                        <h5>DESKRIPSI PEKERJAAN</h5>
                    </div>
                </div>
                {jobs.map((job, index) => (
                    <div className='row border border-1'>
                        <div className='col-3'>
                            <div className='row'> 
                                <div className='col-3 mt-2'>
                                    <h5>Image</h5>
                                </div>
                                <div className='col mt-2'>
                                    <h5>{job.jobRole}</h5>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='row'> 
                                <table className='ms-3 mt-2'>
                                    <tbody>
                                    <tr className='col-5'>
                                        <td className='h5'>Perusahaan</td>
                                        <td>{job.companyName}</td>
                                    </tr>
                                    <tr className='col-5'>
                                        <td className='h5'>Pendidikan</td>
                                        <td>{job.education}</td>
                                    </tr>
                                    <tr className='col-5'>
                                        <td className='h5'>Lokasi</td>
                                        <td>{job.companyAddress}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className=''> 
                                <p className='mt-2'>
                                    {job.jobDescription}
                                </p>
                                <div className='d-flex justify-content-end mb-4'>
                                    <button type="button" className="btn btn-dark me-1">SELENGKAPNYA</button>
                                    <button type="button" className="btn btn-dark">SIMPAN</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default JobList